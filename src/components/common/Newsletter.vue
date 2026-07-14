<template>
    <section class="newsletter">
        <div class="newsletter-pattern"></div>
        <div class="container">
            <h2 class="fade-in">Berlangganan Newsletter Kami</h2>
            <p class="fade-in delay-1">Dapatkan informasi terbaru tentang produk, promo, dan tips hidup sehat langsung
                ke email Anda.</p>

            <form class="newsletter-form fade-in delay-2" @submit.prevent="subscribe">
                <input type="email" v-model="email" placeholder="Masukkan alamat email Anda" required>
                <button type="submit">Berlangganan</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({
    name: 'Newsletter',
})

const email = ref('')

function subscribe() {
    if (this.email) {
        alert(`Terima kasih! Email ${this.email} telah berhasil didaftarkan untuk newsletter.`)
        this.email = ''
    }
}

</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;

.newsletter {
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    padding: 80px 0;
    color: $white;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.newsletter h2 {
    color: $white;
    position: relative;
    z-index: 2;
}

.newsletter p {
    max-width: 600px;
    margin: 0 auto 30px;
    opacity: 0.9;
    position: relative;
    z-index: 2;
}

.newsletter-form {
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    position: relative;
    z-index: 2;

    input {
        flex: 1;
        padding: 16px 20px;
        border: none;
        border-radius: 50px 0 0 50px;
        font-size: 1rem;
        outline: none;
    }

    button {
        padding: 0 25px;
        background: $accent;
        color: $text;
        border: none;
        border-radius: 0 50px 50px 0;
        font-weight: 600;
        cursor: pointer;
        transition: $transition;

        &:hover {
            background: $accent-dark;
        }
    }
}

.newsletter-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
}

@media (max-width: 768px) {
    .newsletter-form {
        flex-direction: column;
        gap: 15px;

        input,
        button {
            border-radius: 50px;
            padding: 16px;
        }
    }
}
</style>
