<template>
    <section class="settings">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Pengaturan Akun</h2>
                <p>Kelola preferensi dan pengaturan akun Anda</p>
            </div>

            <div class="settings-content">
                <!-- Sidebar Navigation -->
                <div class="settings-sidebar fade-in">
                    <nav class="settings-nav">
                        <button v-for="tab in tabs" :key="tab.id"
                            :class="['nav-item', { active: activeTab === tab.id }]" @click="activeTab = tab.id">
                            <i :class="tab.icon"></i>
                            <span>{{ tab.label }}</span>
                        </button>
                    </nav>
                </div>

                <!-- Main Content -->
                <div class="settings-main">
                    <!-- Account Settings -->
                    <div v-if="activeTab === 'account'" class="card tab-content fade-in delay-1">
                        <h3>Pengaturan Akun</h3>

                        <form @submit.prevent="updateAccount" class="settings-form">
                            <div class="form-grid grid grid-2">
                                <div class="form-group">
                                    <label for="firstName">Nama Depan</label>
                                    <input type="text" id="firstName" v-model="account.firstName"
                                        placeholder="Masukkan nama depan">
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Nama Belakang</label>
                                    <input type="text" id="lastName" v-model="account.lastName"
                                        placeholder="Masukkan nama belakang">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" v-model="account.email"
                                    placeholder="Masukkan alamat email">
                            </div>

                            <div class="form-group">
                                <label for="phone">Nomor Telepon</label>
                                <input type="tel" id="phone" v-model="account.phone"
                                    placeholder="Masukkan nomor telepon">
                            </div>

                            <div class="form-group">
                                <label for="birthdate">Tanggal Lahir</label>
                                <input type="date" id="birthdate" v-model="account.birthdate">
                            </div>

                            <div class="form-group">
                                <label for="gender">Jenis Kelamin</label>
                                <select id="gender" v-model="account.gender">
                                    <option value="">Pilih jenis kelamin</option>
                                    <option value="male">Laki-laki</option>
                                    <option value="female">Perempuan</option>
                                    <option value="other">Lainnya</option>
                                </select>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-outline" @click="resetAccountForm">
                                    Batal
                                </button>
                                <button type="submit" class="btn" :disabled="saving">
                                    <i class="fas fa-save" v-if="!saving"></i>
                                    <i class="fas fa-spinner fa-spin" v-else></i>
                                    {{ saving ? 'Menyimpan...' : 'Simpan Perubahan' }}
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Security Settings -->
                    <div v-else-if="activeTab === 'security'" class="card tab-content fade-in delay-1">
                        <h3>Keamanan Akun</h3>

                        <div class="security-sections">
                            <!-- Change Password -->
                            <div class="security-section">
                                <h4>Ubah Password</h4>
                                <form @submit.prevent="changePassword" class="password-form">
                                    <div class="form-group">
                                        <label for="currentPassword">Password Saat Ini</label>
                                        <div class="password-input">
                                            <input :type="showCurrentPassword ? 'text' : 'password'"
                                                id="currentPassword" v-model="password.current"
                                                placeholder="Masukkan password saat ini">
                                            <button type="button" class="password-toggle"
                                                @click="showCurrentPassword = !showCurrentPassword">
                                                <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="newPassword">Password Baru</label>
                                        <div class="password-input">
                                            <input :type="showNewPassword ? 'text' : 'password'" id="newPassword"
                                                v-model="password.new" placeholder="Masukkan password baru">
                                            <button type="button" class="password-toggle"
                                                @click="showNewPassword = !showNewPassword">
                                                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="confirmPassword">Konfirmasi Password Baru</label>
                                        <div class="password-input">
                                            <input :type="showConfirmPassword ? 'text' : 'password'"
                                                id="confirmPassword" v-model="password.confirm"
                                                placeholder="Konfirmasi password baru">
                                            <button type="button" class="password-toggle"
                                                @click="showConfirmPassword = !showConfirmPassword">
                                                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn" :disabled="changingPassword">
                                        <i class="fas fa-key" v-if="!changingPassword"></i>
                                        <i class="fas fa-spinner fa-spin" v-else></i>
                                        {{ changingPassword ? 'Mengubah...' : 'Ubah Password' }}
                                    </button>
                                </form>
                            </div>

                            <!-- Two-Factor Authentication -->
                            <div class="security-section">
                                <h4>Two-Factor Authentication</h4>
                                <div class="two-factor-settings">
                                    <div class="setting-item">
                                        <div class="setting-info">
                                            <h5>Autentikasi 2 Faktor</h5>
                                            <p>Tambah lapisan keamanan ekstra untuk akun Anda</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="security.twoFactor">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div v-if="security.twoFactor" class="two-factor-setup">
                                        <p class="setup-info">
                                            <i class="fas fa-info-circle"></i>
                                            Scan QR code dengan aplikasi authenticator Anda
                                        </p>
                                        <div class="qr-code-placeholder">
                                            <i class="fas fa-qrcode"></i>
                                            <p>QR Code akan muncul di sini</p>
                                        </div>
                                        <button class="btn btn-sm btn-outline">
                                            <i class="fas fa-sync"></i> Generate QR Code Baru
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Session Management -->
                            <div class="security-section">
                                <h4>Manajemen Sesi</h4>
                                <div class="sessions-list">
                                    <div class="session-item">
                                        <div class="session-info">
                                            <h5>Perangkat Saat Ini</h5>
                                            <p>Chrome di Windows • Jakarta, Indonesia</p>
                                            <span class="session-time">Aktif sekarang</span>
                                        </div>
                                        <button class="btn btn-sm btn-outline" disabled>
                                            Sesi Aktif
                                        </button>
                                    </div>

                                    <div class="session-item">
                                        <div class="session-info">
                                            <h5>iPhone 13</h5>
                                            <p>Safari di iOS • Bandung, Indonesia</p>
                                            <span class="session-time">2 jam yang lalu</span>
                                        </div>
                                        <button class="btn btn-sm" @click="logoutDevice">
                                            <i class="fas fa-sign-out-alt"></i> Keluar
                                        </button>
                                    </div>
                                </div>

                                <button class="btn btn-outline btn-sm logout-all-btn" @click="logoutAllDevices">
                                    <i class="fas fa-sign-out-alt"></i> Keluar dari Semua Perangkat
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Notifications Settings -->
                    <div v-else-if="activeTab === 'notifications'" class="card tab-content fade-in delay-1">
                        <h3>Pengaturan Notifikasi</h3>

                        <div class="notification-sections">
                            <!-- Email Notifications -->
                            <div class="notification-section">
                                <h4>Notifikasi Email</h4>
                                <div class="notification-items">
                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Promo dan Penawaran</h5>
                                            <p>Dapatkan informasi tentang promo dan diskon terbaru</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.email.promotions">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Produk Baru</h5>
                                            <p>Notifikasi ketika produk baru tersedia</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.email.newProducts">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Artikel dan Tips</h5>
                                            <p>Tips kesehatan dan artikel terbaru dari komunitas</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.email.articles">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Push Notifications -->
                            <div class="notification-section">
                                <h4>Notifikasi Browser</h4>
                                <div class="notification-items">
                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Status Pesanan</h5>
                                            <p>Update tentang status pesanan dan pengiriman</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.push.orderUpdates">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Pengingat Stok</h5>
                                            <p>Notifikasi ketika produk favorit kembali tersedia</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.push.stockReminders">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Aktivitas Komunitas</h5>
                                            <p>Update dari komunitas dan event terbaru</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.push.community">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- SMS Notifications -->
                            <div class="notification-section">
                                <h4>Notifikasi SMS</h4>
                                <div class="notification-items">
                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Konfirmasi Pesanan</h5>
                                            <p>SMS konfirmasi untuk setiap pesanan</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.sms.orderConfirmation">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="notification-item">
                                        <div class="notification-info">
                                            <h5>Update Pengiriman</h5>
                                            <p>Notifikasi SMS untuk status pengiriman</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="notifications.sms.shippingUpdates">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" @click="resetNotificationSettings">
                                Reset ke Default
                            </button>
                            <button type="button" class="btn" @click="saveNotificationSettings">
                                <i class="fas fa-save"></i> Simpan Pengaturan
                            </button>
                        </div>
                    </div>

                    <!-- Privacy Settings -->
                    <div v-else-if="activeTab === 'privacy'" class="card tab-content fade-in delay-1">
                        <h3>Privasi dan Data</h3>

                        <div class="privacy-sections">
                            <!-- Data Privacy -->
                            <div class="privacy-section">
                                <h4>Privasi Data</h4>
                                <div class="privacy-items">
                                    <div class="privacy-item">
                                        <div class="privacy-info">
                                            <h5>Profil Publik</h5>
                                            <p>Izinkan anggota komunitas lain melihat profil Anda</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="privacy.publicProfile">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="privacy-item">
                                        <div class="privacy-info">
                                            <h5>Riwayat Aktivitas</h5>
                                            <p>Simpan riwayat pencarian dan aktivitas browsing</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="privacy.activityHistory">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div class="privacy-item">
                                        <div class="privacy-info">
                                            <h5>Personalized Ads</h5>
                                            <p>Tampilkan iklan yang sesuai dengan minat Anda</p>
                                        </div>
                                        <label class="switch">
                                            <input type="checkbox" v-model="privacy.personalizedAds">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <!-- Data Management -->
                            <div class="privacy-section">
                                <h4>Manajemen Data</h4>
                                <div class="data-actions">
                                    <button class="btn btn-outline" @click="exportData">
                                        <i class="fas fa-download"></i> Ekspor Data Saya
                                    </button>
                                    <button class="btn btn-outline" @click="clearHistory">
                                        <i class="fas fa-trash"></i> Hapus Riwayat
                                    </button>
                                </div>
                            </div>

                            <!-- Account Deletion -->
                            <div class="privacy-section danger-zone">
                                <h4>Zona Berbahaya</h4>
                                <div class="danger-actions">
                                    <button class="btn delete-account-btn" @click="deleteAccount">
                                        <i class="fas fa-trash"></i> Hapus Akun Permanen
                                    </button>
                                </div>
                                <p class="danger-warning">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    Tindakan ini tidak dapat dibatalkan. Semua data akan dihapus permanen.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()


