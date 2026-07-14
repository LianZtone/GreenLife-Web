<template>
    <section class="blog">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Artikel Terbaru</h2>
                <p>Tips dan informasi terbaru tentang gaya hidup sehat dan ramah lingkungan</p>
            </div>

            <!-- Blog Categories -->
            <div class="blog-categories fade-in">
                <button v-for="category in categories" :key="category.value"
                    :class="['category-btn', { active: activeCategory === category.value }]"
                    @click="setCategory(category.value)">
                    {{ category.label }}
                </button>
            </div>

            <!-- Featured Post -->
            <div v-if="featuredPost && activeCategory === 'all'" class="featured-post fade-in delay-1">
                <div class="card featured-card">
                    <div class="featured-image">
                        <img loading="lazy" :src="featuredPost.image" :alt="featuredPost.title">
                        <div class="featured-badge">
                            <i class="fas fa-star"></i> Featured
                        </div>
                    </div>
                    <div class="featured-content">
                        <div class="post-meta">
                            <span class="post-category">{{ featuredPost.category }}</span>
                            <span class="post-date">{{ featuredPost.date }}</span>
                            <span class="post-read-time">{{ featuredPost.readTime }}</span>
                        </div>
                        <h3>{{ featuredPost.title }}</h3>
                        <p class="post-excerpt">{{ featuredPost.excerpt }}</p>
                        <div class="post-footer">
                            <div class="author-info">
                                <img loading="lazy" :src="featuredPost.author.avatar" :alt="featuredPost.author.name"
                                    class="author-avatar">
                                <div class="author-details">
                                    <span class="author-name">{{ featuredPost.author.name }}</span>
                                    <span class="author-role">{{ featuredPost.author.role }}</span>
                                </div>
                            </div>
                            <button type="button" class="btn btn-accent" @click="readMore(featuredPost)">
                                Baca Selengkapnya <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Blog Posts Grid -->
            <div class="blog-posts grid grid-auto">
                <div v-for="(post, index) in filteredPosts" :key="post.id" class="card blog-card fade-in"
                    :class="`delay-${(index % 3) + 1}`">
                    <div class="blog-img">
                        <img loading="lazy" :src="post.image" :alt="post.title">
                        <div class="blog-date">{{ formatDate(post.date) }}</div>
                        <div class="blog-category-tag">{{ post.category }}</div>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span><i class="fas fa-user"></i> {{ post.author.name }}</span>
                            <span><i class="fas fa-clock"></i> {{ post.readTime }}</span>
                        </div>
                        <h3>{{ post.title }}</h3>
                        <p class="post-excerpt">{{ post.excerpt }}</p>

                        <div class="post-stats">
                            <span class="stat">
                                <i class="fas fa-eye"></i> {{ post.views }}
                            </span>
                            <span class="stat">
                                <i class="fas fa-comment"></i> {{ post.comments }}
                            </span>
                            <span class="stat">
                                <i class="fas fa-heart"></i> {{ post.likes }}
                            </span>
                        </div>

                        <div class="blog-actions">
                            <button type="button" class="btn" @click="readMore(post)">
                                Baca Selengkapnya
                            </button>
                            <button class="btn-icon" @click="toggleLike(post)" :class="{ liked: post.liked }">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="btn-icon" @click="sharePost(post)">
                                <i class="fas fa-share"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Load More Button -->
            <div v-if="showLoadMore" class="load-more-section fade-in">
                <button class="btn btn-outline" @click="loadMorePosts">
                    <i class="fas fa-plus"></i> Muat Lebih Banyak Artikel
                </button>
            </div>

            <!-- Newsletter Subscription -->
            <div class="blog-newsletter fade-in">
                <div class="card newsletter-card">
                    <div class="newsletter-content">
                        <h3>Dapatkan Update Terbaru</h3>
                        <p>Berlangganan newsletter kami untuk mendapatkan artikel terbaru tentang gaya hidup sehat
                            langsung ke email Anda</p>
                        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                            <input type="email" v-model="newsletterEmail" placeholder="Masukkan email Anda" required>
                            <button type="submit" class="btn btn-accent">
                                <i class="fas fa-paper-plane"></i> Berlangganan
                            </button>
                        </form>
                    </div>
                    <div class="newsletter-image">
                        <img loading="lazy" :src="imgNewsletter"
                            alt="Newsletter">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Swal from 'sweetalert2'

