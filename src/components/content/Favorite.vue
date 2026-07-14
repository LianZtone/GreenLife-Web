<template>
    <section class="favorites">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Produk Favorit</h2>
                <p>Produk-produk yang telah Anda simpan</p>
            </div>

            <!-- Favorites Content -->
            <div class="favorites-content">
                <div v-if="favoriteProducts.length === 0" class="empty-favorites fade-in">
                    <div class="empty-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <h3>Belum Ada Produk Favorit</h3>
                    <p>Simpan produk favorit Anda untuk melihatnya di sini</p>
                    <router-link to="/produk" class="btn btn-accent">
                        <i class="fas fa-shopping-bag"></i> Jelajahi Produk
                    </router-link>
                </div>

                <div v-else>
                    <!-- Favorites Actions -->
                    <div class="favorites-actions fade-in">
                        <div class="actions-left">
                            <span class="favorites-count">{{ favoriteProducts.length }} produk disimpan</span>
                        </div>
                        <div class="actions-right">
                            <button class="btn btn-outline btn-sm" @click="clearAllFavorites"
                                :disabled="favoriteProducts.length === 0">
                                <i class="fas fa-trash"></i> Hapus Semua
                            </button>
                            <button class="btn btn-sm" @click="addAllToCart" :disabled="favoriteProducts.length === 0">
                                <i class="fas fa-cart-plus"></i> Tambah Semua ke Keranjang
                            </button>
                        </div>
                    </div>

                    <!-- Favorites Grid -->
                    <div class="favorites-grid grid grid-auto">
                        <div v-for="product in favoriteProducts" :key="product.id" class="card product-card fade-in">
                            <button class="favorite-btn active" @click="toggleFavorite(product)">
                                <i class="fas fa-heart"></i>
                            </button>

                            <div class="product-img">
                                <img :src="product.image" :alt="product.name">
                                <div v-if="product.badge" :class="['product-badge', product.badge.type]">
                                    {{ product.badge.text }}
                                </div>
                            </div>

                            <div class="product-info">
                                <h3>{{ product.name }}</h3>
                                <p class="product-category">{{ product.category }}</p>

                                <div class="product-meta">
                                    <div class="product-price">
                                        <span class="current-price">{{ product.currentPrice }}</span>
                                        <span v-if="product.originalPrice" class="original-price">
                                            {{ product.originalPrice }}
                                        </span>
                                    </div>
                                    <div class="product-rating">
                                        <i class="fas fa-star"></i>
                                        <span>{{ product.rating }}</span>
                                    </div>
                                </div>

                                <div class="product-stock" :class="{ 'low-stock': product.stock < 10 }">
                                    <i class="fas fa-box"></i>
                                    Stok: {{ product.stock }}
                                </div>

                                <div class="product-actions">
                                    <button class="btn btn-sm" @click="addToCart(product)"
                                        :disabled="product.stock === 0">
                                        <i class="fas fa-cart-plus"></i>
                                        {{ product.stock === 0 ? 'Habis' : 'Keranjang' }}
                                    </button>
                                    <button class="btn btn-outline btn-sm" @click="viewProduct(product)">
                                        <i class="fas fa-eye"></i> Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recommended Products -->
            <div v-if="favoriteProducts.length > 0" class="recommended-section fade-in">
                <div class="section-title">
                    <h3>Rekomendasi untuk Anda</h3>
                    <p>Produk lain yang mungkin Anda sukai</p>
                </div>
                <div class="recommended-grid grid grid-auto">
                    <div v-for="product in recommendedProducts" :key="product.id" class="card product-card">
                        <button class="favorite-btn" :class="{ active: isProductFavorited(product) }"
                            @click="toggleFavorite(product)">
                            <i class="fas fa-heart"></i>
                        </button>

                        <div class="product-img">
                            <img :src="product.image" :alt="product.name">
                        </div>

                        <div class="product-info">
                            <h3>{{ product.name }}</h3>
                            <p class="product-category">{{ product.category }}</p>

                            <div class="product-meta">
                                <div class="product-price">
                                    <span class="current-price">{{ product.currentPrice }}</span>
                                </div>
                            </div>

                            <div class="product-actions">
                                <button class="btn btn-sm" @click="addToCart(product)">
                                    <i class="fas fa-cart-plus"></i> Keranjang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'

