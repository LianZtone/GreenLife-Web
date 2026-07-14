<template>
  <div class="home">
      <Hero />
      <FeaturedProducts/>
      <Categories />

      <Testimonials />
  </div>
</template>

<script setup>
import Categories from '../components/shop/Categories.vue';
import FeaturedProducts from '../components/pages/FeaturedProducts.vue';
import Hero from '../components/common/Hero.vue'
import Testimonials from '../components/pages/Testimonials.vue';


</script>

<style scoped>
h1 {
  color: #2c3e50;
}
</style>