import { ref, computed } from 'vue'

import imgFeatured from '../../assets/images/products/brooke-lark-nTZOILVZuOg-unsplash.webp'
import imgPost1 from '../../assets/images/products/jason-briscoe-GrdJp16CPk8-unsplash.webp'
import imgPost2 from '../../assets/images/products/dovile-ramoskaite-xX9SmqQCbFY-unsplash.webp'
import imgPost3 from '../../assets/images/products/matteo-di-iorio-VD-Vjc8VmRA-unsplash.webp'
import imgPost4 from '../../assets/images/products/markus-winkler-HeqXGxnsnX4-unsplash.webp'
import imgPost5 from '../../assets/images/products/christina-rumpf-UrXlE1GZ5PQ-unsplash.webp'
import imgNewsletter from '../../assets/images/products/pavel-tolmachev-LqbMnLq6ri8-unsplash.webp'


import avatarSarah from  '../../assets/images/avatars/alex-suprun-mynsNaNwVDc-unsplash.webp'
import avatarBudi from '../../assets/images/avatars/jurica-koletic-7YVZYZeITc8-unsplash.webp'
import avatarMaya from '../../assets/images/avatars/michael-dam-mEZ3PoFGs_k-unsplash.webp'
import avatarAndi from '../../assets/images/avatars/ali-morshedlou-WMD64tMfc4k-unsplash.webp'
import avatarRina from '../../assets/images/avatars/christopher-campbell-rDEOVtE7vOs-unsplash.webp'
import avatarLisa from '../../assets/images/avatars/jake-nackos-IF9TK5Uy-KI-unsplash.webp'



const activeCategory = ref('all')
const newsletterEmail = ref('')

const categories = [
    { value: 'all', label: 'Semua' },
    { value: 'gaya-hidup', label: 'Gaya Hidup' },
    { value: 'tips', label: 'Tips' },
    { value: 'resep', label: 'Resep' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'lingkungan', label: 'Lingkungan' }
]

const featuredPost = ref({
    id: 1,
    title: '5 Manfaat Mengonsumsi Makanan Organik untuk Kesehatan Jangka Panjang',
    excerpt: 'Makanan organik tidak hanya baik untuk lingkungan tetapi juga memberikan banyak manfaat untuk kesehatan tubuh Anda dalam jangka panjang. Temukan bagaimana perubahan kecil dapat membawa dampak besar.',
    category: 'Gaya Hidup',
    date: '2024-01-15',
    readTime: '5 min read',
    image: imgFeatured,
    views: 1247,
    comments: 23,
    likes: 89,
    liked: false,
    author: {
        name: 'Dr. Sarah Wijaya',
        role: 'Ahli Gizi',
        avatar: avatarSarah
    }
})

const blogPosts = ref([
    {
        id: 2,
        title: 'Cara Memulai Gaya Hidup Ramah Lingkungan di Rumah',
        excerpt: 'Mulai dari hal kecil di rumah, Anda dapat berkontribusi dalam menjaga kelestarian lingkungan dengan mudah dan praktis.',
        category: 'Lingkungan',
        date: '2024-01-10',
        readTime: '4 min read',
        image: imgPost1,
        views: 892,
        comments: 15,
        likes: 67,
        liked: false,
        author: { name: 'Budi Santoso', role: 'Environmental Activist', avatar: avatarBudi }
    },
    {
        id: 3,
        title: 'Resep Smoothie Bowl Sehat dengan Bahan Organik',
        excerpt: 'Coba resep smoothie bowl lezat ini yang terbuat dari 100% bahan organik untuk sarapan sehat Anda.',
        category: 'Resep',
        date: '2024-01-05',
        readTime: '3 min read',
        image: imgPost2,
        views: 1567,
        comments: 31,
        likes: 124,
        liked: true,
        author: { name: 'Chef Maya Sari', role: 'Healthy Chef', avatar: avatarMaya }
    },
    {
        id: 4,
        title: 'Meditasi untuk Kesehatan Mental di Era Modern',
        excerpt: 'Teknik meditasi sederhana yang dapat membantu mengurangi stres dan meningkatkan kualitas hidup.',
        category: 'Kesehatan',
        date: '2024-01-03',
        readTime: '6 min read',
        image: imgPost3,
        views: 2103,
        comments: 42,
        likes: 156,
        liked: false,
        author: { name: 'Dr. Andi Pratama', role: 'Psikolog Klinis', avatar: avatarAndi }
    },
    {
        id: 5,
        title: 'Urban Farming: Berkebun di Lahan Terbatas',
        excerpt: 'Belajar cara menanam sayuran dan rempah organik di rumah meski dengan lahan yang terbatas.',
        category: 'Tips',
        date: '2023-12-28',
        readTime: '4 min read',
        image: imgPost4,
        views: 1345,
        comments: 28,
        likes: 98,
        liked: false,
        author: { name: 'Rina Hartati', role: 'Urban Gardener', avatar: avatarRina }
    },
    {
        id: 6,
        title: 'Detox Alami dengan Jus Sayuran Organik',
        excerpt: 'Program detox sederhana menggunakan jus sayuran organik untuk membersihkan tubuh dari racun.',
        category: 'Kesehatan',
        date: '2023-12-25',
        readTime: '5 min read',
        image: imgPost5,
        views: 1876,
        comments: 35,
        likes: 112,
        liked: false,
        author: { name: 'Dr. Lisa Setiawan', role: 'Naturopath', avatar: avatarLisa }
    }
])

