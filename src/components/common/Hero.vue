<template>
    <section class="hero">
        <div class="container">
            <div class="hero-content fade-in">
                <h2>Hidup Sehat Bersama Alam</h2>
                <p>Temukan produk organik terbaik untuk kesehatan dan gaya hidup ramah lingkungan. Mulai perjalanan sehat Anda bersama kami.</p>
                <div class="hero-buttons">
                    <router-link to="/produk" class="btn btn-accent">Jelajahi Sekarang</router-link>
                    <router-link to="/tentang" class="btn btn-outline white">Pelajari Lebih Lanjut</router-link>
                </div>
                <div class="social-proof" aria-label="Social proof GreenLife">
                    <div class="proof-item">
                        <div class="proof-number" ref="count1El">10.000+</div>
                        <div class="proof-label">Pelanggan Sehat</div>
                    </div>
                    <div class="proof-item">
                        <div class="proof-number" ref="count2El">4.9/5</div>
                        <div class="proof-label">Rating Rata-rata</div>
                    </div>
                    <div class="proof-item">
                        <div class="proof-number" ref="count3El">100%</div>
                        <div class="proof-label">Organik</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'

defineOptions({
    name: 'Hero'
})

const count1El = ref(null)
const count2El = ref(null)

function animateCount(el, target, step, suffix = '', durationMs = 900) {
    if (!el) return
    const start = Number((el.textContent || '').replace(/[^0-9.]/g, '')) || 0
    const diff = target - start
    const startTime = performance.now()

    const tick = (now) => {
        const t = Math.min(1, (now - startTime) / durationMs)
        const current = start + diff * t
        el.textContent = `${Math.round(current / step) * step}${suffix}`.replace('.0', '')
        if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
}

onMounted(() => {
    // Social proof counter (lebih hidup)
    animateCount(count1El.value, 10000, 100, '+', 1100)

    // rating float, tampilkan 4.9/5
    if (count2El.value) {
        const el = count2El.value
        const start = 0
        const target = 4.9
        const startTime = performance.now()
        const durationMs = 1000

        const tick = (now) => {
            const t = Math.min(1, (now - startTime) / durationMs)
            const current = start + (target - start) * t
            el.textContent = `${current.toFixed(1)}/5`
            if (t < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }
})
</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;

.hero {
    background: linear-gradient(135deg, rgba(46, 125, 50, 0.277) 0%, rgba(93, 64, 55, 0.8) 100%),
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

.social-proof {
    margin-top: 20px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    .proof-item {
        background: rgba(255, 255, 255, 0.18);
        border: 1px solid rgba(255, 255, 255, 0.18);
        padding: 12px 14px;
        border-radius: 12px;
        min-width: 100px;
        backdrop-filter: blur(10px);
    }

    .proof-number {
        font-size: 1.2rem;
        color: $white;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 6px;
    }

    .proof-label {
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 500;
    }

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
