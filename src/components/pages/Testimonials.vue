<template>
    <section class="testimonials">
        <div class="container">
            <div class="section-title fade-in">
                <h2>Apa Kata Pelanggan Kami</h2>
                <p>Testimoni dari pelanggan setia GreenLife yang telah merasakan manfaat produk kami</p>
            </div>

            <div class="testimonial-container grid grid-3">
                <div v-for="(testimonial, index) in testimonials" :key="testimonial.id" class="card testimonial fade-in"
                    :class="`delay-${index + 1}`">
                    <p class="testimonial-text">"{{ testimonial.text }}"</p>
                    <div class="rating">
                        <i v-for="n in 5" :key="n" class="fas fa-star"
                            :class="{ 'fa-star-half-alt': n === 5 && testimonial.rating === 4.5 }"></i>
                    </div>
                    <div class="testimonial-author">
                        <img :src="testimonial.avatar" :alt="testimonial.name">
                        <div class="author-info">
                            <h4>{{ testimonial.name }}</h4>
                            <p>{{ testimonial.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

import imgavatar1 from '../../assets/images/avatars/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash.webp'
import imgavatar2 from '../../assets/images/avatars/jake-nackos-IF9TK5Uy-KI-unsplash.webp'
import imgavatar3 from '../../assets/images/avatars/jurica-koletic-7YVZYZeITc8-unsplash.webp'

const testimonials = ref([
    {
        id: 1,
        text: "Sejak berbelanja di GreenLife, saya merasakan perubahan positif pada kesehatan saya. Produknya segar dan berkualitas tinggi.",
        rating: 5,
        name: "Diana Putri",
        role: "Pelanggan Setia",
        avatar: imgavatar1
    },
    {
        id: 2,
        text: "Skincare organik dari GreenLife sangat cocok untuk kulit sensitif saya. Alami dan tanpa efek samping.",
        rating: 5,
        name: "Rina Wijaya",
        role: "Pelanggan Setia",
        avatar: imgavatar2
    },
    {

        id: 3,
        text: "Pelayanan sangat memuaskan dan pengiriman cepat. Sayuran organiknya selalu fresh dan harga bersaing.",
        rating: 4.5,
        name: "Budi Santoso",
        role: "Pelanggan Setia",
        avatar: imgavatar3
    }
])
</script>



<style lang="scss" scoped>
@use "@/style.scss" as *;

.testimonials {
    background: linear-gradient(to bottom, $light-bg, $white);
    padding: 80px 0;
    position: relative;
}

.testimonial {
    padding: 30px;
    position: relative;

    &:before {
        content: '"';
        position: absolute;
        top: 20px;
        left: 20px;
        font-size: 5rem;
        color: $primary-light;
        font-family: Georgia, serif;
        line-height: 1;
        z-index: 0;
    }
}

.testimonial-text {
    font-style: italic;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
}

.testimonial-author {
    display: flex;
    align-items: center;
}

.testimonial-author img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
    border: 3px solid $primary-light;
}

.author-info {
    h4 {
        margin-bottom: 5px;
        font-size: 1.1rem;
    }

    p {
        font-size: 0.9rem;
        color: $light-text;
    }
}

.rating {
    color: $accent;
    margin: 15px 0;
}

@media (max-width: 768px) {
    .testimonial-author {
        flex-direction: column;
        text-align: center;

        img {
            margin-right: 0;
            margin-bottom: 10px;
        }
    }
}
</style>
