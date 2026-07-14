<template>
    <section class="about container">
        <div class="section-title fade-in">
            <h2>Tentang GreenLife</h2>
            <p>Mengenal lebih dekat visi, misi, dan perjalanan kami dalam menghadirkan kehidupan yang lebih sehat</p>
        </div>

        <div class="about-content grid grid-2">
            <div class="about-text fade-in delay-1">
                <h3>Visi Kami</h3>
                <p>Menjadi pelopor dalam menyediakan produk organik berkualitas tinggi yang dapat diakses oleh semua
                    kalangan, mendukung gaya hidup sehat dan berkelanjutan untuk masyarakat Indonesia.</p>

                <h3>Misi Kami</h3>
                <ul class="mission-list">
                    <li><i class="fas fa-check"></i> Menyediakan produk organik dengan kualitas terbaik</li>
                    <li><i class="fas fa-check"></i> Mendukung petani lokal dan praktik pertanian berkelanjutan</li>
                    <li><i class="fas fa-check"></i> Edukasi masyarakat tentang pentingnya gaya hidup sehat</li>
                    <li><i class="fas fa-check"></i> Mengurangi dampak lingkungan melalui produk ramah lingkungan</li>
                </ul>
            </div>

            <div class="about-image fade-in delay-2">
                <img loading="lazy" src="../../assets/images/products/becca-tapert-O7sK3d3TPWQ-unsplash.webp"
                    alt="Tentang GreenLife">
            </div>
        </div>

        <div class="values-section">
            <div class="value-cards grid grid-4">
                <div class="card value-card fade-in delay-1">
                    <div class="value-icon">
                        <i class="fas fa-leaf"></i>
                    </div>
                    <h4>100% Organik</h4>
                    <p>Semua produk kami dijamin 100% organik tanpa bahan kimia berbahaya</p>
                </div>

                <div class="card value-card fade-in delay-2">
                    <div class="value-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <h4>Sehat & Alami</h4>
                    <p>Menjaga kesehatan tubuh dengan bahan-bahan alami terbaik</p>
                </div>

                <div class="card value-card fade-in delay-3">
                    <div class="value-icon">
                        <i class="fas fa-recycle"></i>
                    </div>
                    <h4>Ramah Lingkungan</h4>
                    <p>Peduli terhadap kelestarian lingkungan dengan kemasan eco-friendly</p>
                </div>

                <div class="card value-card fade-in delay-4">
                    <div class="value-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h4>Komunitas</h4>
                    <p>Membangun komunitas sehat yang saling mendukung dan berbagi</p>
                </div>
            </div>
        </div>

        <div class="team-section">
            <div class="section-title fade-in">
                <h2>Tim Kami</h2>
                <p>Orang-orang berdedikasi di balik GreenLife</p>
            </div>

            <div class="team-members grid grid-3">
                <div class="card team-member fade-in delay-1">
                    <div class="member-photo">
                        <img loading="lazy" src="../../assets/images/avatars/michael-dam-mEZ3PoFGs_k-unsplash.webp" alt="Diana Sari">
                    </div>
                    <h4>Diana Sari</h4>
                    <p class="position">Founder & CEO</p>
                    <p class="bio">Pecinta lingkungan dengan passion di bidang produk organik dan sustainable living</p>
                </div>

                <div class="card team-member fade-in delay-2">
                    <div class="member-photo">
                        <img loading="lazy" src="../../assets/images/avatars/ali-morshedlou-WMD64tMfc4k-unsplash.webp" alt="Budi Pratama">
                    </div>
                    <h4>Budi Pratama</h4>
                    <p class="position">Head of Operations</p>
                    <p class="bio">Ahli dalam manajemen rantai pasok produk organik dan quality control</p>
                </div>

                <div class="card team-member fade-in delay-3">
                    <div class="member-photo">
                        <img loading="lazy" src="../../assets/images/avatars/christopher-campbell-rDEOVtE7vOs-unsplash.webp" alt="Maya Wijaya">
                    </div>
                    <h4>Maya Wijaya</h4>
                    <p class="position">Product Development</p>
                    <p class="bio">Spesialis pengembangan produk organik dan inovasi ramah lingkungan</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
defineOptions({
    name: 'About'
})

</script>

<style lang="scss" scoped>
@use "@/style.scss" as *;

.about {
    padding: 80px 0;
    background: linear-gradient(to bottom, $white, $light-bg);
}

.about-content {
    margin-bottom: 80px;
}

.about-text {
    h3 {
        color: $primary;
        margin-bottom: 15px;
        font-size: 1.5rem;

        &:not(:first-child) {
            margin-top: 30px;
        }
    }

    p {
        color: $light-text;
        line-height: 1.8;
        margin-bottom: 20px;
    }
}

.mission-list {
    list-style: none;
    margin-top: 20px;

    li {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        color: $text;

        i {
            color: $primary;
            font-size: 0.9rem;
        }
    }
}

.about-image {
    img {
        width: 100%;
        border-radius: 16px;
    }
}

.values-section {
    margin: 80px 0;
}

.value-card {
    padding: 40px 30px;
    text-align: center;
}

.value-icon {
    width: 80px;
    height: 80px;
    background: $primary-light;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: $primary;
    font-size: 2rem;
}

.value-card h4 {
    color: $text;
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.value-card p {
    color: $light-text;
    line-height: 1.6;
}

.team-section {
    margin-top: 80px;
}

.team-member {
    padding: 40px 30px;
    text-align: center;
}

.member-photo {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px;
    border: 4px solid $primary-light;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.team-member h4 {
    color: $text;
    margin-bottom: 8px;
    font-size: 1.3rem;
}

.position {
    color: $primary;
    font-weight: 600;
    margin-bottom: 15px;
}

.bio {
    color: $light-text;
    line-height: 1.6;
    font-size: 0.95rem;
}

@media (max-width: 768px) {
    .about-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}
</style>
