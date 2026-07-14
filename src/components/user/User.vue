<template>
    <section class="user-profile">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Profil Saya</h2>
                <p>Kelola informasi profil dan preferensi akun Anda</p>
            </div>

            <div class="profile-content">
                <!-- Sidebar Navigation -->
                <div class="profile-sidebar fade-in">
                    <div class="card user-summary">
                        <div class="user-avatar">
                            <img :src="user.avatar" :alt="user.name">
                            <button class="edit-avatar-btn" @click="editAvatar">
                                <i class="fas fa-camera"></i>
                            </button>
                        </div>
                        <h3>{{ user.name }}</h3>
                        <p class="user-email">{{ user.email }}</p>
                        <p class="user-member">Member sejak {{ formatDate(user.joinDate) }}</p>
                    </div>

                    <nav class="profile-nav">
                        <button v-for="tab in tabs" :key="tab.id"
                            :class="['nav-item', { active: activeTab === tab.id }]" @click="activeTab = tab.id">
                            <i :class="tab.icon"></i>
                            <span>{{ tab.label }}</span>
                            <i class="fas fa-chevron-right arrow"></i>
                        </button>
                    </nav>
                </div>

                <!-- Main Content -->
                <div class="profile-main fade-in delay-1">
                    <!-- Profile Tab -->
                    <div v-if="activeTab === 'profile'" class="card tab-content">
                        <h3>Informasi Profil</h3>
                        <form @submit.prevent="updateProfile" class="profile-form">
                            <div class="form-grid grid grid-2">
                                <div class="form-group">
                                    <label for="name">Nama Lengkap *</label>
                                    <input type="text" id="name" v-model="user.name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email *</label>
                                    <input type="email" id="email" v-model="user.email" required>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Nomor Telepon</label>
                                    <input type="tel" id="phone" v-model="user.phone">
                                </div>
                                <div class="form-group">
                                    <label for="birthdate">Tanggal Lahir</label>
                                    <input type="date" id="birthdate" v-model="user.birthdate">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="address">Alamat</label>
                                <textarea id="address" v-model="user.address" rows="3"></textarea>
                            </div>

                            <div class="form-actions">
                                <button type="button" class="btn btn-outline" @click="resetForm">
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

                    <!-- Orders Tab -->
                    <div v-else-if="activeTab === 'orders'" class="card tab-content">
                        <h3>Riwayat Pesanan</h3>
                        <div class="orders-list">
                            <div v-if="orders.length === 0" class="empty-orders">
                                <i class="fas fa-shopping-bag"></i>
                                <p>Belum ada pesanan</p>
                                <router-link to="/produk" class="btn btn-accent">
                                    Mulai Belanja
                                </router-link>
                            </div>

                            <div v-else>
                                <div v-for="order in orders" :key="order.id" class="order-item">
                                    <div class="order-header">
                                        <div class="order-info">
                                            <h4>Order #{{ order.id }}</h4>
                                            <p class="order-date">{{ formatDate(order.date) }}</p>
                                        </div>
                                        <div class="order-status" :class="order.status">
                                            {{ getStatusText(order.status) }}
                                        </div>
                                    </div>

                                    <div class="order-items">
                                        <div v-for="item in order.items" :key="item.id" class="order-product">
                                            <img :src="item.image" :alt="item.name">
                                            <div class="product-info">
                                                <h5>{{ item.name }}</h5>
                                                <p>Qty: {{ item.quantity }}</p>
                                            </div>
                                            <div class="product-price">
                                                {{ formatPrice(item.price) }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="order-footer">
                                        <div class="order-total">
                                            Total: {{ formatPrice(order.total) }}
                                        </div>
                                        <div class="order-actions">
                                            <button class="btn btn-sm" @click="viewOrder(order)">
                                                Detail
                                            </button>
                                            <button v-if="order.status === 'delivered'" class="btn btn-outline btn-sm">
                                                Beli Lagi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Addresses Tab -->
                    <div v-else-if="activeTab === 'addresses'" class="card tab-content">
                        <h3>Alamat Pengiriman</h3>
                        <div class="addresses-list">
                            <div v-for="address in addresses" :key="address.id"
                                :class="['address-card', { default: address.isDefault }]">
                                <div class="address-content">
                                    <h4>{{ address.label }}</h4>
                                    <p>{{ address.street }}</p>
                                    <p>{{ address.city }}, {{ address.province }} {{ address.postalCode }}</p>
                                    <p class="phone">📞 {{ address.phone }}</p>

                                    <div class="address-actions">
                                        <button class="btn btn-sm" @click="editAddress(address)">
                                            Edit
                                        </button>
                                        <button v-if="!address.isDefault" class="btn btn-outline btn-sm"
                                            @click="setDefaultAddress(address.id)">
                                            Jadikan Default
                                        </button>
                                        <button v-if="!address.isDefault" class="btn btn-sm delete-btn"
                                            @click="deleteAddress(address.id)">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                                <div v-if="address.isDefault" class="default-badge">
                                    <i class="fas fa-star"></i> Default
                                </div>
                            </div>

                            <div class="add-address-card" @click="addNewAddress">
                                <div class="add-icon">
                                    <i class="fas fa-plus"></i>
                                </div>
                                <p>Tambah Alamat Baru</p>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div v-else-if="activeTab === 'settings'" class="card tab-content">
                        <h3>Pengaturan Akun</h3>
                        <div class="settings-list">
                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>Notifikasi Email</h4>
                                    <p>Terima pemberitahuan promo dan update produk</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" v-model="settings.emailNotifications">
                                    <span class="slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>Newsletter</h4>
                                    <p>Berlangganan tips kesehatan dan resep organik</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" v-model="settings.newsletter">
                                    <span class="slider"></span>
                                </label>
                            </div>

                            <div class="setting-item">
                                <div class="setting-info">
                                    <h4>Pembaruan Produk</h4>
                                    <p>Notifikasi untuk produk baru dan stok</p>
                                </div>
                                <label class="switch">
                                    <input type="checkbox" v-model="settings.productUpdates">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>

                        <div class="danger-zone">
                            <h4>Zona Berbahaya</h4>
                            <div class="danger-actions">
                                <button class="btn btn-outline" @click="exportData">
                                    <i class="fas fa-download"></i> Ekspor Data
                                </button>
                                <button class="btn delete-account-btn" @click="deleteAccount">
                                    <i class="fas fa-trash"></i> Hapus Akun
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
import { ref, reactive, onMounted } from 'vue'
import Swal from 'sweetalert2'


import avatarSarah from  '../../assets/images/avatars/alex-suprun-mynsNaNwVDc-unsplash.webp'

const activeTab = ref('profile')
const saving = ref(false)

const tabs = [
    { id: 'profile', label: 'Profil Saya', icon: 'fas fa-user' },
    { id: 'orders', label: 'Pesanan Saya', icon: 'fas fa-shopping-bag' },
    { id: 'addresses', label: 'Alamat', icon: 'fas fa-map-marker-alt' },
    { id: 'settings', label: 'Pengaturan', icon: 'fas fa-cog' }
]

const user = reactive({
    name: 'Diana Sari',
    email: 'diana.sari@email.com',
    phone: '+62 812-3456-7890',
    birthdate: '1990-05-15',
    address: 'Jl. Green Life No. 123, Limbu, Makale, Sulawesi Selatan 90811',
    avatar: avatarSarah,
    joinDate: '2023-01-15'
})

const orders = ref([
    {
        id: 'GL202401001',
        date: '2024-01-20',
        status: 'delivered',
        total: 285000,
        items: [
            {
                id: 1,
                name: 'Paket Buah Organik Segar',
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
                price: 95000,
                quantity: 2
            },
            {
                id: 3,
                name: 'Teh Herbal Organik',
                image: 'https://plus.unsplash.com/premium_photo-1731696604013-52ccf4c49bd9?auto=format&fit=crop&q=80&w=1107',
                price: 65000,
                quantity: 1
            }
        ]
    },
    {
        id: 'GL202312015',
        date: '2023-12-05',
        status: 'completed',
        total: 125000,
        items: [
            {
                id: 2,
                name: 'Skincare Alami GreenLife',
                image: 'https://plus.unsplash.com/premium_photo-1661454224348-5ebd8dc380bb?auto=format&fit=crop&q=80&w=1170',
                price: 125000,
                quantity: 1
            }
        ]
    }
])

const addresses = ref([
    {
        id: 1,
        label: 'Rumah',
        street: 'Jl. Green Life No. 123',
        city: 'Makale',
        province: 'Sulawesi Selatan',
        postalCode: '90811',
        phone: '+62 812-3456-7890',
        isDefault: true
    },
    {
        id: 2,
        label: 'Kantor',
        street: 'Jl. Sudirman No. 456, Gedung Green Tower Lt. 5',
        city: 'Jakarta Selatan',
        province: 'DKI Jakarta',
        postalCode: '12190',
        phone: '+62 811-2233-4455',
        isDefault: false
    }
])

const settings = reactive({
    emailNotifications: true,
    newsletter: true,
    productUpdates: false
})

let originalUser = reactive({})

// === Lifecycle ===
onMounted(() => {
    originalUser = { ...user }
})

// === Methods ===
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price)
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function getStatusText(status) {
    const statusMap = {
        pending: 'Menunggu Pembayaran',
        processing: 'Diproses',
        shipped: 'Dikirim',
        delivered: 'Selesai',
        completed: 'Selesai',
        cancelled: 'Dibatalkan'
    }
    return statusMap[status] || status
}

