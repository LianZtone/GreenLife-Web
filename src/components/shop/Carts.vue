<template>
    <section class="carts container">
        <div class="">
            <div class="section-title fade-in">
                <h2>Keranjang Belanja</h2>
                <p>Produk yang telah Anda tambahkan ke keranjang</p>
            </div>

            <div class="cart-content">
                <div class="cart-items">
                    <div v-if="cartItems.length === 0" class="empty-cart fade-in">
                        <div class="empty-icon">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <h3>Keranjang Belanja Kosong</h3>
                        <p>Belum ada produk di keranjang belanja Anda</p>
                        <router-link to="/produk" class="btn btn-accent">
                            <i class="fas fa-shopping-bag"></i> Mulai Belanja
                        </router-link>
                    </div>

                    <div v-else>
                        <div v-for="item in cartItems" :key="item.id" class="card cart-item fade-in">
                            <div class="item-image">
                                <img :src="item.image" :alt="item.name">
                            </div>
                            <div class="item-details">
                                <h4>{{ item.name }}</h4>
                                <p class="item-category">{{ item.category }}</p>
                                <p class="item-price">{{ formatPrice(item.price) }}</p>
                            </div>
                            <div class="item-quantity">
                                <button class="quantity-btn" @click="decreaseQuantity(item)"
                                    :disabled="item.quantity <= 1">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="quantity">{{ item.quantity }}</span>
                                <button class="quantity-btn" @click="increaseQuantity(item)">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="item-total">
                                {{ formatPrice(item.price * item.quantity) }}
                            </div>
                            <button class="remove-btn" @click="removeItem(item)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="cartItems.length > 0" class="cart-summary fade-in delay-1">
                    <div class="card summary-card">
                        <h3>Ringkasan Belanja</h3>

                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>{{ formatPrice(subtotal) }}</span>
                        </div>

                        <div class="summary-row">
                            <span>Ongkos Kirim</span>
                            <span>{{ shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost) }}</span>
                        </div>

                        <div class="summary-row discount">
                            <span>Diskon</span>
                            <span>-{{ formatPrice(discount) }}</span>
                        </div>

                        <div class="summary-row total">
                            <span>Total</span>
                            <span>{{ formatPrice(total) }}</span>
                        </div>

                        <div class="promo-section">
                            <div class="promo-input">
                                <input type="text" v-model="promoCode" placeholder="Masukkan kode promo">
                                <button class="btn btn-sm" @click="applyPromo">Terapkan</button>
                            </div>
                            <p v-if="appliedPromo" class="promo-success">
                                <i class="fas fa-check-circle"></i> Kode promo berhasil diterapkan
                            </p>
                        </div>

                        <button class="btn btn-accent btn-lg checkout-btn" @click="checkout">
                            <i class="fas fa-credit-card"></i> Lanjut ke Pembayaran
                        </button>

                        <router-link to="/produk" class="continue-shopping">
                            <i class="fas fa-arrow-left"></i> Lanjutkan Belanja
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Recommended Products -->
            <div v-if="cartItems.length > 0" class="recommended-products">
                <div class="section-title">
                    <h3>Produk Rekomendasi</h3>
                    <p>Anda mungkin juga menyukai produk ini</p>
                </div>
                <div class="recommended-grid grid grid-4">
                    <div v-for="product in recommendedProducts" :key="product.id" class="card product-card">
                        <div class="product-img">
                            <img :src="product.image" :alt="product.name">
                        </div>
                        <div class="product-info">
                            <h4>{{ product.name }}</h4>
                            <p class="product-price">{{ formatPrice(product.price) }}</p>
                            <button class="btn btn-sm" @click="addToCart(product)">
                                <i class="fas fa-cart-plus"></i> Tambah
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

import imgPost1 from '../../assets/images/products/nrd-D6Tu_L3chLE-unsplash.webp'
import imgPost2 from '../../assets/images/products/christina-rumpf-UrXlE1GZ5PQ-unsplash.webp'
import imgPost3 from '../../assets/images/products/anh-nguyen-kcA-c3f_3FE-unsplash.webp'
import imgPost4 from '../../assets/images/products/bonnie-hawkins-B0cQroCgk5Y-unsplash.webp'
import imgPost5 from '../../assets/images/products/art-rachen-Asj5DFw8UAw-unsplash.webp'