const activeTab = ref('account')
const saving = ref(false)
const changingPassword = ref(false)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const tabs = [
    { id: 'account', label: 'Akun', icon: 'fas fa-user-cog' },
    { id: 'security', label: 'Keamanan', icon: 'fas fa-shield-alt' },
    { id: 'notifications', label: 'Notifikasi', icon: 'fas fa-bell' },
    { id: 'privacy', label: 'Privasi', icon: 'fas fa-lock' }
]

const account = reactive({
    firstName: 'Diana',
    lastName: 'Sari',
    email: 'diana.sari@email.com',
    phone: '+6281234567890',
    birthdate: '1990-05-15',
    gender: 'female'
})

const password = reactive({
    current: '',
    new: '',
    confirm: ''
})

const security = reactive({
    twoFactor: false
})

const notifications = reactive({
    email: {
        promotions: true,
        newProducts: true,
        articles: true
    },
    push: {
        orderUpdates: true,
        stockReminders: false,
        community: true
    },
    sms: {
        orderConfirmation: true,
        shippingUpdates: false
    }
})

const privacy = reactive({
    publicProfile: false,
    activityHistory: true,
    personalizedAds: false
})

const originalAccount = ref({ ...account })

// === Methods ===

async function updateAccount() {
    saving.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        Object.assign(originalAccount.value, account)
        Swal.fire({
            title: 'Berhasil!',
            text: 'Profil Anda telah diperbarui',
            icon: 'success',
            confirmButtonColor: '#4CAF50',
            timer: 1500
        })
    } catch (error) {
        Swal.fire({
            title: 'Gagal!',
            text: 'Terjadi kesalahan saat menyimpan perubahan',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    } finally {
        saving.value = false
    }
}

function resetAccountForm() {
    Object.assign(account, originalAccount.value)
}

async function changePassword() {
    if (!password.current || !password.new || !password.confirm) {
        return Swal.fire({
            title: 'Error!',
            text: 'Harap isi semua field password',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    }

    if (password.new !== password.confirm) {
        return Swal.fire({
            title: 'Error!',
            text: 'Password baru dan konfirmasi tidak cocok',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    }

    if (password.new.length < 6) {
        return Swal.fire({
            title: 'Error!',
            text: 'Password baru minimal 6 karakter',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    }

    changingPassword.value = true

    try {
        await new Promise(resolve => setTimeout(resolve, 2000))
        password.current = ''
        password.new = ''
        password.confirm = ''

        Swal.fire({
            title: 'Password Diubah!',
            text: 'Password Anda berhasil diubah',
            icon: 'success',
            confirmButtonColor: '#4CAF50'
        })
    } catch {
        Swal.fire({
            title: 'Gagal!',
            text: 'Password saat ini tidak sesuai',
            icon: 'error',
            confirmButtonColor: '#f44336'
        })
    } finally {
        changingPassword.value = false
    }
}

function logoutDevice() {
    Swal.fire({
        title: 'Keluar dari Perangkat?',
        text: 'Anda akan keluar dari perangkat iPhone 13',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50'
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Anda telah keluar dari perangkat tersebut',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function logoutAllDevices() {
    Swal.fire({
        title: 'Keluar dari Semua Perangkat?',
        text: 'Anda akan keluar dari semua perangkat kecuali yang saat ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Keluar Semua',
        cancelButtonText: 'Batal'
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Anda telah keluar dari semua perangkat lain',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function saveNotificationSettings() {
    Swal.fire({
        title: 'Pengaturan Disimpan!',
        text: 'Preferensi notifikasi Anda telah diperbarui',
        icon: 'success',
        confirmButtonColor: '#4CAF50',
        timer: 1500
    })
}

function resetNotificationSettings() {
    Swal.fire({
        title: 'Reset Pengaturan?',
        text: 'Semua pengaturan notifikasi akan dikembalikan ke default',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Reset',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#4CAF50'
    }).then(result => {
        if (result.isConfirmed) {
            notifications.email = { promotions: true, newProducts: true, articles: true }
            notifications.push = { orderUpdates: true, stockReminders: false, community: true }
            notifications.sms = { orderConfirmation: true, shippingUpdates: false }

            Swal.fire({
                title: 'Berhasil!',
                text: 'Pengaturan notifikasi telah direset',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function exportData() {
    Swal.fire({
        title: 'Ekspor Data',
        text: 'Data Anda akan diekspor dan dikirim ke email dalam 24 jam',
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function clearHistory() {
    Swal.fire({
        title: 'Hapus Riwayat?',
        text: 'Semua riwayat pencarian dan aktivitas akan dihapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal'
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Berhasil!',
                text: 'Riwayat telah berhasil dihapus',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            })
        }
    })
}

function deleteAccount() {
    Swal.fire({
        title: 'Hapus Akun Permanen?',
        text: 'Tindakan ini tidak dapat dibatalkan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus Akun',
        cancelButtonText: 'Batal',
        input: 'text',
        inputPlaceholder: 'Ketik "HAPUS" untuk konfirmasi',
        inputValidator: value => {
            if (value !== 'HAPUS') return 'Harap ketik HAPUS untuk konfirmasi'
        }
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Akun Dihapus!',
                text: 'Akun Anda telah berhasil dihapus',
                icon: 'success',
                confirmButtonColor: '#4CAF50'
            }).then(() => {
                router.push('/')
            })
        }
    })
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.settings {
    margin-top: -100px;
    padding: 80px 0;
    background: linear-gradient(to bottom, $white, $light-bg);
    min-height: 100vh;
}

.settings-content {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
    align-items: start;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
}

.settings-sidebar {
    position: sticky;
    top: 100px;

    @media (max-width: 992px) {
        position: static;
    }
}

.settings-nav {
    .nav-item {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 20px;
        background: transparent;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: $transition;
        margin-bottom: 8px;
        text-align: left;
        color: $text;

        &:hover {
            background: $primary-light;
            color: $primary;
        }

        &.active {
            background: $primary;
            color: $white;
        }

        i {
            width: 20px;
            text-align: center;
            font-size: 1.1rem;
        }

        span {
            font-weight: 500;
        }
    }
}

.tab-content {
    padding: 30px;

    h3 {
        color: $text;
        margin-bottom: 25px;
        font-size: 1.5rem;
        border-bottom: 2px solid $light-bg;
        padding-bottom: 10px;
    }
}

.settings-form {
    .form-grid {
        gap: 20px;
        margin-bottom: 20px;
    }

    .form-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 30px;

        @media (max-width: 576px) {
            flex-direction: column;
        }
    }
}

.security-sections,
.notification-sections,
.privacy-sections {

    .security-section,
    .notification-section,
    .privacy-section {
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 1px solid $light-bg;

        &:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }

        h4 {
            color: $text;
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
    }
}

.password-form {
    max-width: 400px;
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

.setting-item,
.notification-item,
.privacy-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: $light-bg;
    border-radius: 12px;
    margin-bottom: 15px;

    &:last-child {
        margin-bottom: 0;
    }
}

.setting-info,
.notification-info,
.privacy-info {
    flex: 1;

    h5 {
        margin-bottom: 5px;
        color: $text;
        font-size: 1rem;
    }

    p {
        margin: 0;
        color: $light-text;
        font-size: 0.9rem;
        line-height: 1.4;
    }
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked+.slider {
            background-color: $primary;
        }

        &:checked+.slider:before {
            transform: translateX(26px);
        }
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: $transition;
        border-radius: 24px;

        &:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: $transition;
            border-radius: 50%;
        }
    }
}

.two-factor-setup {
    margin-top: 20px;
    padding: 20px;
    background: $white;
    border-radius: 12px;
    border: 2px dashed $light-bg;

    .setup-info {
        display: flex;
        align-items: center;
        gap: 10px;
        color: $light-text;
        margin-bottom: 15px;
        font-size: 0.9rem;

        i {
            color: $primary;
        }
    }
}

.qr-code-placeholder {
    text-align: center;
    padding: 40px 20px;
    background: $light-bg;
    border-radius: 8px;
    margin-bottom: 15px;

    i {
        font-size: 3rem;
        color: $light-text;
        margin-bottom: 10px;
        display: block;
    }

    p {
        color: $light-text;
        margin: 0;
    }
}

.sessions-list {
    .session-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background: $light-bg;
        border-radius: 8px;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.session-info {
    h5 {
        margin-bottom: 5px;
        color: $text;
        font-size: 0.95rem;
    }

    p {
        margin: 0;
        color: $light-text;
        font-size: 0.85rem;
    }

    .session-time {
        font-size: 0.8rem;
        color: $primary;
    }
}

.logout-all-btn {
    margin-top: 15px;
    width: 100%;
    justify-content: center;
}

.data-actions {
    display: flex;
    gap: 15px;

    @media (max-width: 576px) {
        flex-direction: column;
    }
}

.danger-zone {
    background: #ffebee !important;
    border: 1px solid #f44336;
    padding: 25px !important;

    h4 {
        color: #f44336 !important;
    }
}

.danger-actions {
    margin-bottom: 15px;
}

.delete-account-btn {
    background: #f44336;

    &:hover {
        background: #d32f2f;
    }
}

.danger-warning {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #f44336;
    font-size: 0.9rem;
    margin: 0;

    i {
        font-size: 1.1rem;
    }
}

@media (max-width: 768px) {
    .tab-content {
        padding: 20px;
    }

    .setting-item,
    .notification-item,
    .privacy-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .sessions-list .session-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
}

@media (max-width: 576px) {
    .settings-nav .nav-item {
        padding: 12px 15px;
        font-size: 0.9rem;
    }

    .form-actions {
        .btn {
            width: 100%;
            justify-content: center;
        }
    }
}
</style>