async function updateProfile() {
    saving.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    saving.value = false
    originalUser = { ...user }

    Swal.fire({
        title: 'Berhasil!',
        text: 'Profil Anda telah diperbarui',
        icon: 'success',
        confirmButtonColor: '#4CAF50',
        timer: 1500
    })
}

function resetForm() {
    Object.assign(user, originalUser)
}

function editAvatar() {
    Swal.fire({
        title: 'Ubah Foto Profil',
        text: 'Fitur ini akan segera tersedia',
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function viewOrder(order) {
    Swal.fire({
        title: `Detail Pesanan #${order.id}`,
        html: `
      <div style="text-align: left;">
        <p><strong>Tanggal:</strong> ${formatDate(order.date)}</p>
        <p><strong>Status:</strong> ${getStatusText(order.status)}</p>
        <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
        <hr>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items
                .map(
                    item =>
                        `<li>${item.name} (${item.quantity}x) - ${formatPrice(
                            item.price * item.quantity
                        )}</li>`
                )
                .join('')}
        </ul>
      </div>
    `,
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function addNewAddress() {
    Swal.fire({
        title: 'Tambah Alamat Baru',
        text: 'Fitur ini akan segera tersedia',
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function editAddress(address) {
    Swal.fire({
        title: 'Edit Alamat',
        text: `Mengedit alamat: ${address.label}`,
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function setDefaultAddress(addressId) {
    addresses.value.forEach(addr => {
        addr.isDefault = addr.id === addressId
    })
    Swal.fire({
        title: 'Berhasil!',
        text: 'Alamat default telah diubah',
        icon: 'success',
        confirmButtonColor: '#4CAF50',
        timer: 1500
    })
}

function deleteAddress(addressId) {
    Swal.fire({
        title: 'Hapus Alamat?',
        text: 'Alamat yang dihapus tidak dapat dikembalikan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
    }).then(result => {
        if (result.isConfirmed) {
            addresses.value = addresses.value.filter(addr => addr.id !== addressId)
            Swal.fire('Terhapus!', 'Alamat telah dihapus', 'success')
        }
    })
}

function exportData() {
    Swal.fire({
        title: 'Ekspor Data',
        text: 'Data Anda akan diekspor dan dikirim ke email',
        icon: 'info',
        confirmButtonColor: '#4CAF50'
    })
}

function deleteAccount() {
    Swal.fire({
        title: 'Hapus Akun?',
        text: 'Tindakan ini tidak dapat dibatalkan. Semua data akan dihapus permanen.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Hapus Akun!',
        cancelButtonText: 'Batal'
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire('Akun Dihapus!', 'Akun Anda telah berhasil dihapus', 'success')
        }
    })
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.user-profile {
    padding: 80px 0;
    margin-top: -100px;
    background: linear-gradient(to bottom, $white, $light-bg);
    min-height: 100vh;
}

.profile-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 40px;
    align-items: start;
}

.profile-sidebar {
    position: sticky;
    top: 100px;
}

.user-summary {
    text-align: center;
    padding: 30px 20px;
    margin-bottom: 20px;

    .user-avatar {
        position: relative;
        width: 100px;
        height: 100px;
        margin: 0 auto 20px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid $primary-light;
        }

        .edit-avatar-btn {
            position: absolute;
            bottom: 5px;
            right: 5px;
            width: 30px;
            height: 30px;
            background: $primary;
            color: $white;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: $transition;

            &:hover {
                background: $primary-dark;
                transform: scale(1.1);
            }
        }
    }

    h3 {
        color: $text;
        margin-bottom: 5px;
        font-size: 1.3rem;
    }

    .user-email {
        color: $light-text;
        margin-bottom: 5px;
    }

    .user-member {
        color: $light-text;
        font-size: 0.9rem;
    }
}

.profile-nav {
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

        &:hover {
            background: $primary-light;
            color: $primary;
        }

        &.active {
            background: $primary;
            color: $white;

            .arrow {
                transform: translateX(3px);
            }
        }

        i:first-child {
            width: 20px;
            text-align: center;
        }

        .arrow {
            margin-left: auto;
            font-size: 0.8rem;
            transition: $transition;
        }
    }
}

.tab-content {
    padding: 30px;

    h3 {
        color: $text;
        margin-bottom: 25px;
        font-size: 1.5rem;
    }
}

.profile-form {
    .form-grid {
        gap: 20px;
        margin-bottom: 20px;
    }

    .form-actions {
        display: flex;
        gap: 15px;
        justify-content: flex-end;
        margin-top: 30px;
    }
}

.orders-list {
    .empty-orders {
        text-align: center;
        padding: 40px 20px;

        i {
            font-size: 3rem;
            color: $light-text;
            margin-bottom: 15px;
        }

        p {
            color: $light-text;
            margin-bottom: 20px;
        }
    }
}

.order-item {
    border: 1px solid $light-bg;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }

    .order-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .order-info {
            h4 {
                margin-bottom: 5px;
                color: $text;
            }

            .order-date {
                color: $light-text;
                font-size: 0.9rem;
                margin: 0;
            }
        }

        .order-status {
            padding: 6px 12px;
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

            &.delivered,
            &.completed {
                background: #d4edda;
                color: #155724;
            }

            &.cancelled {
                background: #f8d7da;
                color: #721c24;
            }
        }
    }

    .order-items {
        .order-product {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 10px 0;
            border-bottom: 1px solid $light-bg;

            &:last-child {
                border-bottom: none;
            }

            img {
                width: 50px;
                height: 50px;
                border-radius: 8px;
                object-fit: cover;
            }

            .product-info {
                flex: 1;

                h5 {
                    margin-bottom: 5px;
                    color: $text;
                    font-size: 0.95rem;
                }

                p {
                    color: $light-text;
                    font-size: 0.85rem;
                    margin: 0;
                }
            }

            .product-price {
                font-weight: 600;
                color: $primary;
            }
        }
    }

    .order-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid $light-bg;

        .order-total {
            font-weight: 700;
            font-size: 1.1rem;
            color: $primary;
        }

        .order-actions {
            display: flex;
            gap: 10px;
        }
    }
}

.addresses-list {
    display: grid;
    gap: 20px;
}

.address-card {
    border: 2px solid $light-bg;
    border-radius: 12px;
    padding: 20px;
    position: relative;
    transition: $transition;

    &.default {
        border-color: $primary;
        background: $primary-light;
    }

    .address-content {
        h4 {
            color: $text;
            margin-bottom: 10px;
        }

        p {
            color: $light-text;
            margin-bottom: 5px;

            &.phone {
                margin-top: 10px;
            }
        }

        .address-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;

            .delete-btn {
                background: #f44336;

                &:hover {
                    background: #d32f2f;
                }
            }
        }
    }

    .default-badge {
        position: absolute;
        top: 15px;
        right: 15px;
        background: $primary;
        color: $white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 600;

        i {
            margin-right: 4px;
        }
    }
}

.add-address-card {
    border: 2px dashed $light-text;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    cursor: pointer;
    transition: $transition;

    &:hover {
        border-color: $primary;
        color: $primary;
    }

    .add-icon {
        font-size: 2rem;
        margin-bottom: 10px;
        color: $light-text;
    }

    p {
        color: $light-text;
        margin: 0;
    }
}

.settings-list {
    .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid $light-bg;

        &:last-child {
            border-bottom: none;
        }

        .setting-info {
            h4 {
                margin-bottom: 5px;
                color: $text;
            }

            p {
                color: $light-text;
                font-size: 0.9rem;
                margin: 0;
            }
        }
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

.danger-zone {
    margin-top: 40px;
    padding: 25px;
    background: #ffebee;
    border-radius: 12px;
    border: 1px solid #f44336;

    h4 {
        color: #f44336;
        margin-bottom: 15px;
    }

    .danger-actions {
        display: flex;
        gap: 15px;

        .delete-account-btn {
            background: #f44336;

            &:hover {
                background: #d32f2f;
            }
        }
    }
}

@media (max-width: 992px) {
    .profile-content {
        grid-template-columns: 1fr;
    }

    .profile-sidebar {
        position: static;
    }
}

@media (max-width: 768px) {
    .tab-content {
        padding: 20px;
    }

    .profile-form .form-grid {
        grid-template-columns: 1fr;
    }

    .form-actions {
        flex-direction: column;
    }

    .order-item .order-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .order-item .order-footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    .danger-actions {
        flex-direction: column;
    }

    .address-actions {
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .order-product {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }

    .profile-nav .nav-item {
        padding: 12px 15px;
    }
}
</style>
