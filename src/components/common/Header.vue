<template>
    <header>
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <div class="logo-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <h1>GreenLife</h1>
                </div>

                <ul class="nav-menu" :class="{ active: isMenuActive }">
                    <li><router-link to="/">Beranda</router-link></li>
                    <li><router-link to="/produk">Produk</router-link></li>
                    <li><router-link to="/artikel">Artikel</router-link></li>
                    <li><router-link to="/komunitas">Komunitas</router-link></li>
                    <li><router-link to="/tentang">Tentang Kami</router-link></li>
                    <li><router-link to="/kontak">Kontak</router-link></li>
                </ul>

                <div class="nav-icons">
                    <div class="nav-icon" id="search-btn" @click="openSearch">
                        <i id="search-icon" class="fas fa-search"></i>
                    </div>
                    <div id="myOverlay" class="overlay">
                        <!-- <span class="closebtn" @click="closeSearch" title="Close Overlay">x</span> -->
                        <div class="overlay-content">
                           <form @submit.prevent="handleSearch">
                                <input type="text" v-model="searchQuery" placeholder="Cari produk, artikel, atau komunitas" name="search">
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </form>
                        </div>
                    </div>

                    <UserMenu :user="user" :cart-count="cartCount" />

                    <div class="hamburger" @click="toggleMenu" :class="{ active: isMenuActive }">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import UserMenu from '@/components/user/UserMenu.vue'

const isMenuActive = ref(false)
const cartCount = ref(3)
const searchQuery = ref('')
const isDropdownOpen = ref(false)
const user = ref({ name: 'Guest' })
const isDeveloping = ref(false)
const searchResults = ref([])



function toggleMenu() {
    isMenuActive.value = !isMenuActive.value
}

function openSearch() {
    const overlay = document.getElementById("myOverlay");
    const icon = document.getElementById("search-icon");
    const isOpen = overlay.style.display === "block";
    overlay.style.display = isOpen ? "none" : "block";
    icon.className = isOpen ? "fas fa-search" : "fas fa-times";
}

window.addEventListener("scroll", () => {
    const overlay = document.getElementById("myOverlay");
    const icon = document.getElementById("search-icon");
    if (overlay.style.display === "block") {
        overlay.style.display = "none";
        icon.className = "fas fa-search";
    }
});


function handleClickOutside(event) {
    const menu = document.querySelector('.user-menu')
    if (menu && !menu.contains(event.target)) {
        isDropdownOpen.value = false
    }
}

const handleSearch = () => {
  alert(`Fitur pencarian masih dalam tahap pengembangan. Kata kunci: ${searchQuery.value || 'kosong'}`);
};


onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})





</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;



header {
    background-color: $white;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;

    &-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, $primary, $primary-dark);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $white;
        font-size: 20px;
    }

    h1 {
        font-size: 1.8rem;
        margin: 0;
        background: linear-gradient(to right, $primary, $secondary);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;

    li a {
        text-decoration: none;
        color: $text;
        font-weight: 500;
        transition: $transition;
        position: relative;
        padding: 5px 0;

        &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background: linear-gradient(to right, $primary, $accent);
            transition: $transition;
        }

        &:hover {
            color: $primary;

            &:after {
                width: 100%;
            }
        }
    }
}

.nav-icons {
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        .auth-buttons {
            display: none;
        }
    }
}

.user-menu {
    position: relative;
    display: inline-block;
}

.nav-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $light-bg;
    color: $primary;
    transition: $transition;
    cursor: pointer;
    position: relative;

    &:hover {
        background: $primary;
        color: $white;
        transform: translateY(-3px);
    }

    .cart-icon {
        color: inherit;
        text-decoration: none;
    }

    .user {
        color: inherit;
        text-decoration: none;
    }
}

.dropdown-menu {
    position: absolute;
    top: 110%;
    right: 0;
    background: $white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    list-style: none;
    padding: 8px 0;
    width: 160px;
    z-index: 100;
    text-decoration: none;

    a {
        text-decoration: none;
        color: inherit;
        display: block; // biar area klik lebih luas
        width: 100%;
        // padding: 10px 16px;
        transition: background 0.2s;
    }

    li {
        cursor: pointer;
        padding: 10px 16px;

        &:hover {
            background: $white;
            color: $primary-dark;
        }
    }

}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


.overlay {
    height: 100%;
    width: 100%;
    max-width: 100%;
    display: none;
    position: fixed;
    z-index: 1;
    inset: 0;
    top: 50px;
    left: 0;

    .show {
        opacity: 1;
        visibility: visible;
    }

    .overlay-content {
        position: relative;
        border: none;
        border-radius: 100px;
        top: 46%;
        width: 100%;
        max-width: 500px;
        text-align: center;
        margin-top: 30px;
        margin: auto;

    }

    .closebtn {
        position: absolute;
        top: 40px;
        right: 90px;
        font-size: 20px;
        cursor: pointer;
        color: $white;

        &:hover {
            color: $primary-light;
        }
    }


    input[type=text] {
        padding: 15px;
        border: none;
        border-radius: 100px;
        font-size: 17px;
        border: none;
        float: left;
        width: 80%;
        border-color: $primary;
        box-shadow: $card-shadow;
        background: $white;

        &:hover {
            background: $primary-light;
            outline: none;
        }

        &:focus {
            border-color: $primary;
            outline: none;
            box-shadow: 0 0 2px $primary;
        }
    }

    button {
        float: left;
        width: 20%;
        padding: 15px;
        border: none;
        border-radius: 100px;
        background: $light-bg;
        box-shadow: $card-shadow;
        font-size: 17px;
        border: none;
        cursor: pointer;

        &:hover {
            color: $primary-light;
            background: $primary;
        }
    }

}


.cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: $accent;
    color: $text;
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
}

.hamburger {
    display: none;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;

    span {
        width: 25px;
        height: 3px;
        background: $primary;
        border-radius: 5px;
        transition: $transition;
    }
}

.dev-message {
    color: #ff9800;
    margin-top: 20px;
    font-size: 24px;
}

// Responsive
@media (max-width: 992px) {
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 80px;
        flex-direction: column;
        background-color: $white;
        width: 100%;
        text-align: center;
        transition: 0.4s;
        box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
        padding: 30px 0;
        gap: 20px;

        &.active {
            left: 0;
        }
    }

    .nav-menu.active {
        .auth-buttons-mobile {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 20px;
            border-top: 1px solid $light-bg;

            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    }

    .hamburger {
        display: flex;

        &.active span:nth-child(2) {
            opacity: 0;
        }

        &.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        &.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
}
</style>
