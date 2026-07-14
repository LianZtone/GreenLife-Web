<template>
    <section class="orders">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Pesanan Saya</h2>
                <p>Kelola dan lacak pesanan Anda</p>
            </div>

            <!-- Orders Filter -->
            <div class="orders-filter fade-in">
                <button v-for="filter in filters" :key="filter.value"
                    :class="['filter-btn', { active: activeFilter === filter.value }]" @click="setFilter(filter.value)">
                    {{ filter.label }}
                    <span class="count" v-if="filter.count">({{ filter.count }})</span>
                </button>
            </div>

            <!-- Orders List -->
            <div class="orders-content">
                <div v-if="filteredOrders.length === 0" class="empty-orders fade-in">
                    <div class="empty-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <h3>Belum Ada Pesanan</h3>
                    <p>Mulai berbelanja dan temukan produk organik terbaik untuk Anda</p>
                    <router-link to="/produk" class="btn btn-accent">
                        <i class="fas fa-shopping-bag"></i> Mulai Belanja
                    </router-link>
                </div>

                <div v-else class="orders-list">
                    <div v-for="order in filteredOrders" :key="order.id" class="card order-card fade-in">

                        <div class="order-header">
                            <div class="order-info">
                                <h3>Order #{{ order.id }}</h3>
                                <p class="order-date">{{ formatDate(order.date) }}</p>
                            </div>
                            <div class="order-status" :class="order.status">
                                {{ getStatusText(order.status) }}
                            </div>
                        </div>


                        <div class="order-items">
                            <div v-for="item in order.items" :key="item.id" class="order-item">
                                <div class="item-image">
                                    <img :src="item.image" :alt="item.name">
                                </div>
                                <div class="item-details">
                                    <h4>{{ item.name }}</h4>
                                    <p class="item-category">{{ item.category }}</p>
                                    <p class="item-quantity">Qty: {{ item.quantity }}</p>
                                </div>
                                <div class="item-price">
                                    {{ formatPrice(item.price * item.quantity) }}
                                </div>
                            </div>
                        </div>

                        <div class="order-summary">
                            <div class="summary-row">
                                <span>Subtotal</span>
                                <span>{{ formatPrice(order.subtotal) }}</span>
                            </div>
                            <div class="summary-row">
                                <span>Ongkos Kirim</span>
                                <span>{{ order.shippingCost === 0 ? 'Gratis' : formatPrice(order.shippingCost) }}</span>
                            </div>
                            <div class="summary-row discount" v-if="order.discount > 0">
                                <span>Diskon</span>
                                <span>-{{ formatPrice(order.discount) }}</span>
                            </div>
                            <div class="summary-row total">
                                <span>Total</span>
                                <span>{{ formatPrice(order.total) }}</span>
                            </div>
                        </div>

                        <div class="order-actions">
                            <button v-if="order.status === 'pending'" class="btn btn-sm" @click="payOrder(order)">
                                <i class="fas fa-credit-card"></i> Bayar Sekarang
                            </button>
                            <button v-if="order.status === 'processing'" class="btn btn-sm btn-outline"
                                @click="trackOrder(order)">
                                <i class="fas fa-shipping-fast"></i> Lacak Pengiriman
                            </button>
                            <button v-if="order.status === 'delivered'" class="btn btn-sm btn-accent"
                                @click="rateOrder(order)">
                                <i class="fas fa-star"></i> Beri Rating
                            </button>
                            <button v-if="['pending', 'processing'].includes(order.status)"
                                class="btn btn-sm btn-outline" @click="cancelOrder(order)">
                                <i class="fas fa-times"></i> Batalkan
                            </button>
                            <button class="btn btn-sm btn-outline" @click="viewOrderDetails(order)">
                                <i class="fas fa-eye"></i> Detail
                            </button>
                            <button v-if="order.status === 'delivered'" class="btn btn-sm" @click="reorder(order)">
                                <i class="fas fa-redo"></i> Beli Lagi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showLoadMore" class="load-more-section fade-in">
                <button class="btn btn-outline" @click="loadMoreOrders">
                    <i class="fas fa-plus"></i> Muat Lebih Banyak Pesanan
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const activeFilter = ref('all')
const displayedOrders = ref(5)
const ordersPerLoad = ref(5)

