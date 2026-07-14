<template>
    <section class="categories container">
        <div class="section-title fade-in">
            <h2>Kategori Produk</h2>
            <p>Temukan berbagai kategori produk organik untuk kebutuhan sehat Anda</p>
        </div>

        <div class="category-container">
            <div v-for="(category, index) in categories" :key="category.id" class="category-card fade-in"
                :class="`delay-${index + 1}`">
                <img :src="category.image" :alt="category.name">
                <div class="category-overlay">
                    <h3>{{ category.name }}</h3>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

import imgpost1 from '../../assets/images/products/nrd-D6Tu_L3chLE-unsplash.webp'
import imgpost2 from '../../assets/images/products/lisa-hobbs-mRaNok_Ld6s-unsplash.webp'
import imgpost3 from '../../assets/images/products/kseniya-kolesnikova-pDTMaJFTLLo-unsplash.webp'
import imgpost4 from '../../assets/images/products/s-o-c-i-a-l-c-u-t-I28KoP7YM7U-unsplash.webp'

const categories = ref([
  {
    id: 1,
    name: 'Makanan Sehat',
    image: imgpost1
  },
  {
    id: 2,
    name: 'Minuman Herbal',
    image: imgpost2
  },
  {
    id: 3,
    name: 'Skincare Organik',
    image: imgpost3
  },
  {
    id: 4,
    name: 'Buah segar',
    image: imgpost4
  }
])
</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;

.categories {
    padding: 0px 0;
    background: linear-gradient(to bottom, $white, $light-bg);

}

.category-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
}

.category-card {
    position: relative;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: $card-shadow;
    transition: $transition;

    &:hover {
        transform: translateY(-5px);
        box-shadow: $card-hover-shadow;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
    }

    &:hover img {
        transform: scale(1.1);
    }
}

.category-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    display: flex;
    align-items: flex-end;
    padding: 25px;

    h3 {
        color: $white;
        font-size: 1.5rem;
    }
}
</style>
