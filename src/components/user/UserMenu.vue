<template>
    <div class="user-menu">
        <div class="user-trigger" @click="toggleMenu" ref="trigger">
            <img :src="avatarSrc" :alt="displayName" class="user-avatar" srcset="">
            <span class="user-name">{{ displayName }}</span>
            <i class="fas fa-chevron-down" :class="{ open: isMenuOpen }"></i>
        </div>

        <div v-if="isMenuOpen" class="user-dropdown card" ref="dropdown">
            <div class="dropdown-header">
                <img :src="avatarSrc" :alt="displayName" class="user-avatar" srcset="">

                <div class="user-info">
                    <h4>{{ displayName }}</h4>
                    <p>{{ displayEmail }}</p>
                </div>
            </div>

            <div class="dropdown-menu">
                <template v-if="isLoggedIn">
                    <router-link to="/profil" class="menu-item" @click="closeMenu">
                        <i class="fas fa-user"></i>
                        <span>Profil Saya</span>
                    </router-link>

                    <router-link to="/pesanan" class="menu-item" @click="closeMenu">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Pesanan Saya</span>
                    </router-link>

                    <router-link to="/keranjang" class="menu-item" @click="closeMenu">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Keranjang</span>
                        <span class="badge" v-if="cartCount > 0">{{ cartCount }}</span>
                    </router-link>

                    <router-link to="/favorit" class="menu-item" @click="closeMenu">
                        <i class="fas fa-heart"></i>
                        <span>Favorit</span>
                    </router-link>

                    <div class="menu-divider"></div>

                    <router-link to="/komunitas" class="menu-item" @click="closeMenu">
                        <i class="fas fa-users"></i>
                        <span>Komunitas</span>
                    </router-link>

                    <router-link to="/pengaturan" class="menu-item" @click="closeMenu">
                        <i class="fas fa-cog"></i>
                        <span>Pengaturan</span>
                    </router-link>

                    <div class="menu-divider"></div>

                    <button class="menu-item logout-btn" @click="handleLogout">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Keluar</span>
                    </button>
                </template>

                <template v-else>
                    <router-link to="/auth" class="menu-item" @click="closeMenu">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>Masuk / Daftar</span>
                    </router-link>

                    <router-link to="/produk" class="menu-item" @click="closeMenu">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Jelajahi Produk</span>
                    </router-link>

                    <router-link to="/komunitas" class="menu-item" @click="closeMenu">
                        <i class="fas fa-users"></i>
                        <span>Komunitas</span>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import fallbackAvatar from '../../assets/images/avatars/alex-suprun-mynsNaNwVDc-unsplash.webp'
import { AUTH_CHANGE_EVENT, clearAuthUser, getStoredAuthUser, isAuthenticated } from '@/utils/auth'

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    cartCount: {
        type: Number,
        default: 0
    }
})

const router = useRouter()

const isMenuOpen = ref(false)
const trigger = ref(null)
const dropdown = ref(null)
const authUser = ref(getStoredAuthUser())
const isLoggedIn = ref(isAuthenticated())

const displayName = computed(() => {
    if (!authUser.value) return 'Tamu'
    if (authUser.value.firstName || authUser.value.lastName) {
        return [authUser.value.firstName, authUser.value.lastName].filter(Boolean).join(' ').trim()
    }
    return authUser.value.name || 'Tamu'
})

const displayEmail = computed(() => authUser.value?.email || 'Masuk untuk melihat akun Anda')
const avatarSrc = computed(() => authUser.value?.avatar || fallbackAvatar)


function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    isMenuOpen.value = false
}

function handleLogout() {
    Swal.fire({
        title: 'Konfirmasi Keluar',
        text: 'Apakah Anda yakin ingin keluar dari akun?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Keluar',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            clearAuthUser()
            closeMenu()

            Swal.fire({
                title: 'Berhasil Keluar!',
                text: 'Anda telah berhasil keluar dari akun',
                icon: 'success',
                confirmButtonColor: '#4CAF50',
                timer: 1500
            }).then(() => {
                router.push('/auth')
                // window.location.reload()
            })
        }
    })
}

function handleClickOutside(event) {
    if (
        isMenuOpen.value &&
        trigger.value &&
        dropdown.value &&
        !trigger.value.contains(event.target) &&
        !dropdown.value.contains(event.target)
    ) {
        closeMenu()
    }
}


onMounted(() => {
    syncAuthState()
    document.addEventListener('click', handleClickOutside)
    window.addEventListener(AUTH_CHANGE_EVENT, syncAuthState)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener(AUTH_CHANGE_EVENT, syncAuthState)
})

function syncAuthState() {
    authUser.value = getStoredAuthUser()
    isLoggedIn.value = isAuthenticated()
}
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.user-menu {
    position: relative;
}

.user-trigger {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 25px;
    cursor: pointer;
    transition: $transition;

    &:hover {
        background: $primary-light;
    }
}

.user-avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $primary-light;
}

.user-name {
    font-weight: 500;
    color: $text;

    @media (max-width: 768px) {
        display: none;
    }
}

.fa-chevron-down {
    font-size: 0.8rem;
    color: $light-text;
    transition: $transition;

    &.open {
        transform: rotate(180deg);
    }
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 280px;
    margin-top: 10px;
    z-index: 1000;
    animation: slideDown 0.2s ease;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    border-bottom: 1px solid $light-bg;
}

.dropdown-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $primary-light;
}

.user-info {
    h4 {
        margin: 0 0 5px 0;
        color: $text;
        font-size: 1rem;
    }

    p {
        margin: 0;
        color: $light-text;
        font-size: 0.85rem;
    }
}

.dropdown-menu {
    padding: 10px 0;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 20px;
    text-decoration: none;
    color: $text;
    transition: $transition;
    position: relative;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;

    &:hover {
        background: $primary-light;
        color: $primary;
    }

    i {
        width: 16px;
        text-align: center;
        font-size: 0.9rem;
    }

    span {
        flex: 1;
        font-size: 0.9rem;
    }
}

.badge {
    background: $accent;
    color: $text;
    padding: 2px 6px;
    border-radius: 10px;
    font-size: 0.7rem;
    font-weight: 600;
    min-width: 18px;
    text-align: center;
}

.menu-divider {
    height: 1px;
    background: $light-bg;
    margin: 8px 0;
}

.logout-btn {
    color: #f44336;

    &:hover {
        background: #ffebee;
        color: #d32f2f;
    }
}

@media (max-width: 576px) {
    .user-dropdown {
        position: fixed;
        top: 70px;
        left: 10px;
        right: 10px;
        width: auto;
    }
}
</style>
