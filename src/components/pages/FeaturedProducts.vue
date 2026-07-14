<template>
    <section class="container" id="produk">
        <div class="section-title fade-in">
            <h2>Produk Kami</h2>
            <p>Produk-produk terbaik pilihan kami dengan kualitas organik terjamin</p>
        </div>

        <div class="product-filter fade-in">
            <button v-for="filter in filters" :key="filter.value" class="filter-btn"
                :class="{ active: activeFilter === filter.value }" @click="setFilter(filter.value)">
                {{ filter.label }}
            </button>
        </div>

        <div class="products grid grid-auto">
            <div v-for="(product, index) in filteredProducts" :key="product.id" class="card product-card fade-in"
                :class="`delay-${(index % 3) + 1}`">
                <div v-if="product.badge" :class="['product-badge', product.badge.type]">
                    {{ product.badge.text }}
                </div>
                <div class="product-img">
                    <img :src="product.image" :alt="product.name" />
                </div>
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <div class="product-meta">
                        <div class="product-price">
                            <span class="current-price">{{ product.currentPrice }}</span>
                            <span v-if="product.originalPrice" class="original-price">
                                {{ product.originalPrice }}
                            </span>
                        </div>
                        <div class="product-category">{{ product.categoryLabel }}</div>
                    </div>
                    <div class="product-actions">
                        <button type="button" class="btn" @click="addToCart(product)">
                            Beli Sekarang
                        </button>
                        <button type="button" class="btn btn-outline" @click="showDetail(product)">
                            Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="empty-result fade-in">
            <i class="fas fa-search"></i>
            <h3>Tidak ada produk yang cocok</h3>
            <p>Coba ubah kategori atau kata kunci pencarian untuk menemukan produk lain.</p>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'
import imgPost1 from '../../assets/images/products/nrd-D6Tu_L3chLE-unsplash.webp'
import imgPost2 from '../../assets/images/products/christina-rumpf-UrXlE1GZ5PQ-unsplash.webp'
import imgPost3 from '../../assets/images/products/lisa-hobbs-mRaNok_Ld6s-unsplash.webp'
import imgPost4 from '../../assets/images/products/bonnie-hawkins-B0cQroCgk5Y-unsplash.webp'

const emit = defineEmits(['add-to-cart'])
const route = useRoute()

const activeFilter = ref('all')

const filters = [
    { value: 'all', label: 'Semua' },
    { value: 'makanan', label: 'Makanan' },
    { value: 'minuman', label: 'Minuman' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'rumah-tangga', label: 'Rumah Tangga' }
]

const products = ref([
    {
        id: 1,
        name: 'Paket Buah Organik Segar',
        category: 'makanan',
        categoryLabel: 'Makanan Sehat',
        image: imgPost1,
        currentPrice: 'Rp 95.000',
        originalPrice: '',
        badge: { type: '', text: 'Terlaris' }
    },
    {
        id: 2,
        name: 'Skincare Alami GreenLife',
        category: 'skincare',
        categoryLabel: 'Skincare Organik',
        image: imgPost2,
        currentPrice: 'Rp 125.000',
        originalPrice: '',
        badge: { type: 'new', text: 'Baru' }
    },
    {
        id: 3,
        name: 'Teh Herbal Organik',
        category: 'minuman',
        categoryLabel: 'Minuman Herbal',
        image: imgPost3,
        currentPrice: 'Rp 65.000',
        originalPrice: '',
        badge: null
    },
    {
        id: 4,
        name: 'Madu Murni Organik',
        category: 'makanan',
        categoryLabel: 'Makanan Sehat',
        image:imgPost4,
        currentPrice: 'Rp 120.000',
        originalPrice: 'Rp 150.000',
        badge: { type: 'discount', text: 'Diskon 20%' }
    }
])

const searchQuery = computed(() => String(route.query.search || '').trim().toLowerCase())

const filteredProducts = computed(() => {
    return products.value.filter((product) => {
        const matchesFilter = activeFilter.value === 'all' || product.category === activeFilter.value
        const searchableText = `${product.name} ${product.categoryLabel} ${product.category}`.toLowerCase()
        const matchesSearch = !searchQuery.value || searchableText.includes(searchQuery.value)

        return matchesFilter && matchesSearch
    })
})

function setFilter(filter) {
    activeFilter.value = filter
}

function addToCart(product) {
    emit('add-to-cart', product)
    showNotification(`${product.name} telah ditambahkan ke keranjang!`)
}

function showDetail(product) {
    Swal.fire({
        title: product.name,
        html: `
            <div style="text-align:left">
                <p><strong>Kategori:</strong> ${product.categoryLabel}</p>
                <p><strong>Harga:</strong> ${product.currentPrice}</p>
                <p><strong>Status:</strong> ${product.badge?.text || 'Produk reguler'}</p>
            </div>
        `,
        confirmButtonColor: '#4CAF50'
    })
}

function showNotification(message) {
    console.log(message)
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.product-filter {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 40px;
}

.filter-btn {
    padding: 10px 20px;
    background: $light-bg;
    border: none;
    border-radius: 30px;
    font-weight: 500;
    cursor: pointer;
    transition: $transition;

    &.active,
    &:hover {
        background: linear-gradient(135deg, $primary, $primary-dark);
        color: $white;
    }
}

.products {
    margin-bottom: 80px;
}

.product-badge {
    position: absolute;
    top: 15px;
    left: 15px;
    background: $accent;
    color: $text;
    padding: 5px 12px;
    border-radius: 30px;
    font-size: 12px;
    font-weight: 600;
    z-index: 2;

    &.discount {
        background: #f44336;
        color: white;
    }

    &.new {
        background: #2196f3;
        color: white;
    }
}

.product-img {
    height: 220px;
    overflow: hidden;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
}

.product-card:hover .product-img img {
    transform: scale(1.1);
}

.product-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 220px);

    h3 {
        font-size: 1.2rem;
        margin-bottom: 10px;
        flex-grow: 1;
    }
}

.empty-result {
    text-align: center;
    padding: 30px 20px 10px;
    color: $light-text;

    i {
        font-size: 2rem;
        margin-bottom: 10px;
        color: $primary;
    }

    h3 {
        color: $text;
        margin-bottom: 8px;
    }
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.product-price {
    display: flex;
    flex-direction: column;
}

.current-price {
    font-weight: 700;
    color: $primary;
    font-size: 1.2rem;
}

.original-price {
    font-size: 0.9rem;
    color: $light-text;
    text-decoration: line-through;
}

.product-category {
    font-size: 0.9rem;
    color: $light-text;
    background: $light-bg;
    padding: 4px 10px;
    border-radius: 20px;
}

.product-actions {
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;

    .btn {
        flex: 1;
        justify-content: center;
        font-size: 0.99rem;
    }
}

@media (max-width: 768px) {
    .product-actions {
        flex-direction: column;
    }

    .product-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
}
</style>
