<template>
    <section class="hero">
        <div class="container">
            <div class="hero-content fade-in">
                <h2>Hidup Sehat Bersama Alam</h2>
                <p>Temukan produk organik terbaik untuk kesehatan dan gaya hidup ramah lingkungan. Mulai perjalanan sehat Anda bersama kami.</p>
                <div class="hero-buttons">
                    <router-link to="/produk" class="btn">Jelajahi Sekarang</router-link>
                    <router-link to="/tentang" class="btn btn-outline white">Pelajari Lebih Lanjut</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
defineOptions( {
    name: 'Hero'
})
</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;

.hero {
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.9) 0%, rgba(93, 64, 55, 0.8) 100%),
        url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') no-repeat center center/cover;
    min-height: 600px;
    display: flex;
    align-items: center;
    color: $white;
    position: relative;
    overflow: hidden;
}

.hero-content {
    max-width: 650px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 2;

    h2 {
        font-size: 3.2rem;
        margin-bottom: 20px;
        color: $white;
        line-height: 1.2;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        opacity: 0.9;
    }
}

.hero-buttons {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
}

@media (max-width: 992px) {
    .hero-content h2 {
        font-size: 2.5rem;
    }
}

@media (max-width: 768px) {
    .hero-content {
        padding: 30px;

        h2 {
            font-size: 2rem;
        }
    }

    .hero-buttons {
        flex-direction: column;
        align-items: center;

        .btn {
            width: 100%;
            text-align: center;
            justify-content: center;
        }
    }
}

@media (max-width: 576px) {
    .hero {
        min-height: 500px;
    }
    
    .hero-content {
        padding: 20px;
        
        h2 {
            font-size: 1.8rem;
        }
        
        p {
            font-size: 1rem;
        }
    }
}
</style>