const displayedPosts = ref(6)
const postsPerLoad = 3

const filteredPosts = computed(() => {
    let posts = blogPosts.value
    if (activeCategory.value !== 'all') {
        posts = posts.filter(p => p.category.toLowerCase() === activeCategory.value.toLowerCase())
    }
    return posts.slice(0, displayedPosts.value)
})

const showLoadMore = computed(() => {
    let total = blogPosts.value.length
    if (activeCategory.value !== 'all') {
        total = blogPosts.value.filter(p => p.category.toLowerCase() === activeCategory.value.toLowerCase()).length
    }
    return displayedPosts.value < total
})

function setCategory(category) {
    activeCategory.value = category
    displayedPosts.value = 6
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function readMore(post) {
    Swal.fire({
        title: post.title,
        html: `
      <div style="text-align: left;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
          <img src="${post.author.avatar}" alt="${post.author.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
          <div><strong>${post.author.name}</strong><br><small>${post.author.role}</small></div>
        </div>
        <p><strong>Kategori:</strong> ${post.category}</p>
        <p><strong>Dipublikasi:</strong> ${formatDate(post.date)}</p>
        <p><strong>Waktu Baca:</strong> ${post.readTime}</p>
        <hr>
        <p>${post.excerpt}</p>
        <p><em>Artikel lengkap akan segera tersedia...</em></p>
      </div>
    `,
        imageUrl: post.image,
        imageWidth: 400,
        imageHeight: 250,
        showCloseButton: true,
        confirmButtonText: 'Tutup',
        confirmButtonColor: '#4CAF50'
    })
}

function toggleLike(post) {
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
    if (post.liked) {
        Swal.fire({
            title: 'Disukai!',
            text: 'Artikel telah ditambahkan ke favorit Anda',
            icon: 'success',
            confirmButtonColor: '#4CAF50',
            timer: 1500
        })
    }
}

function loadMorePosts() {
    displayedPosts.value += postsPerLoad
}

function subscribeNewsletter() {
    if (newsletterEmail.value) {
        Swal.fire({
            title: 'Berhasil Berlangganan!',
            text: `Terima kasih ${newsletterEmail.value} telah berlangganan newsletter kami`,
            icon: 'success',
            confirmButtonColor: '#4CAF50'
        })
        newsletterEmail.value = ''
    }
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.blog {
    padding: 80px 0;
    background: linear-gradient(to bottom, $white, $light-bg);
}

.blog-categories {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 40px;
}

.category-btn {
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
}

.featured-post {
    margin-bottom: 60px;
}

.featured-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    overflow: hidden;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.featured-image {
    position: relative;
    height: 400px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .featured-badge {
        position: absolute;
        top: 20px;
        left: 20px;
        background: $accent;
        color: $text;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;

        i {
            margin-right: 5px;
        }
    }
}

.featured-content {
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .post-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        flex-wrap: wrap;

        span {
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .post-category {
            background: $primary-light;
            color: $primary;
        }

        .post-date {
            background: #e3f2fd;
            color: #1976d2;
        }

        .post-read-time {
            background: #f3e5f5;
            color: #7b1fa2;
        }
    }

    h3 {
        font-size: 1.8rem;
        margin-bottom: 15px;
        line-height: 1.3;
        color: $text;
    }

    .post-excerpt {
        color: $light-text;
        line-height: 1.6;
        margin-bottom: 25px;
        font-size: 1.05rem;
    }

    .post-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        @media (max-width: 576px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
        }
    }
}

.author-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .author-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid $primary-light;
    }

    .author-details {
        display: flex;
        flex-direction: column;

        .author-name {
            font-weight: 600;
            color: $text;
        }

        .author-role {
            font-size: 0.85rem;
            color: $light-text;
        }
    }
}