const router = useRouter()


const cartItems = ref([
    {
        id: 1,
        name: "Paket Buah Organik Segar",
        category: "Makanan Sehat",
        image: imgPost1,
        price: 95000,
        quantity: 2
    },
    {
        id: 2,
        name: "Teh Herbal Organik",
        category: "Minuman Herbal",
        image: imgPost2,
        price: 65000,
        quantity: 1
    }
])

const promoCode = ref('')
const appliedPromo = ref(false)
const shippingCost = ref(15000)

const recommendedProducts = ref([
    {
        id: 5,
        name: "Madu Murni Organik",
        category: "Makanan Sehat",
        image: imgPost3,
        price: 120000
    },
    {
        id: 6,
        name: "Skincare Alami GreenLife",
        category: "Skincare Organik",
        image: imgPost4,
        price: 125000
    },
    {
        id: 7,
        name: "Minyak Zaitun Organik",
        category: "Bahan Masak",
        image: imgPost5,
        price: 85000
    },
    {
        id: 8,
        name: "Granola Organik",
        category: "Makanan Sehat",
        image: imgPost1,
        price: 75000
    }
])


const subtotal = computed(() =>
    cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
)

const discount = computed(() => appliedPromo.value ? subtotal.value * 0.1 : 0)

const total = computed(() => subtotal.value + shippingCost.value - discount.value)

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}

function increaseQuantity(item) {
    item.quantity++
}

function decreaseQuantity(item) {
    if (item.quantity > 1) {
        item.quantity--
    }
}

function removeItem(item) {
    Swal.fire({
        title: 'Hapus Produk?',
        text: `Apakah Anda yakin ingin menghapus ${item.name} dari keranjang?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then(result => {
        if (result.isConfirmed) {
            cartItems.value = cartItems.value.filter(i => i.id !== item.id)
            Swal.fire('Terhapus!', 'Produk telah dihapus dari keranjang.', 'success')
        }
    })
}

function applyPromo() {
    if (promoCode.value.toUpperCase() === 'GREEN10') {
        appliedPromo.value = true
        Swal.fire({
            title: 'Berhasil!',
            text: 'Kode promo GREEN10 berhasil diterapkan. Dapatkan diskon 10%!',
            icon: 'success',
            confirmButtonColor: '#4CAF50'
        })
    } else {
        Swal.fire({
            title: 'Kode Tidak Valid',
            text: 'Kode promo yang Anda masukkan tidak valid atau sudah kedaluwarsa.',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    }
}

function addToCart(product) {
    const existing = cartItems.value.find(i => i.id === product.id)
    if (existing) {
        existing.quantity++
    } else {
        cartItems.value.push({ ...product, quantity: 1 })
    }

    Swal.fire({
        title: 'Berhasil!',
        text: `${product.name} telah ditambahkan ke keranjang`,
        icon: 'success',
        confirmButtonColor: '#4CAF50',
        timer: 1500
    })
}

function checkout() {
    Swal.fire({
        title: 'Lanjut ke Pembayaran?',
        text: `Total belanja Anda: ${formatPrice(total.value)}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4CAF50',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Lanjutkan',
        cancelButtonText: 'Periksa Lagi'
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Sedang Diproses...',
                text: 'Mengarahkan ke halaman pembayaran',
                icon: 'info',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                router.push('/pesanan')
            })
        }
    })
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.carts {
    padding: 80px 0;
    margin-top: -100px;
    background: linear-gradient(to bottom, $white, $light-bg);
    min-height: -100vh;
}

.cart-content {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
    align-items: start;
}

.cart-items {
    .empty-cart {
        text-align: center;
        padding: 60px 20px;

        .empty-icon {
            font-size: 4rem;
            color: $light-text;
            margin-bottom: 20px;
        }

        h3 {
            color: $text;
            margin-bottom: 10px;
        }

        p {
            color: $light-text;
            margin-bottom: 30px;
        }
    }
}

