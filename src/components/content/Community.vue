<template>
    <section class="community">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Komunitas GreenLife</h2>
                <p>Bergabunglah dengan komunitas pecinta gaya hidup sehat dan ramah lingkungan</p>
            </div>

            <div class="community-stats fade-in">
                <div class="stats-grid grid grid-4">
                    <div class="stat-card card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-number">{{ formatNumber(stats.members) }}+</div>
                        <div class="stat-label">Anggota</div>
                    </div>
                    <div class="stat-card card">
                        <div class="stat-icon">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="stat-number">{{ stats.events }}+</div>
                        <div class="stat-label">Event</div>
                    </div>
                    <div class="stat-card card">
                        <div class="stat-icon">
                            <i class="fas fa-comments"></i>
                        </div>
                        <div class="stat-number">{{ formatNumber(stats.discussions) }}+</div>
                        <div class="stat-label">Diskusi</div>
                    </div>
                    <div class="stat-card card">
                        <div class="stat-icon">
                            <i class="fas fa-seedling"></i>
                        </div>
                        <div class="stat-number">{{ stats.projects }}+</div>
                        <div class="stat-label">Proyek</div>
                    </div>
                </div>
            </div>

        
            <div class="community-content">
                <div class="community-sidebar fade-in">
                    
                    <div class="card community-info">
                        <h3>Tentang Komunitas</h3>
                        <p>GreenLife Community adalah wadah bagi para pecinta gaya hidup sehat dan ramah lingkungan
                            untuk berbagi pengalaman, tips, dan inspirasi.</p>
                        <div class="community-features">
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Sharing session mingguan</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Workshop & webinar</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Kompetisi hijau</span>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Networking</span>
                            </div>
                        </div>
                    </div>

                    <div class="card upcoming-events">
                        <h3>Event Mendatang</h3>
                        <div class="events-list">
                            <div v-for="event in upcomingEvents" :key="event.id" class="event-item">
                                <div class="event-date">
                                    <span class="date-day">{{ getDay(event.date) }}</span>
                                    <span class="date-month">{{ getMonth(event.date) }}</span>
                                </div>
                                <div class="event-details">
                                    <h4>{{ event.title }}</h4>
                                    <p class="event-time">
                                        <i class="fas fa-clock"></i> {{ event.time }}
                                    </p>
                                    <p class="event-location">
                                        <i class="fas fa-map-marker-alt"></i> {{ event.location }}
                                    </p>
                                </div>
                                <button class="btn btn-sm" @click="registerEvent(event)">
                                    Daftar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card community-leaders">
                        <h3>Pengurus Komunitas</h3>
                        <div class="leaders-list">
                            <div v-for="leader in leaders" :key="leader.id" class="leader-item">
                                <img loading="lazy" :src="leader.avatar" :alt="leader.name" class="leader-avatar">
                                <div class="leader-info">
                                    <h4>{{ leader.name }}</h4>
                                    <p class="leader-role">{{ leader.role }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="community-main">
                    <div class="card welcome-section fade-in delay-1">
                        <div class="welcome-content">
                            <h2>Mari Terhubung dan Berbagi</h2>
                            <p>Bergabunglah dengan komunitas kami yang peduli terhadap kesehatan dan lingkungan.
                                Diskusikan pengalaman, tips, dan dapatkan informasi terbaru tentang gaya hidup sehat.
                            </p>
                            <div class="welcome-actions">
                                <button class="btn btn-accent" @click="joinCommunity">
                                    <i class="fas fa-user-plus"></i> Bergabung Sekarang
                                </button>
                                <button class="btn btn-outline" @click="viewGuidelines">
                                    <i class="fas fa-book"></i> Panduan Komunitas
                                </button>
                            </div>
                        </div>
                        <div class="welcome-image">
                            <img loading="lazy" src="../../assets/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.webp" alt="Community Welcome">
                        </div>
                    </div>

                    <div class="card discussion-forum fade-in delay-2">
                        <div class="forum-header">
                            <h3>Forum Diskusi Terbaru</h3>
                            <button class="btn btn-sm" @click="startDiscussion">
                                <i class="fas fa-plus"></i> Diskusi Baru
                            </button>
                        </div>
                        <div class="discussions-list">
                            <div v-for="discussion in discussions" :key="discussion.id" class="discussion-item">
                                <div class="discussion-avatar">
                                    <img loading="lazy" :src="discussion.author.avatar" :alt="discussion.author.name">
                                </div>
                                <div class="discussion-content">
                                    <h4 @click="viewDiscussion(discussion)" class="discussion-title">
                                        {{ discussion.title }}
                                    </h4>
                                    <div class="discussion-meta">
                                        <span class="author">{{ discussion.author.name }}</span>
                                        <span class="time">{{ discussion.time }}</span>
                                        <span class="category">{{ discussion.category }}</span>
                                    </div>
                                    <p class="discussion-excerpt">{{ discussion.excerpt }}</p>
                                    <div class="discussion-stats">
                                        <span class="stat">
                                            <i class="fas fa-comment"></i> {{ discussion.replies }}
                                        </span>
                                        <span class="stat">
                                            <i class="fas fa-eye"></i> {{ discussion.views }}
                                        </span>
                                        <span class="stat">
                                            <i class="fas fa-heart"></i> {{ discussion.likes }}
                                        </span>
                                    </div>
                                </div>
                                <div class="discussion-status" :class="discussion.status">
                                    {{ discussion.status === 'active' ? 'Aktif' : 'Selesai' }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card community-projects fade-in delay-3">
                        <h3>Proyek Komunitas</h3>
                        <div class="projects-grid grid grid-2">
                            <div v-for="project in projects" :key="project.id" class="project-card">
                                <div class="project-image">
                                    <img loading="lazy" :src="project.image" :alt="project.title">
                                    <div class="project-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" :style="{ width: project.progress + '%' }"></div>
                                        </div>
                                        <span class="progress-text">{{ project.progress }}%</span>
                                    </div>
                                </div>
                                <div class="project-content">
                                    <h4>{{ project.title }}</h4>
                                    <p class="project-description">{{ project.description }}</p>
                                    <div class="project-stats">
                                        <span class="stat">
                                            <i class="fas fa-users"></i> {{ project.participants }} peserta
                                        </span>
                                        <span class="stat">
                                            <i class="fas fa-target"></i> {{ project.daysLeft }} hari lagi
                                        </span>
                                    </div>
                                    <div class="project-actions">
                                        <button class="btn btn-sm" @click="joinProject(project)">
                                            Ikut Proyek
                                        </button>
                                        <button class="btn btn-outline btn-sm" @click="viewProject(project)">
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Testimonials -->
                    <div class="card community-testimonials fade-in delay-4">
                        <h3>Apa Kata Anggota Kami</h3>
                        <div class="testimonials-slider">
                            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-item">
                                <div class="testimonial-content">
                                    <i class="fas fa-quote-left quote-icon"></i>
                                    <p>"{{ testimonial.message }}"</p>
                                    <div class="testimonial-author">
                                        <img loading="lazy" :src="testimonial.avatar" :alt="testimonial.name" class="author-avatar">
                                        <div class="author-info">
                                            <h4>{{ testimonial.name }}</h4>
                                            <p class="author-role">{{ testimonial.role }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="community-faq fade-in">
                <div class="section-title">
                    <h3>Pertanyaan Umum</h3>
                    <p>Informasi penting tentang komunitas GreenLife</p>
                </div>
                <div class="faq-list grid grid-2">
                    <div v-for="(faq, index) in faqs" :key="index" class="card faq-item">
                        <div class="faq-question" @click="toggleFaq(index)">
                            <h4>{{ faq.question }}</h4>
                            <i class="fas" :class="faq.open ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                        </div>
                        <div class="faq-answer" v-show="faq.open">
                            <p>{{ faq.answer }}</p>
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

import avatarDiana from '../../assets/images/avatars/alex-suprun-mynsNaNwVDc-unsplash.webp'
import avatarBudi from '../../assets/images/avatars/jurica-koletic-7YVZYZeITc8-unsplash.webp'
import avatarMaya from '../../assets/images/avatars/michael-dam-mEZ3PoFGs_k-unsplash.webp'
import avatarAndi from '../../assets/images/avatars/ali-morshedlou-WMD64tMfc4k-unsplash.webp'
import avatarRina from '../../assets/images/avatars/christopher-campbell-rDEOVtE7vOs-unsplash.webp'
import avatarLisa from '../../assets/images/avatars/jake-nackos-IF9TK5Uy-KI-unsplash.webp'
import avatarChefMaya from '../../assets/images/avatars/jake-nackos-IF9TK5Uy-KI-unsplash.webp'
import avatarSarah from '../../assets/images/avatars/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.webp'
import avatarAhmad from '../../assets/images/avatars/juan-encalada-WC7KIHo13Fc-unsplash.webp'

import projectGreenRoof from '../../assets/images/community/georg-arthur-pflueger-xp1pSf_mY5o-unsplash.webp'
import projectGarden from '../../assets/images/community/annie-spratt-5WJAXhkE64c-unsplash.webp'

const stats = ref({
    members: 12500,
    events: 156,
    discussions: 8430,
    projects: 89
})

const upcomingEvents = ref([
    {
        id: 1,
        title: 'Workshop Urban Farming',
        date: '2024-02-15',
        time: '09:00 - 12:00',
        location: 'Online - Zoom Meeting'
    },
    {
        id: 2,
        title: 'Sharing Session: Zero Waste Lifestyle',
        date: '2024-02-20',
        time: '19:00 - 21:00',
        location: 'GreenLife Cafe, Jakarta'
    },
    {
        id: 3,
        title: 'Kompetisi Eco-Friendly Innovation',
        date: '2024-03-01',
        time: '08:00 - 17:00',
        location: 'GreenLife Headquarters'
    }
])

const leaders = ref([
    { id: 1, name: 'Diana Sari', role: 'Community Manager', avatar: avatarDiana },
    { id: 2, name: 'Budi Pratama', role: 'Event Coordinator', avatar: avatarBudi },
    { id: 3, name: 'Maya Wijaya', role: 'Content Moderator', avatar: avatarMaya }
])

const discussions = ref([
    {
        id: 1,
        title: 'Tips mengurangi sampah plastik di rumah tangga',
        excerpt: 'Bagaimana cara kalian mengurangi penggunaan plastik sekali pakai di kehidupan sehari-hari? Mari berbagi tips...',
        author: { name: 'Rina Hartati', avatar: avatarRina },
        time: '2 jam yang lalu',
        category: 'Lingkungan',
        replies: 24,
        views: 156,
        likes: 42,
        status: 'active'
    },
    {
        id: 2,
        title: 'Resep smoothie bowl sehat untuk sarapan',
        excerpt: 'Share resep smoothie bowl favorit kalian yang mudah dibuat dan bernutrisi tinggi...',
        author: { name: 'Chef Maya', avatar: avatarChefMaya },
        time: '1 hari yang lalu',
        category: 'Resep Sehat',
        replies: 18,
        views: 203,
        likes: 67,
        status: 'active'
    },
    {
        id: 3,
        title: 'Pengalaman bercocok tanam di apartemen',
        excerpt: 'Untuk yang tinggal di apartemen, tanaman apa saja yang cocok dan mudah dirawat?',
        author: { name: 'Andi Wijaya', avatar: avatarAndi },
        time: '3 hari yang lalu',
        category: 'Urban Farming',
        replies: 31,
        views: 289,
        likes: 89,
        status: 'active'
    }
])

const projects = ref([
    {
        id: 1,
        title: 'Green Roof Initiative',
        description: 'Mengubah atap gedung menjadi taman hijau produktif di pusat kota',
        image: projectGreenRoof,
        progress: 75,
        participants: 45,
        daysLeft: 15
    },
    {
        id: 2,
        title: 'Community Garden',
        description: 'Membangun kebun komunitas untuk menanam sayuran organik bersama',
        image: projectGarden,
        progress: 30,
        participants: 28,
        daysLeft: 45
    }
])

const testimonials = ref([
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Anggota sejak 2022',
        message:
            'Komunitas GreenLife telah mengubah hidup saya. Saya belajar banyak tentang sustainable living dan bertemu banyak orang inspiratif.',
        avatar: avatarSarah
    },
    {
        id: 2,
        name: 'Ahmad Fauzi',
        role: 'Volunteer Project',
        message:
            'Melalui proyek komunitas, saya bisa berkontribusi langsung untuk lingkungan dan belajar skill baru yang bermanfaat.',
        avatar: avatarAhmad
    },
    {
        id: 3,
        name: 'Lisa Setiawan',
        role: 'Urban Farmer',
        message:
            'Dukungan dari komunitas sangat membantu dalam mengembangkan urban farming project saya. Terima kasih GreenLife!',
        avatar: avatarLisa
    }
])

const faqs = ref([
    {
        question: 'Bagaimana cara bergabung dengan komunitas GreenLife?',
        answer:
            'Anda bisa bergabung dengan mengklik tombol "Bergabung Sekarang" dan mengisi formulir pendaftaran. Setelah itu, Anda akan mendapatkan akses ke semua fitur komunitas.',
        open: false
    },
    {
        question: 'Apakah ada biaya keanggotaan?',
        answer:
            'Keanggotaan dasar gratis untuk semua orang. Namun, untuk event khusus dan workshop premium mungkin ada biaya partisipasi.',
        open: false
    },
    {
        question: 'Bagaimana cara ikut proyek komunitas?',
        answer:
            'Anda bisa melihat daftar proyek yang tersedia dan mendaftar melalui halaman proyek. Tim kami akan menghubungi Anda untuk informasi lebih lanjut.',
        open: false
    },
    {
        question: 'Apakah komunitas tersedia di seluruh Indonesia?',
        answer:
            'Ya, kami memiliki anggota dari seluruh Indonesia. Event online tersedia untuk semua daerah, sedangkan event offline tersedia di kota-kota besar.',
        open: false
    }
])

function formatNumber(num) {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
    return num.toString()
}

function getDay(dateString) {
    const date = new Date(dateString)
    return date.getDate()
}

function getMonth(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', { month: 'short' })
}

function joinCommunity() {
    Swal.fire({
        title: 'Bergabung dengan Komunitas GreenLife',
        html: `
      <div style="text-align: left;">
        <p>Isi formulir berikut untuk bergabung dengan komunitas kami:</p>
        <input type="text" id="name" class="swal2-input" placeholder="Nama lengkap">
        <input type="email" id="email" class="swal2-input" placeholder="Alamat email">
        <input type="text" id="city" class="swal2-input" placeholder="Kota tempat tinggal">
        <select id="interest" class="swal2-input">
          <option value="">Pilih minat utama</option>
          <option value="organic-food">Makanan Organik</option>
          <option value="urban-farming">Urban Farming</option>
          <option value="zero-waste">Zero Waste</option>
          <option value="healthy-lifestyle">Gaya Hidup Sehat</option>
        </select>
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: 'Daftar Sekarang',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50',
        preConfirm: () => {
            const name = Swal.getPopup().querySelector('#name').value
            const email = Swal.getPopup().querySelector('#email').value
            const city = Swal.getPopup().querySelector('#city').value
            const interest = Swal.getPopup().querySelector('#interest').value
            if (!name || !email || !city || !interest) {
                Swal.showValidationMessage('Harap isi semua field')
            }
            return { name, email, city, interest }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Selamat!',
                text: 'Anda telah bergabung dengan komunitas GreenLife. Kami akan mengirimkan email konfirmasi segera.',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function viewGuidelines() {
    Swal.fire({
        title: 'Panduan Komunitas',
        html: `
      <div style="text-align: left;">
        <h4>Aturan Komunitas:</h4>
        <ul style="margin-left: 20px; padding-left: 0; list-style-type: disc;">
          <li>Hormati semua anggota komunitas</li>
          <li>Jaga kerahasiaan informasi pribadi</li>
          <li>Berbagi konten yang positif dan bermanfaat</li>
          <li>Dilarang promosi produk tanpa izin</li>
          <li>Gunakan bahasa yang sopan dan santun</li>
        </ul>
      </div>
    `,
        confirmButtonText: 'Mengerti',
        confirmButtonColor: '#4CAF50',
        width: 600
    })
}

function registerEvent(event) {
    Swal.fire({
        title: `Daftar Event: ${event.title}`,
        text: `Apakah Anda ingin mendaftar event ini pada ${getDay(event.date)} ${getMonth(event.date)}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Daftar',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Terdaftar!',
                text: 'Anda telah terdaftar untuk event ini. Detail akan dikirim via email.',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function joinProject(project) {
    Swal.fire({
        title: `Ikut Proyek: ${project.title}`,
        text: 'Apakah Anda ingin bergabung dalam proyek komunitas ini?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Bergabung',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Anda telah bergabung dengan proyek ini. Tim kami akan menghubungi Anda.',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function viewProject(project) {
    Swal.fire({
        title: project.title,
        html: `
      <div style="text-align: left;">
        <img src="${project.image}" alt="${project.title}" 
             style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
        <p><strong>Deskripsi:</strong> ${project.description}</p>
        <p><strong>Progress:</strong> ${project.progress}%</p>
        <p><strong>Peserta:</strong> ${project.participants} orang</p>
        <p><strong>Deadline:</strong> ${project.daysLeft} hari lagi</p>
      </div>
    `,
        showCloseButton: true,
        showConfirmButton: false,
        width: 500
    })
}

function toggleFaq(index) {
    faqs.value[index].open = !faqs.value[index].open
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.community {
    margin-top: -100px;
    padding: 80px 0;
    background: linear-gradient(to bottom, $white, $light-bg);
}

.community-stats {
    margin-bottom: 60px;
}

.stats-grid {
    text-align: center;
}

.stat-card {
    padding: 30px 20px;
    text-align: center;
    transition: $transition;

    &:hover {
        transform: translateY(-5px);
    }
}

.stat-icon {
    width: 60px;
    height: 60px;
    background: $primary-light;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    color: $primary;
    font-size: 1.5rem;
}

.stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: $primary;
    margin-bottom: 5px;
}

.stat-label {
    color: $light-text;
    font-weight: 500;
}

.community-content {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
    align-items: start;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
}

.community-sidebar {
    position: sticky;
    top: 100px;

    @media (max-width: 992px) {
        position: static;
    }
}

.community-info {
    padding: 25px;
    margin-bottom: 25px;

    h3 {
        color: $text;
        margin-bottom: 15px;
        font-size: 1.3rem;
    }

    p {
        color: $light-text;
        margin-bottom: 20px;
        line-height: 1.6;
    }
}

.community-features {
    .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        i {
            color: $primary;
            font-size: 0.9rem;
        }

        span {
            color: $text;
            font-size: 0.9rem;
        }
    }
}

.upcoming-events {
    padding: 25px;
    margin-bottom: 25px;

    h3 {
        color: $text;
        margin-bottom: 20px;
        font-size: 1.3rem;
    }
}

.events-list {
    .event-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 0;
        border-bottom: 1px solid $light-bg;

        &:last-child {
            border-bottom: none;
        }
    }
}

.event-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $primary-light;
    padding: 8px;
    border-radius: 8px;
    min-width: 50px;

    .date-day {
        font-weight: 700;
        color: $primary;
        font-size: 1.2rem;
        line-height: 1;
    }

    .date-month {
        font-size: 0.8rem;
        color: $primary;
        text-transform: uppercase;
    }
}

.event-details {
    flex: 1;

    h4 {
        font-size: 0.95rem;
        margin-bottom: 5px;
        color: $text;
    }

    .event-time,
    .event-location {
        font-size: 0.8rem;
        color: $light-text;
        margin-bottom: 3px;

        i {
            margin-right: 5px;
            width: 12px;
        }
    }
}

.community-leaders {
    padding: 25px;

    h3 {
        color: $text;
        margin-bottom: 20px;
        font-size: 1.3rem;
    }
}

.leaders-list {
    .leader-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid $light-bg;

        &:last-child {
            border-bottom: none;
        }
    }
}

.leader-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $primary-light;
}

.leader-info {
    h4 {
        font-size: 0.95rem;
        margin-bottom: 3px;
        color: $text;
    }

    .leader-role {
        font-size: 0.8rem;
        color: $light-text;
        margin: 0;
    }
}

.welcome-section {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 0;
    overflow: hidden;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.welcome-content {
    padding: 40px;

    h2 {
        color: $text;
        margin-bottom: 15px;
        font-size: 1.8rem;
    }

    p {
        color: $light-text;
        line-height: 1.6;
        margin-bottom: 25px;
        font-size: 1.05rem;
    }
}

.welcome-actions {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

.welcome-image {
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

.discussion-forum {
    padding: 30px;
    margin-bottom: 30px;
}

.forum-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    h3 {
        color: $text;
        margin: 0;
        font-size: 1.4rem;
    }

    @media (max-width: 576px) {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
    }
}

.discussions-list {
    .discussion-item {
        display: grid;
        grid-template-columns: 50px 1fr auto;
        gap: 15px;
        padding: 20px 0;
        border-bottom: 1px solid $light-bg;

        &:last-child {
            border-bottom: none;
        }

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 10px;
        }
    }
}

.discussion-avatar {
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
}

.discussion-content {
    .discussion-title {
        font-size: 1.1rem;
        margin-bottom: 8px;
        color: $text;
        cursor: pointer;
        transition: $transition;

        &:hover {
            color: $primary;
        }
    }

    .discussion-meta {
        display: flex;
        gap: 15px;
        margin-bottom: 10px;
        flex-wrap: wrap;

        span {
            font-size: 0.8rem;
            color: $light-text;

            &.author {
                font-weight: 500;
                color: $primary;
            }

            &.category {
                background: $primary-light;
                color: $primary;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
            }
        }
    }

    .discussion-excerpt {
        color: $light-text;
        line-height: 1.5;
        margin-bottom: 12px;
        font-size: 0.9rem;
    }
}

.discussion-stats {
    display: flex;
    gap: 15px;

    .stat {
        display: flex;
        align-items: center;
        gap: 5px;
        color: $light-text;
        font-size: 0.8rem;

        i {
            font-size: 0.7rem;
        }
    }
}

.discussion-status {
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    min-width: 70px;
    height: fit-content;

    &.active {
        background: #d4edda;
        color: #155724;
    }

    @media (max-width: 768px) {
        justify-self: start;
    }
}

.community-projects {
    padding: 30px;
    margin-bottom: 30px;

    h3 {
        color: $text;
        margin-bottom: 25px;
        font-size: 1.4rem;
    }
}

.projects-grid {
    gap: 25px;
}

.project-card {
    border: 1px solid $light-bg;
    border-radius: 12px;
    overflow: hidden;
    transition: $transition;

    &:hover {
        transform: translateY(-5px);
        box-shadow: $card-hover-shadow;
    }
}

.project-image {
    position: relative;
    height: 160px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.project-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.progress-bar {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: $accent;
    border-radius: 3px;
    transition: width 0.5s ease;
}

.progress-text {
    color: $white;
    font-size: 0.8rem;
    font-weight: 600;
    min-width: 40px;
}

.project-content {
    padding: 20px;

    h4 {
        color: $text;
        margin-bottom: 10px;
        font-size: 1.1rem;
    }

    .project-description {
        color: $light-text;
        line-height: 1.5;
        margin-bottom: 15px;
        font-size: 0.9rem;
    }
}

.project-stats {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;

    .stat {
        display: flex;
        align-items: center;
        gap: 5px;
        color: $light-text;
        font-size: 0.8rem;

        i {
            font-size: 0.7rem;
        }
    }
}

.project-actions {
    display: flex;
    gap: 10px;

    .btn {
        flex: 1;
        justify-content: center;
        font-size: 0.85rem;
    }
}

.community-testimonials {
    padding: 30px;

    h3 {
        color: $text;
        margin-bottom: 25px;
        font-size: 1.4rem;
        text-align: center;
    }
}

.testimonials-slider {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.testimonial-item {
    .testimonial-content {
        background: $light-bg;
        padding: 25px;
        border-radius: 12px;
        position: relative;

        .quote-icon {
            position: absolute;
            top: 15px;
            left: 15px;
            color: $primary-light;
            font-size: 1.5rem;
            opacity: 0.7;
        }

        p {
            color: $text;
            line-height: 1.6;
            margin-bottom: 20px;
            font-style: italic;
            padding-left: 25px;
        }
    }
}

.testimonial-author {
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

    .author-info {
        h4 {
            margin-bottom: 3px;
            color: $text;
            font-size: 1rem;
        }

        .author-role {
            color: $light-text;
            font-size: 0.8rem;
            margin: 0;
        }
    }
}

.community-faq {
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

.faq-list {
    gap: 20px;
}

.faq-item {
    padding: 0;
    overflow: hidden;
}

.faq-question {
    padding: 25px 30px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: $transition;

    &:hover {
        background: $primary-light;
    }

    h4 {
        margin: 0;
        color: $text;
        font-size: 1.1rem;
    }

    i {
        color: $primary;
        transition: $transition;
    }
}

.faq-answer {
    padding: 0 30px 25px;

    p {
        color: $light-text;
        line-height: 1.6;
        margin: 0;
    }
}

@media (max-width: 768px) {
    .community-content {
        gap: 25px;
    }

    .welcome-content {
        padding: 25px;
    }

    .discussion-forum,
    .community-projects,
    .community-testimonials {
        padding: 20px;
    }

    .discussion-item {
        padding: 15px 0;
    }

    .project-actions {
        flex-direction: column;
    }

    .faq-question {
        padding: 20px;
    }

    .faq-answer {
        padding: 0 20px 20px;
    }
}

@media (max-width: 576px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .welcome-actions {
        flex-direction: column;

        .btn {
            width: 100%;
            justify-content: center;
        }
    }

    .discussion-meta {
        flex-direction: column;
        gap: 5px;
    }

    .discussion-stats {
        justify-content: center;
    }

    .faq-list {
        grid-template-columns: 1fr;
    }
}
</style>