.blog-posts {
    margin-bottom: 60px;
}

.blog-card {
    transition: $transition;
    overflow: hidden;

    &:hover {
        transform: translateY(-8px);
    }
}

.blog-img {
    height: 220px;
    position: relative;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .blog-date {
        position: absolute;
        top: 15px;
        left: 15px;
        background: $primary;
        color: $white;
        padding: 5px 12px;
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 500;
    }

    .blog-category-tag {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.9);
        color: $primary;
        padding: 5px 12px;
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 500;
        backdrop-filter: blur(10px);
    }
}

.blog-card:hover .blog-img img {
    transform: scale(1.1);
}

.blog-content {
    padding: 25px;

    .blog-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 12px;
        flex-wrap: wrap;

        span {
            display: flex;
            align-items: center;
            gap: 5px;
            color: $light-text;
            font-size: 0.85rem;

            i {
                color: $primary;
                font-size: 0.8rem;
            }
        }
    }

    h3 {
        font-size: 1.3rem;
        margin-bottom: 12px;
        line-height: 1.4;
        color: $text;
        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .post-excerpt {
        color: $light-text;
        line-height: 1.6;
        margin-bottom: 15px;
        display: -webkit-box;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}

.post-stats {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;

    .stat {
        display: flex;
        align-items: center;
        gap: 5px;
        color: $light-text;
        font-size: 0.85rem;

        i {
            font-size: 0.8rem;
        }
    }
}

.blog-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .btn {
        flex: 1;
        justify-content: center;
        font-size: 0.9rem;
    }

    .btn-icon {
        width: 40px;
        height: 40px;
        border: 2px solid $light-bg;
        background: transparent;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: $transition;
        color: $light-text;

        &:hover {
            border-color: $primary;
            color: $primary;
        }

        &.liked {
            background: #f44336;
            border-color: #f44336;
            color: $white;
        }
    }
}

.load-more-section {
    text-align: center;
    margin: 40px 0;

    .btn {
        padding: 12px 30px;
    }
}

.blog-newsletter {
    margin-top: 60px;
}

.newsletter-card {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0;
    background: linear-gradient(135deg, $primary-light 0%, $light-bg 100%);
    overflow: hidden;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.newsletter-content {
    padding: 40px;

    h3 {
        color: $text;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }

    p {
        color: $light-text;
        margin-bottom: 25px;
        line-height: 1.6;
    }
}

.newsletter-form {
    display: flex;
    gap: 10px;

    @media (max-width: 576px) {
        flex-direction: column;
    }

    input {
        flex: 1;
        padding: 12px 16px;
        border: 2px solid $white;
        border-radius: 8px;
        font-size: 1rem;
        transition: $transition;

        &:focus {
            outline: none;
            border-color: $primary;
        }
    }

    .btn {
        white-space: nowrap;

        @media (max-width: 576px) {
            justify-content: center;
        }
    }
}

.newsletter-image {
    height: 250px;

    @media (max-width: 768px) {
        height: 200px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

@media (max-width: 992px) {
    .featured-content {
        padding: 30px;

        h3 {
            font-size: 1.5rem;
        }
    }
}

@media (max-width: 768px) {
    .blog-categories {
        gap: 8px;
    }

    .category-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
    }

    .featured-image {
        height: 300px;
    }

    .newsletter-content {
        padding: 30px;
    }
}

@media (max-width: 576px) {
    .blog-content {
        padding: 20px;
    }

    .blog-actions {
        flex-direction: column;

        .btn {
            width: 100%;
        }
    }

    .post-stats {
        justify-content: center;
    }

    .author-info {
        .author-details {
            .author-name {
                font-size: 0.9rem;
            }

            .author-role {
                font-size: 0.8rem;
            }
        }
    }
}
</style>