// === State ===
const favoriteProducts = ref([
  {
    id: 2,
    name: 'Skincare Alami GreenLife',
    category: 'Skincare Organik',
    image: 'https://plus.unsplash.com/premium_photo-1661454224348-5ebd8dc380bb?ixlib=rb-4.1.0&auto=format&fit=crop&w=1170&q=80',
    currentPrice: 'Rp 125.000',
    originalPrice: '',
    badge: { type: 'new', text: 'Baru' },
    rating: 4.8,
    stock: 15
  },
  {
    id: 4,
    name: 'Madu Murni Organik',
    category: 'Makanan Sehat',
    image: 'https://images.unsplash.com/photo-1671548185843-3f50c6c1060b?ixlib=rb-4.1.0&auto=format&fit=crop&w=1035&q=80',
    currentPrice: 'Rp 120.000',
    originalPrice: 'Rp 150.000',
    badge: { type: 'discount', text: 'Diskon 20%' },
    rating: 4.6,
    stock: 8
  },
  {
    id: 7,
    name: 'Kacang Almond Organik',
    category: 'Makanan Sehat',
    image: 'https://images.unsplash.com/photo-1615485500678-4a6c6c6e83d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    currentPrice: 'Rp 90.000',
    originalPrice: '',
    badge: null,
    rating: 4.7,
    stock: 0
  }
])

const recommendedProducts = ref([
  {
    id: 8,
    name: 'Granola Organik',
    category: 'Makanan Sehat',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    currentPrice: 'Rp 75.000',
    originalPrice: '',
    badge: null,
    rating: 4.5,
    stock: 20
  },
  {
    id: 9,
    name: 'Minyak Kelapa Organik',
    category: 'Bahan Masak',
    image: 'https://images.unsplash.com/photo-1583248369069-9d9f1340b171?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    currentPrice: 'Rp 85.000',
    originalPrice: '',
    badge: null,
    rating: 4.4,
    stock: 12
  },
  {
    id: 10,
    name: 'Teh Hijau Organik',
    category: 'Minuman Herbal',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    currentPrice: 'Rp 55.000',
    originalPrice: '',
    badge: null,
    rating: 4.6,
    stock: 25
  },
  {
    id: 11,
    name: 'Sabun Mandi Organik',
    category: 'Perawatan Tubuh',
    image: 'https://images.unsplash.com/photo-1600857062244-5c0071b5d6c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    currentPrice: 'Rp 45.000',
    originalPrice: '',
    badge: null,
    rating: 4.3,
    stock: 18
  }
])

// === Methods ===
function toggleFavorite(product) {
  const isFavorited = favoriteProducts.value.some(fp => fp.id === product.id)

  if (isFavorited) {
    // Hapus dari favorit
    favoriteProducts.value = favoriteProducts.value.filter(fp => fp.id !== product.id)
    Swal.fire({
      title: 'Dihapus dari Favorit!',
      text: `${product.name} telah dihapus dari daftar favorit`,
      icon: 'success',
      confirmButtonColor: '#4CAF50',
      timer: 1500
    })
  } else {
    // Tambahkan ke favorit
    favoriteProducts.value.unshift(product)
    Swal.fire({
      title: 'Ditambahkan ke Favorit!',
      text: `${product.name} telah disimpan ke daftar favorit`,
      icon: 'success',
      confirmButtonColor: '#4CAF50',
      timer: 1500
    })
  }
}

function isProductFavorited(product) {
  return favoriteProducts.value.some(fp => fp.id === product.id)
}

function clearAllFavorites() {
  Swal.fire({
    title: 'Hapus Semua Favorit?',
    text: 'Semua produk favorit akan dihapus permanen',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, Hapus Semua',
    cancelButtonText: 'Batal'
  }).then(result => {
    if (result.isConfirmed) {
      favoriteProducts.value = []
      Swal.fire({
        title: 'Berhasil!',
        text: 'Semua produk favorit telah dihapus',
        icon: 'success',
        confirmButtonColor: '#4CAF50'
      })
    }
  })
}

function addAllToCart() {
  const availableProducts = favoriteProducts.value.filter(p => p.stock > 0)

  if (availableProducts.length === 0) {
    Swal.fire({
      title: 'Tidak ada produk tersedia',
      text: 'Semua produk favorit sedang habis',
      icon: 'warning',
      confirmButtonColor: '#f44336'
    })
    return
  }

  Swal.fire({
    title: 'Tambahkan Semua ke Keranjang?',
    text: `${availableProducts.length} produk akan ditambahkan ke keranjang`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Tambahkan',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#4CAF50'
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Berhasil!',
        text: `${availableProducts.length} produk telah ditambahkan ke keranjang`,
        icon: 'success',
        confirmButtonColor: '#4CAF50'
      })
    }
  })
}