import imgPost1 from '../../assets/images/products/nrd-D6Tu_L3chLE-unsplash.webp'
import imgPost2 from '../../assets/images/products/christina-rumpf-UrXlE1GZ5PQ-unsplash.webp'
import imgPost3 from '../../assets/images/products/anh-nguyen-kcA-c3f_3FE-unsplash.webp'
import imgPost4 from '../../assets/images/products/bonnie-hawkins-B0cQroCgk5Y-unsplash.webp'
import imgPost5 from '../../assets/images/products/art-rachen-Asj5DFw8UAw-unsplash.webp'

const filters = [
    { value: 'all', label: 'Semua', count: 8 },
    { value: 'pending', label: 'Menunggu Pembayaran', count: 2 },
    { value: 'processing', label: 'Diproses', count: 3 },
    { value: 'shipped', label: 'Dikirim', count: 1 },
    { value: 'delivered', label: 'Selesai', count: 2 },
    { value: 'cancelled', label: 'Dibatalkan', count: 0 }
]

const orders = ref([
    {
        id: 'GL202401001',
        date: '2024-01-20',
        status: 'delivered',
        subtotal: 255000,
        shippingCost: 15000,
        discount: 0,
        total: 270000,
        items: [
            {
                id: 1,
                name: 'Paket Buah Organik Segar',
                category: 'Makanan Sehat',
                image: imgPost1,
                price: 95000,
                quantity: 2
            },
            {
                id: 3,
                name: 'Teh Herbal Organik',
                category: 'Minuman Herbal',
                image: imgPost2,
                price: 65000,
                quantity: 1
            }
        ]
    },
    {
        id: 'GL202312015',
        date: '2023-12-15',
        status: 'processing',
        subtotal: 375000,
        shippingCost: 0,
        discount: 25000,
        total: 350000,
        items: [
            {
                id: 2,
                name: 'Skincare Alami GreenLife',
                category: 'Skincare Organik',
                image: imgPost3,
                price: 125000,
                quantity: 3
            }
        ]
    },
    {
        id: 'GL202312008',
        date: '2023-12-08',
        status: 'pending',
        subtotal: 180000,
        shippingCost: 12000,
        discount: 0,
        total: 192000,
        items: [
            {
                id: 4,
                name: 'Madu Murni Organik',
                category: 'Makanan Sehat',
                image: imgPost4,
                price: 120000,
                quantity: 1
            },
            {
                id: 5,
                name: 'Minyak Zaitun Organik',
                category: 'Bahan Masak',
                image: imgPost5,
                price: 60000,
                quantity: 1
            }
        ]
    },
    {
        id: 'GL202311025',
        date: '2023-11-25',
        status: 'shipped',
        subtotal: 420000,
        shippingCost: 20000,
        discount: 30000,
        total: 410000,
        items: [
            {
                id: 6,
                name: 'Granola Organik',
                category: 'Makanan Sehat',
                image: imgPost2,
                price: 75000,
                quantity: 2
            },
            {
                id: 7,
                name: 'Kacang Almond Organik',
                category: 'Makanan Sehat',
                image: imgPost3,
                price: 90000,
                quantity: 3
            }
        ]
    },
    {
        id: 'GL202311012',
        date: '2023-11-12',
        status: 'delivered',
        subtotal: 125000,
        shippingCost: 0,
        discount: 0,
        total: 125000,
        items: [
            {
                id: 2,
                name: 'Skincare Alami GreenLife',
                category: 'Skincare Organik',
                image: imgPost1,
                price: 125000,
                quantity: 1
            }
        ]
    }
])

const filteredOrders = computed(() => {
    let list = orders.value
    if (activeFilter.value !== 'all') {
        list = list.filter(o => o.status === activeFilter.value)
    }
    return list.slice(0, displayedOrders.value)
})

const showLoadMore = computed(() => {
    let total = orders.value.length
    if (activeFilter.value !== 'all') {
        total = orders.value.filter(o => o.status === activeFilter.value).length
    }
    return displayedOrders.value < total
})

