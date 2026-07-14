<template>
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-column fade-in">
                    <h3>GreenLife</h3>
                    <p>Menyediakan produk organik terbaik untuk mendukung gaya hidup sehat dan ramah lingkungan.</p>
                    <div class="social-icons">
                        <button type="button" aria-label="Facebook" @click="showSocialInfo('Facebook')">
                            <i class="fab fa-facebook-f"></i>
                        </button>
                        <button type="button" aria-label="Instagram" @click="showSocialInfo('Instagram')">
                            <i class="fab fa-instagram"></i>
                        </button>
                        <button type="button" aria-label="Twitter" @click="showSocialInfo('Twitter')">
                            <i class="fab fa-twitter"></i>
                        </button>
                        <button type="button" aria-label="YouTube" @click="showSocialInfo('YouTube')">
                            <i class="fab fa-youtube"></i>
                        </button>
                    </div>
                </div>

                <div class="footer-column fade-in delay-1">
                    <h3>Tautan Cepat</h3>
                    <ul>
                        <li><router-link to="/">Beranda</router-link></li>
                        <li><router-link to="/produk">Produk</router-link></li>
                        <li><router-link to="/artikel">Artikel</router-link></li>
                        <li><router-link to="/tentang">Tentang Kami</router-link></li>
                        <li><router-link to="/kontak">Kontak</router-link></li>
                    </ul>
                </div>

                <div class="footer-column fade-in delay-2">
                    <h3>Kategori Produk</h3>
                    <ul>
                        <li><router-link to="/produk">Makanan Sehat</router-link></li>
                        <li><router-link to="/produk">Minuman Herbal</router-link></li>
                        <li><router-link to="/produk">Skincare Organik</router-link></li>
                        <li><router-link to="/produk">Produk Rumah Tangga</router-link></li>
                        <li><router-link to="/produk">Bahan Masak Organik</router-link></li>
                    </ul>
                </div>

                <div class="footer-column fade-in delay-3">
                    <h3>Kontak Kami</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Jl. Green Life Limbu, Makale</li>
                        <li><i class="fas fa-phone"></i> +62 21 1234 5678</li>
                        <li><i class="fas fa-envelope"></i> info@greenlife.com</li>
                    </ul>
                </div>
            </div>

            <div class="copyright">
                <p>&copy; 2023 GreenLife - All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import Swal from 'sweetalert2'

defineOptions({
    name : 'Footer'
})

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

footer {
    background: $dark-bg;
    color: $white;
    padding: 80px 0 30px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 50px;
}

.footer-column {
    h3 {
        color: $white;
        margin-bottom: 25px;
        font-size: 1.3rem;
        position: relative;
        padding-bottom: 10px;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 40px;
            height: 3px;
            background: $accent;
            border-radius: 2px;
        }
    }

    p {
        margin-bottom: 20px;
        opacity: 0.8;
    }

    ul {
        list-style: none;
    }

    li {
        margin-bottom: 12px;
    }

    a {
        color: $white;
        text-decoration: none;
        transition: $transition;
        opacity: 0.8;

        &:hover {
            opacity: 1;
            color: $accent;
            padding-left: 5px;
        }
    }
}

.social-icons {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    a,
    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border: none;
        color: $white;
        transition: $transition;
        cursor: pointer;

        &:hover {
            background: $primary;
            transform: translateY(-3px);
        }
    }
}

.copyright {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    opacity: 0.7;
}
</style>