function addToCart(product) {
  if (product.stock === 0) {
    Swal.fire({
      title: 'Stok Habis',
      text: 'Maaf, produk ini sedang tidak tersedia',
      icon: 'warning',
      confirmButtonColor: '#f44336'
    })
    return
  }

  Swal.fire({
    title: 'Ditambahkan ke Keranjang!',
    text: `${product.name} telah ditambahkan ke keranjang`,
    icon: 'success',
    confirmButtonColor: '#4CAF50',
    timer: 1500
  })
}

function viewProduct(product) {
  Swal.fire({
    title: product.name,
    html: `
      <div style="text-align: left;">
        <img src="${product.image}" alt="${product.name}" 
          style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
        <p><strong>Kategori:</strong> ${product.category}</p>
        <p><strong>Harga:</strong> ${product.currentPrice} ${product.originalPrice ? `<del>${product.originalPrice}</del>` : ''}</p>
        <p><strong>Rating:</strong> ⭐ ${product.rating}/5.0</p>
        <p><strong>Stok:</strong> ${product.stock} unit</p>
        <p><strong>Deskripsi:</strong> Produk organik berkualitas tinggi dengan bahan-bahan alami terbaik.</p>
      </div>
    `,
    showCloseButton: true,
    showConfirmButton: false,
    width: 500
  })
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.favorites {
    margin-top: -100px;
    padding: 80px 0;
    background: linear-gradient(to bottom, $white, $light-bg);
    min-height: 100vh;
}

.favorites-content {
    margin-bottom: 60px;
}

.empty-favorites {
    text-align: center;
    padding: 80px 20px;

    .empty-icon {
        font-size: 5rem;
        color: #ffebee;
        margin-bottom: 20px;
    }

    h3 {
        color: $text;
        margin-bottom: 15px;
    }

    p {
        color: $light-text;
        margin-bottom: 30px;
        font-size: 1.1rem;
    }
}

.favorites-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: $white;
    border-radius: 12px;
    box-shadow: $card-shadow;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
}

.actions-left {
    .favorites-count {
        font-weight: 600;
        color: $primary;
        font-size: 1.1rem;
    }
}

.actions-right {
    display: flex;
    gap: 10px;

    @media (max-width: 576px) {
        flex-direction: column;
        width: 100%;

        .btn {
            justify-content: center;
        }
    }
}

.favorites-grid {
    margin-bottom: 0;
}

.product-card {
    padding: 20px;
    position: relative;
    transition: $transition;

    &:hover {
        transform: translateY(-5px);
    }
}

.favorite-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: $transition;
    z-index: 2;
    backdrop-filter: blur(10px);

    &:hover {
        background: $white;
        transform: scale(1.1);
    }

    &.active {
        background: #ffebee;
        color: #f44336;

        &:hover {
            background: #f44336;
            color: $white;
        }
    }

    i {
        font-size: 1.1rem;
    }
}

.product-img {
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    margin-bottom: 15px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    &:hover img {
        transform: scale(1.05);
    }
}

.product-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.7rem;
    font-weight: 600;
    z-index: 1;

    &.discount {
        background: #f44336;
        color: white;
    }

    &.new {
        background: #2196f3;
        color: white;
    }
}

.product-info {
    h3 {
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: $text;
        line-height: 1.4;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .product-category {
        color: $light-text;
        font-size: 0.85rem;
        margin-bottom: 10px;
    }
}

.product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.product-price {
    .current-price {
        font-weight: 700;
        color: $primary;
        font-size: 1.1rem;
    }

    .original-price {
        font-size: 0.9rem;
        color: $light-text;
        text-decoration: line-through;
        margin-left: 5px;
    }
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    color: $accent;
    font-size: 0.9rem;
    font-weight: 600;

    i {
        font-size: 0.8rem;
    }
}

.product-stock {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.85rem;
    margin-bottom: 15px;
    padding: 5px 10px;
    background: $light-bg;
    border-radius: 8px;

    &.low-stock {
        background: #fff3cd;
        color: #856404;
    }

    i {
        font-size: 0.8rem;
    }
}

.product-actions {
    display: flex;
    gap: 8px;

    .btn {
        flex: 1;
        justify-content: center;
        font-size: 0.8rem;
        padding: 8px 12px;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
}

.recommended-section {
    margin-top: 60px;

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

@media (max-width: 768px) {
    .favorites-actions {
        padding: 15px;
    }

    .product-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
    }

    .product-actions {
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .empty-favorites {
        padding: 60px 15px;

        .empty-icon {
            font-size: 4rem;
        }
    }

    .product-img {
        height: 160px;
    }
}
</style>