function setFilter(filter) {
    activeFilter.value = filter
    displayedOrders.value = 5
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function getStatusText(status) {
    const map = {
        pending: 'Menunggu Pembayaran',
        processing: 'Sedang Diproses',
        shipped: 'Dalam Pengiriman',
        delivered: 'Pesanan Selesai',
        cancelled: 'Dibatalkan'
    }
    return map[status] || status
}

function payOrder(order) {
    Swal.fire({
        title: 'Bayar Pesanan',
        html: `
      <div style="text-align:left;">
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
        <div class="form-group" style="margin:15px 0;">
          <label>Metode Pembayaran</label>
          <select class="swal2-input">
            <option value="transfer">Transfer Bank</option>
            <option value="credit-card">Kartu Kredit</option>
            <option value="ewallet">E-Wallet</option>
          </select>
        </div>
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: 'Bayar Sekarang',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50'
    }).then((r) => {
        if (r.isConfirmed) {
            order.status = 'processing'
            Swal.fire({
                title: 'Pembayaran Berhasil!',
                text: 'Pesanan Anda sedang diproses',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function cancelOrder(order) {
    Swal.fire({
        title: 'Batalkan Pesanan?',
        text: `Anda yakin ingin membatalkan pesanan #${order.id}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Batalkan',
        cancelButtonText: 'Batal'
    }).then((r) => {
        if (r.isConfirmed) {
            order.status = 'cancelled'
            Swal.fire({
                title: 'Pesanan Dibatalkan!',
                text: 'Pesanan telah berhasil dibatalkan',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function loadMoreOrders() {
    displayedOrders.value += ordersPerLoad.value
}

function viewOrderDetails(order) {
    const messages = {
        pending: { text: 'Menunggu Pembayaran', icon: 'info' },
        processing: { text: 'Sedang Diproses', icon: 'info' },
        shipped: { text: 'Dalam Pengiriman', icon: 'warning' },
        delivered: { text: 'Pesanan Selesai', icon: 'success' },
        cancelled: { text: 'Pesanan Dibatalkan', icon: 'error' }
    }

    const msg = messages[order.status] || { text: 'Status tidak dikenal', icon: 'question' }

    Swal.fire({
        title: `Pesanan #${order.id}`,
        text: msg.text,
        icon: msg.icon
    })
    
}

</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;

.orders {
    margin-top: -100px;
    padding: 80px 0;
    background: linear-gradient(to bottom, $white, $light-bg);
    min-height: 100vh;
}

.orders-filter {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;

    .filter-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: $light-bg;
        border: none;
        border-radius: 25px;
        font-weight: 500;
        cursor: pointer;
        transition: $transition;

        &:hover {
            background: $primary;
            color: $white;
        }

        &.active {
            background: linear-gradient(135deg, $primary, $primary-dark);
            color: $white;
            box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
        }

        .count {
            font-size: 0.8rem;
            opacity: 0.8;
        }
    }
}

.orders-content {
    margin-bottom: 60px;
}

.empty-orders {
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

.order-card {
    padding: 30px;
    margin-bottom: 25px;

    &:last-child {
        margin-bottom: 0;
    }
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid $light-bg;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
}

.order-info {
    h3 {
        color: $text;
        margin-bottom: 5px;
        font-size: 1.3rem;
    }

    .order-date {
        color: $light-text;
        margin: 0;
        font-size: 0.9rem;
    }
}

.order-status {
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;

    &.pending {
        background: #fff3cd;
        color: #856404;
    }

    &.processing {
        background: #cce7ff;
        color: #004085;
    }

    &.shipped {
        background: #d1ecf1;
        color: #0c5460;
    }

    &.delivered {
        background: #d4edda;
        color: #155724;
    }

    &.cancelled {
        background: #f8d7da;
        color: #721c24;
    }
}

.order-items {
    margin-bottom: 20px;
}

.order-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid $light-bg;

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 576px) {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
}

.item-image {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.item-details {
    flex: 1;

    h4 {
        color: $text;
        margin-bottom: 5px;
        font-size: 1rem;
    }

    .item-category,
    .item-quantity {
        color: $light-text;
        font-size: 0.85rem;
        margin-bottom: 3px;
    }
}

.item-price {
    font-weight: 600;
    color: $primary;
    font-size: 1rem;
    min-width: 100px;
    text-align: right;

    @media (max-width: 576px) {
        text-align: left;
        margin-top: 10px;
    }
}

.order-summary {
    background: $light-bg;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    &.discount {
        color: #4CAF50;
        font-weight: 600;
    }

    &.total {
        border-top: 2px solid $primary;
        font-weight: 700;
        font-size: 1.1rem;
        color: $primary;
        margin-top: 10px;
        padding-top: 12px;
    }
}

.order-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .btn {
        font-size: 0.85rem;
    }

    @media (max-width: 576px) {
        flex-direction: column;

        .btn {
            justify-content: center;
        }
    }
}

.load-more-section {
    text-align: center;

    .btn {
        padding: 12px 30px;
    }
}

@media (max-width: 768px) {
    .orders-filter {
        gap: 8px;

        .filter-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
        }
    }

    .order-card {
        padding: 20px;
    }
}

@media (max-width: 576px) {
    .order-actions {
        .btn {
            width: 100%;
        }
    }
}
</style>
