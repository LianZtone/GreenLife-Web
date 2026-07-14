<template>
    <section class="auth">
        <div class="container">
            <div class="auth-container">
                <!-- Left Side - Welcome Content -->
                <div class="auth-welcome fade-in">
                    <div class="welcome-content">
                        <div class="logo">
                            <i class="fas fa-leaf"></i>
                            <h1>GreenLife</h1>
                        </div>
                        <h2>Selamat Datang Kembali!</h2>
                        <p>Masuk ke akun Anda untuk melanjutkan perjalanan hidup sehat bersama komunitas GreenLife</p>

                        <div class="welcome-features">
                            <div class="feature-item">
                                <i class="fas fa-shopping-bag"></i>
                                <div>
                                    <h4>Belanja Produk Organik</h4>
                                    <p>Akses katalog produk organik terbaik</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-users"></i>
                                <div>
                                    <h4>Komunitas Sehat</h4>
                                    <p>Bergabung dengan komunitas pecinta gaya hidup sehat</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-gift"></i>
                                <div>
                                    <h4>Promo Eksklusif</h4>
                                    <p>Dapatkan penawaran khusus untuk member</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Auth Forms -->
                <div class="auth-forms">
                    <!-- Login Form -->
                    <div v-if="activeForm === 'login'" class="card auth-form login-form fade-in delay-1">
                        <div class="form-header">
                            <h2>Masuk ke Akun</h2>
                            <p>Silakan masuk dengan akun Anda</p>
                        </div>

                        <form @submit.prevent="handleLogin" class="auth-form-content">
                            <div class="form-group">
                                <label for="login-email">Email</label>
                                <input type="email" id="login-email" v-model="loginForm.email"
                                    placeholder="Masukkan alamat email" required>
                            </div>

                            <div class="form-group">
                                <label for="login-password">Password</label>
                                <div class="password-input">
                                    <input :type="showLoginPassword ? 'text' : 'password'" id="login-password"
                                        v-model="loginForm.password" placeholder="Masukkan password" required>
                                    <button type="button" class="password-toggle"
                                        @click="showLoginPassword = !showLoginPassword">
                                        <i :class="showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-options">
                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="loginForm.remember">
                                    <span class="checkmark"></span>
                                    Ingat saya
                                </label>
                                <button type="button" class="forgot-password text-link" @click="showForgotPassword">
                                    Lupa password?
                                </button>
                            </div>

                            <button type="submit" class="btn btn-accent auth-submit" :disabled="loading">
                                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                                <i class="fas fa-sign-in-alt" v-else></i>
                                {{ loading ? 'Memproses...' : 'Masuk' }}
                            </button>

                            <div class="auth-divider">
                                <span>atau masuk dengan</span>
                            </div>

                            <div class="social-auth">
                                <button type="button" class="btn btn-social google" @click="socialLogin('google')">
                                    <i class="fab fa-google"></i>
                                    Google
                                </button>
                                <button type="button" class="btn btn-social facebook" @click="socialLogin('facebook')">
                                    <i class="fab fa-facebook-f"></i>
                                    Facebook
                                </button>
                            </div>

                            <div class="auth-switch">
                                <p>Belum punya akun?
                                    <button type="button" class="text-link" @click="activeForm = 'register'">Daftar di sini</button>
                                </p>
                            </div>
                        </form>
                    </div>

                    <!-- Register Form -->
                    <div v-else class="card auth-form register-form fade-in delay-1">
                        <div class="form-header">
                            <h2>Daftar Akun Baru</h2>
                            <p>Bergabunglah dengan komunitas GreenLife</p>
                        </div>

                        <form @submit.prevent="handleRegister" class="auth-form-content">
                            <div class="form-grid grid grid-2">
                                <div class="form-group">
                                    <label for="register-firstname">Nama Depan</label>
                                    <input type="text" id="register-firstname" v-model="registerForm.firstName"
                                        placeholder="Nama depan" required>
                                </div>
                                <div class="form-group">
                                    <label for="register-lastname">Nama Belakang</label>
                                    <input type="text" id="register-lastname" v-model="registerForm.lastName"
                                        placeholder="Nama belakang" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="register-email">Email</label>
                                <input type="email" id="register-email" v-model="registerForm.email"
                                    placeholder="Masukkan alamat email" required>
                            </div>

                            <div class="form-group">
                                <label for="register-phone">Nomor Telepon</label>
                                <input type="tel" id="register-phone" v-model="registerForm.phone"
                                    placeholder="Contoh: 081234567890" required>
                            </div>

                            <div class="form-grid grid grid-2">
                                <div class="form-group">
                                    <label for="register-password">Password</label>
                                    <div class="password-input">
                                        <input :type="showRegisterPassword ? 'text' : 'password'" id="register-password"
                                            v-model="registerForm.password" placeholder="Buat password" required>
                                        <button type="button" class="password-toggle"
                                            @click="showRegisterPassword = !showRegisterPassword">
                                            <i :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="register-confirm-password">Konfirmasi Password</label>
                                    <div class="password-input">
                                        <input :type="showConfirmPassword ? 'text' : 'password'"
                                            id="register-confirm-password" v-model="registerForm.confirmPassword"
                                            placeholder="Ulangi password" required>
                                        <button type="button" class="password-toggle"
                                            @click="showConfirmPassword = !showConfirmPassword">
                                            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="registerForm.agreeTerms" required>
                                    <span class="checkmark"></span>
                                    Saya setuju dengan
                                    <button type="button" class="text-link inline-link" @click="showTerms">Syarat & Ketentuan</button>
                                    dan
                                    <button type="button" class="text-link inline-link" @click="showPrivacy">Kebijakan Privasi</button>
                                </label>
                            </div>

                            <div class="form-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="registerForm.newsletter">
                                    <span class="checkmark"></span>
                                    Saya ingin menerima newsletter dan promo dari GreenLife
                                </label>
                            </div>

                            <button type="submit" class="btn btn-accent auth-submit" :disabled="loading">
                                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                                <i class="fas fa-user-plus" v-else></i>
                                {{ loading ? 'Mendaftarkan...' : 'Daftar Sekarang' }}
                            </button>

                            <div class="auth-divider">
                                <span>atau daftar dengan</span>
                            </div>

                            <div class="social-auth">
                                <button type="button" class="btn btn-social google" @click="socialRegister('google')">
                                    <i class="fab fa-google"></i>
                                    Google
                                </button>
                                <button type="button" class="btn btn-social facebook"
                                    @click="socialRegister('facebook')">
                                    <i class="fab fa-facebook-f"></i>
                                    Facebook
                                </button>
                            </div>

                            <div class="auth-switch">
                                <p>Sudah punya akun?
                                    <button type="button" class="text-link" @click="activeForm = 'login'">Masuk di sini</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import { saveAuthUser } from '@/utils/auth'