.cart-item {
    display: grid;
    grid-template-columns: 100px 1fr auto auto auto;
    gap: 20px;
    align-items: center;
    padding: 25px;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.item-image {
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.item-details {
    h4 {
        color: $text;
        margin-bottom: 5px;
        font-size: 1.1rem;
    }

    .item-category {
        color: $light-text;
        font-size: 0.9rem;
        margin-bottom: 5px;
    }

    .item-price {
        color: $primary;
        font-weight: 600;
        font-size: 1.1rem;
    }
}

.item-quantity {
    display: flex;
    align-items: center;
    gap: 15px;

    .quantity-btn {
        width: 35px;
        height: 35px;
        border: 2px solid $primary;
        background: transparent;
        color: $primary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: $transition;

        &:hover:not(:disabled) {
            background: $primary;
            color: $white;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .quantity {
        font-weight: 600;
        font-size: 1.1rem;
        min-width: 30px;
        text-align: center;
    }
}

.item-total {
    font-weight: 700;
    font-size: 1.2rem;
    color: $primary;
    min-width: 120px;
    text-align: right;
}

.remove-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: #ffebee;
    color: #f44336;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition;

    &:hover {
        background: #f44336;
        color: $white;
        transform: scale(1.1);
    }
}

.cart-summary {
    position: sticky;
    top: 100px;
}

.summary-card {
    padding: 30px;

    h3 {
        color: $text;
        margin-bottom: 25px;
        text-align: center;
        font-size: 1.4rem;
    }
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid $light-bg;

    &.discount {
        color: #4CAF50;
        font-weight: 600;
    }

    &.total {
        border-top: 2px solid $primary;
        border-bottom: none;
        font-weight: 700;
        font-size: 1.2rem;
        color: $primary;
        margin-top: 10px;
        padding-top: 15px;
    }
}

.promo-section {
    margin: 20px 0;

    .promo-input {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;

        input {
            flex: 1;
            padding: 10px 15px;
            border: 2px solid $light-bg;
            border-radius: 8px;
            font-size: 0.9rem;

            &:focus {
                outline: none;
                border-color: $primary;
            }
        }
    }

    .promo-success {
        color: #4CAF50;
        font-size: 0.9rem;
        margin: 0;

        i {
            margin-right: 5px;
        }
    }
}

.checkout-btn {
    width: 100%;
    justify-content: center;
    margin: 20px 0;
}

.continue-shopping {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: $primary;
    text-decoration: none;
    font-weight: 500;
    transition: $transition;

    &:hover {
        color: $primary-dark;
        gap: 12px;
    }
}

.recommended-products {
    margin-top: 80px;

    .section-title {
        margin: 60px 0 40px;

        h3 {
            font-size: 2rem;

            &:after {
                width: 60px;
            }
        }
    }
}

.recommended-grid {
    margin-bottom: 0;
}

.product-card {
    padding: 20px;
    text-align: center;

    .product-img {
        height: 120px;
        margin-bottom: 15px;
        border-radius: 12px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    h4 {
        font-size: 1rem;
        margin-bottom: 10px;
        color: $text;
    }

    .product-price {
        color: $primary;
        font-weight: 600;
        margin-bottom: 15px;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }
}

@media (max-width: 992px) {
    .cart-content {
        grid-template-columns: 1fr;
    }

    .cart-summary {
        position: static;
    }
}

@media (max-width: 768px) {
    .cart-item {
        grid-template-columns: 80px 1fr;
        gap: 15px;

        .item-quantity,
        .item-total,
        .remove-btn {
            grid-column: 1 / -1;
            justify-self: start;
        }

        .item-total {
            justify-self: end;
            margin-left: auto;
        }

        .item-quantity {
            order: 1;
        }

        .item-total {
            order: 2;
        }

        .remove-btn {
            order: 3;
        }
    }

    .recommended-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {
    .cart-item {
        padding: 20px;
    }

    .item-image {
        width: 70px;
        height: 70px;
    }

    .recommended-grid {
        grid-template-columns: 1fr;
    }

    .promo-input {
        flex-direction: column;
    }
}
</style>
