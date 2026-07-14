<template>
    <section class="contact">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Hubungi Kami</h2>
                <p>Kami siap membantu dan menjawab pertanyaan Anda tentang produk dan layanan kami</p>
            </div>

            <div class="contact-content grid grid-2">
                <div class="contact-info fade-in delay-1">
                    <div class="card contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="contact-details">
                            <h4>Alamat</h4>
                            <p>Jl. Green Life No. 123<br>Limbu, Makale 90811<br>Sulawesi Selatan</p>
                        </div>
                    </div>

                    <div class="card contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-phone"></i>
                        </div>
                        <div class="contact-details">
                            <h4>Telepon</h4>
                            <p>+62 21 1234 5678<br>+62 21 8765 4321</p>
                        </div>
                    </div>

                    <div class="card contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-envelope"></i>
                        </div>
                        <div class="contact-details">
                            <h4>Email</h4>
                            <p>info@greenlife.com<br>support@greenlife.com</p>
                        </div>
                    </div>

                    <div class="card contact-item">
                        <div class="contact-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="contact-details">
                            <h4>Jam Operasional</h4>
                            <p>Senin - Jumat: 08:00 - 17:00<br>Sabtu: 08:00 - 15:00<br>Minggu: Tutup</p>
                        </div>
                    </div>

                    <div class="card social-section">
                        <h4>Ikuti Kami</h4>
                        <div class="social-links">
                            <button type="button" class="social-link" @click="showSocialInfo('Facebook')">
                                <i class="fab fa-facebook-f"></i>
                            </button>
                            <button type="button" class="social-link" @click="showSocialInfo('Instagram')">
                                <i class="fab fa-instagram"></i>
                            </button>
                            <button type="button" class="social-link" @click="showSocialInfo('Twitter')">
                                <i class="fab fa-twitter"></i>
                            </button>
                            <button type="button" class="social-link" @click="showSocialInfo('YouTube')">
                                <i class="fab fa-youtube"></i>
                            </button>
                            <button type="button" class="social-link" @click="showSocialInfo('WhatsApp')">
                                <i class="fab fa-whatsapp"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="contact-form fade-in delay-2">
                    <form @submit.prevent="submitForm" class="card form">
                        <div class="form-group">
                            <label for="name">Nama Lengkap *</label>
                            <input type="text" id="name" v-model="form.name" required placeholder="Masukkan nama lengkap Anda">
                        </div>

                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" v-model="form.email" required placeholder="Masukkan alamat email Anda">
                        </div>

                        <div class="form-group">
                            <label for="phone">Nomor Telepon</label>
                            <input type="tel" id="phone" v-model="form.phone" placeholder="Masukkan nomor telepon Anda">
                        </div>

                        <div class="form-group">
                            <label for="subject">Subjek *</label>
                            <select id="subject" v-model="form.subject" required>
                                <option value="">Pilih subjek</option>
                                <option value="product">Pertanyaan Produk</option>
                                <option value="order">Status Pesanan</option>
                                <option value="complaint">Keluhan</option>
                                <option value="partnership">Kemitraan</option>
                                <option value="other">Lainnya</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="message">Pesan *</label>
                            <textarea id="message" v-model="form.message" rows="5" required placeholder="Tulis pesan Anda di sini..."></textarea>
                        </div>

                        <button type="submit" class="btn btn-submit" :disabled="loading">
                            <span v-if="loading">
                                <i class="fas fa-spinner fa-spin"></i> Mengirim...
                            </span>
                            <span v-else>
                                <i class="fas fa-paper-plane"></i> Kirim Pesan
                            </span>
                        </button>
                    </form>
                </div>
            </div>

            <!-- Rest of the contact component remains the same -->
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'


const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const faqs = reactive([
  {
    question: 'Bagaimana cara memesan produk GreenLife?',
    answer: 'Anda dapat memesan produk melalui website kami dengan menambahkan produk ke keranjang dan mengikuti proses checkout. Atau Anda bisa menghubungi customer service kami untuk bantuan pemesanan.',
    open: false
  },
  {
    question: 'Apakah semua produk GreenLife benar-benar organik?',
    answer: 'Ya, semua produk kami bersertifikat organik dan diproduksi dengan standar organik yang ketat. Kami bekerja sama dengan petani lokal yang menerapkan praktik pertanian organik.',
    open: false
  },
  {
    question: 'Berapa lama waktu pengiriman?',
    answer: 'Waktu pengiriman bervariasi tergantung lokasi. Untuk area Jakarta 1-2 hari, kota besar lainnya 2-3 hari, dan luar Jawa 3-7 hari kerja. Pengiriman express tersedia untuk kebutuhan mendesak.',
    open: false
  },
  {
    question: 'Apakah tersedia pengiriman same-day?',
    answer: 'Ya, untuk area Jakarta dan sekitarnya kami menyediakan layanan same-day delivery dengan ketentuan tertentu. Silakan hubungi customer service untuk informasi lebih lanjut.',
    open: false
  },
  {
    question: 'Bagaimana cara bergabung dengan komunitas GreenLife?',
    answer: 'Anda dapat bergabung dengan komunitas kami melalui halaman komunitas di website atau mengikuti media sosial GreenLife. Kami rutin mengadakan event dan sharing session tentang gaya hidup sehat.',
    open: false
  }
])

async function submitForm() {
  if (!form.name || !form.email || !form.subject || !form.message) {
    Swal.fire({
      title: 'Oops!',
      text: 'Harap isi semua kolom wajib bertanda *',
      icon: 'warning',
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Mengerti'
    })
    return
  }

  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    Swal.fire({
      title: 'Pesan Terkirim!',
      text: 'Terima kasih! Kami akan membalas dalam 1x24 jam.',
      icon: 'success',
      confirmButtonColor: '#4CAF50',
      confirmButtonText: 'Oke 👍'
    })

    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    Swal.fire({
      title: 'Gagal Mengirim!',
      text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
      icon: 'error',
      confirmButtonColor: '#f44336',
      confirmButtonText: 'Tutup'
    })
  } finally {
    loading.value = false
  }
}

function toggleFaq(index) {
  faqs[index].open = !faqs[index].open
}

function openMap() {
  window.open('https://maps.google.com', '_blank')
}

function showSocialInfo(platform) {
  Swal.fire({
    title: `${platform} belum tersedia`,
    text: 'Tautan media sosial ini masih berupa placeholder.',
    icon: 'info',
    confirmButtonColor: '#4CAF50'
  })
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.contact {
    padding: 80px 0;
}

.contact-content {
    margin-bottom: 80px;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
    padding: 25px;
}

.contact-icon {
    width: 50px;
    height: 50px;
    background: $primary-light;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.contact-details {
    h4 {
        color: $text;
        margin-bottom: 8px;
        font-size: 1.1rem;
    }

    p {
        color: $light-text;
        line-height: 1.6;
    }
}

.social-section {
    padding: 30px;
    text-align: center;

    h4 {
        color: $text;
        margin-bottom: 20px;
    }
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.social-link {
    width: 45px;
    height: 45px;
    background: $primary-light;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary;
    text-decoration: none;
    border: none;
    transition: $transition;
    cursor: pointer;

    &:hover {
        background: $primary;
        color: $white;
        transform: translateY(-3px);
    }
}

.contact-form {
    .form {
        padding: 40px;
    }
}

.btn-submit {
    width: 100%;
    justify-content: center;
    font-size: 1.1rem;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
}

// Rest of the contact styles remain similar but optimized
</style>