const router = useRouter()
const route = useRoute()

const activeForm = ref('login')
const loading = ref(false)
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)
const showConfirmPassword = ref(false)

// Gunakan reactive untuk form data
const loginForm = reactive({
    email: '',
    password: '',
    remember: false
})

const registerForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: true
})

// Perbaikan handleLogin
async function handleLogin() {
    if (!loginForm.email || !loginForm.password) {
        Swal.fire({
            title: 'Error!',
            text: 'Harap isi semua field yang diperlukan',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
        return
    }

    loading.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Validasi email sederhana
        if (!isValidEmail(loginForm.email)) {
            throw new Error('Format email tidak valid')
        }

        const userData = {
            id: 1,
            firstName: 'Diana',
            lastName: 'Sari',
            email: loginForm.email,
            phone: '+6281234567890',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            joinDate: '2023-01-15'
        }

        saveAuthUser(userData)

        await Swal.fire({
            title: 'Login Berhasil!',
            text: 'Selamat datang kembali di GreenLife!',
            icon: 'success',
            confirmButtonColor: '#4CAF50',
            timer: 1500
        })

        router.replace(getPostLoginRedirect())
    } catch (error) {
        Swal.fire({
            title: 'Login Gagal!',
            text: error.message || 'Email atau password salah. Silakan coba lagi.',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    } finally {
        loading.value = false
    }
}

// Tambah validasi email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}



async function handleRegister() {
    const f = registerForm
    if (!f.firstName || !f.lastName || !f.email || !f.phone || !f.password || !f.confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Harap isi semua field yang diperlukan',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
        return
    }

    if (f.password !== f.confirmPassword) {
        Swal.fire({
            title: 'Error!',
            text: 'Password dan konfirmasi password tidak cocok',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
        return
    }

    if (!f.agreeTerms) {
        Swal.fire({
            title: 'Error!',
            text: 'Anda harus menyetujui Syarat & Ketentuan',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
        return
    }

    loading.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        const userData = {
            id: Date.now(),
            firstName: f.firstName,
            lastName: f.lastName,
            email: f.email,
            phone: f.phone,
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            joinDate: new Date().toISOString().split('T')[0]
        }

        saveAuthUser(userData)

        Swal.fire({
            title: 'Pendaftaran Berhasil!',
            text: 'Selamat bergabung dengan komunitas GreenLife!',
            icon: 'success',
            confirmButtonColor: '#4CAF50'
        }).then(() => {
            router.replace(getPostLoginRedirect())
        })
    } catch {
        Swal.fire({
            title: 'Pendaftaran Gagal!',
            text: 'Terjadi kesalahan. Silakan coba lagi.',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    } finally {
        loading.value = false
    }
}

function socialLogin(provider) {
    Swal.fire({
        title: `Login dengan ${provider}`,
        text: `Fitur login dengan ${provider} akan segera tersedia`,
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function socialRegister(provider) {
    Swal.fire({
        title: `Daftar dengan ${provider}`,
        text: `Fitur pendaftaran dengan ${provider} akan segera tersedia`,
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function showForgotPassword() {
    Swal.fire({
        title: 'Lupa Password?',
        html: `
      <div style="text-align: left;">
        <p>Masukkan email Anda untuk mereset password:</p>
        <input type="email" id="forgot-email" class="swal2-input" placeholder="Email Anda">
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: 'Kirim Link Reset',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50',
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('#forgot-email').value
            if (!email) Swal.showValidationMessage('Harap masukkan email')
            return { email }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Link Terkirim!',
                text: 'Kami telah mengirim link reset password ke email Anda',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function showTerms() {
    Swal.fire({
        title: 'Syarat & Ketentuan',
        html: `
      <div style="text-align: left; max-height: 400px; overflow-y: auto;">
        <h4>1. Ketentuan Umum</h4>
        <p>Dengan mendaftar dan menggunakan layanan GreenLife, Anda setuju untuk mematuhi semua syarat dan ketentuan yang berlaku.</p>
        <h4>2. Akun Pengguna</h4>
        <p>Anda bertanggung jawab penuh atas kerahasiaan informasi akun dan password Anda.</p>
        <h4>3. Penggunaan Layanan</h4>
        <p>Layanan GreenLife hanya boleh digunakan untuk tujuan yang sah dan sesuai dengan peraturan yang berlaku.</p>
        <h4>4. Pembatalan Akun</h4>
        <p>Kami berhak membatalkan akun yang melanggar syarat dan ketentuan tanpa pemberitahuan sebelumnya.</p>
      </div>
    `,
        confirmButtonText: 'Mengerti',
        confirmButtonColor: '#4CAF50',
        width: 600
    })
}

function showPrivacy() {
    Swal.fire({
        title: 'Kebijakan Privasi',
        html: `
      <div style="text-align: left; max-height: 400px; overflow-y: auto;">
        <h4>1. Pengumpulan Data</h4>
        <p>Kami mengumpulkan informasi yang diperlukan untuk memberikan layanan terbaik kepada Anda.</p>
        <h4>2. Penggunaan Data</h4>
        <p>Data Anda digunakan untuk keperluan layanan, personalisasi, dan komunikasi marketing.</p>
        <h4>3. Perlindungan Data</h4>
        <p>Kami melindungi data pribadi Anda dengan sistem keamanan yang terenkripsi.</p>
        <h4>4. Hak Pengguna</h4>
        <p>Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda.</p>
      </div>
    `,
        confirmButtonText: 'Mengerti',
        confirmButtonColor: '#4CAF50',
        width: 600
    })
}

function getPostLoginRedirect() {
    const redirectTarget = route.query.redirect

    if (typeof redirectTarget === 'string' && redirectTarget.startsWith('/')) {
        return redirectTarget
    }

    return '/'
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.auth {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 40px 0;
    background: linear-gradient(135deg, $primary-light 0%, $light-bg 100%);
}

.auth-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    max-width: 1200px;
    margin: 0 auto;
    background: $white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: $card-hover-shadow;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
}

.auth-welcome {
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    color: $white;
    padding: 60px 40px;
    display: flex;
    align-items: center;

    @media (max-width: 992px) {
        padding: 40px 20px;
    }
}

.welcome-content {
    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;

        i {
            font-size: 2rem;
        }

        h1 {
            color: $white;
            margin: 0;
            font-size: 1.8rem;
        }
    }

    h2 {
        color: $white;
        margin-bottom: 15px;
        font-size: 2.2rem;
    }

    p {
        opacity: 0.9;
        margin-bottom: 40px;
        font-size: 1.1rem;
        line-height: 1.6;
    }
}

.welcome-features {
    .feature-item {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 25px;

        i {
            font-size: 1.5rem;
            margin-top: 5px;
            opacity: 0.9;
        }

        h4 {
            color: $white;
            margin-bottom: 5px;
            font-size: 1.1rem;
        }

        p {
            margin: 0;
            opacity: 0.8;
            font-size: 0.9rem;
        }
    }
}

.auth-forms {
    padding: 60px 40px;
    display: flex;
    align-items: center;

    @media (max-width: 992px) {
        padding: 40px 20px;
    }
}

.auth-form {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
    padding: 40px 30px;

    @media (max-width: 576px) {
        padding: 30px 20px;
    }
}

.form-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
        color: $text;
        margin-bottom: 10px;
        font-size: 1.8rem;
    }

    p {
        color: $light-text;
        margin: 0;
    }
}

.auth-form-content {
    .form-group {
        margin-bottom: 20px;

        label {
            display: block;
            margin-bottom: 8px;
            color: $text;
            font-weight: 500;
            font-size: 0.9rem;
        }

        input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid $light-bg;
            border-radius: 8px;
            font-size: 1rem;
            transition: $transition;

            &:focus {
                outline: none;
                border-color: $primary;
                box-shadow: 0 0 0 3px rgba($primary, 0.1);
            }

            &::placeholder {
                color: $light-text;
            }
        }
    }
}

.password-input {
    position: relative;

    input {
        padding-right: 45px !important;
    }

    .password-toggle {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: $light-text;
        cursor: pointer;
        padding: 5px;

        &:hover {
            color: $primary;
        }
    }
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    flex-wrap: wrap;
    gap: 10px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    color: $text;

    input {
        display: none;

        &:checked+.checkmark {
            background: $primary;
            border-color: $primary;

            &:after {
                display: block;
            }
        }
    }

    .checkmark {
        width: 18px;
        height: 18px;
        border: 2px solid $light-text;
        border-radius: 4px;
        position: relative;
        transition: $transition;

        &:after {
            content: '';
            position: absolute;
            left: 4px;
            top: 1px;
            width: 5px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
            display: none;
        }
    }

    .text-link {
        color: $primary;
        text-decoration: none;
        background: transparent;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
}

.forgot-password {
    color: $primary;
    text-decoration: none;
    font-size: 0.9rem;
    background: transparent;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
}

.auth-submit {
    width: 100%;
    justify-content: center;
    font-size: 1.1rem;
    padding: 15px;
    margin-bottom: 20px;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
}

.auth-divider {
    text-align: center;
    margin: 25px 0;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: $light-bg;
    }

    span {
        background: $white;
        padding: 0 15px;
        color: $light-text;
        font-size: 0.9rem;
    }
}

.social-auth {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    @media (max-width: 576px) {
        flex-direction: column;
    }
}

.btn-social {
    flex: 1;
    justify-content: center;
    border: 2px solid $light-bg;
    background: transparent;
    color: $text;
    box-shadow: none;

    &:hover {
        transform: translateY(-2px);
        box-shadow: $card-shadow;
    }

    &.google {
        &:hover {
            border-color: #DB4437;
            color: #DB4437;
        }
    }

    &.facebook {
        &:hover {
            border-color: #4267B2;
            color: #4267B2;
        }
    }
}

.auth-switch {
    text-align: center;

    p {
        color: $light-text;
        margin: 0;
        font-size: 0.95rem;
    }

    .text-link {
        color: $primary;
        text-decoration: none;
        font-weight: 500;
        background: transparent;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
}

// Animation for form switch
.login-form,
.register-form {
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .form-grid.grid-2 {
        grid-template-columns: 1fr;
    }

    .form-options {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
}

@media (max-width: 576px) {
    .auth-container {
        border-radius: 12px;
    }

    .auth-welcome {
        padding: 30px 20px;
    }

    .welcome-content {
        h2 {
            font-size: 1.8rem;
        }

        p {
            font-size: 1rem;
        }
    }

    .feature-item {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
}
</style>
