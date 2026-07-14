<template>
    <section class="auth">
        <div class="container">
            <div class="auth-container">
                <!-- Left Side - Welcome Content -->
                <div class="auth-welcome fade-in">
                    <div class="welcome-content">
                        <div class="logo">
                            <i class="fas fa-leaf"></i>
                            <h1>GreenLife</h1>
                        </div>
                        <h2>Selamat Datang Kembali!</h2>
                        <p>Masuk ke akun Anda untuk melanjutkan perjalanan hidup sehat bersama komunitas GreenLife</p>

                        <div class="welcome-features">
                            <div class="feature-item">
                                <i class="fas fa-shopping-bag"></i>
                                <div>
                                    <h4>Belanja Produk Organik</h4>
                                    <p>Akses katalog produk organik terbaik</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-users"></i>
                                <div>
                                    <h4>Komunitas Sehat</h4>
                                    <p>Bergabung dengan komunitas pecinta gaya hidup sehat</p>
                                </div>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-gift"></i>
                                <div>
                                    <h4>Promo Eksklusif</h4>
                                    <p>Dapatkan penawaran khusus untuk member</p>
                                </div>
                            </div>
                        </div>

                        <div class="demo-card">
                            <h4>Akun Demo</h4>
                            <p>Gunakan salah satu akun berikut untuk mencoba alur login:</p>
                            <div class="demo-list">
                                <div v-for="account in demoCredentials" :key="account.email" class="demo-item">
                                    <strong>{{ account.name }}</strong>
                                    <span>{{ account.email }}</span>
                                    <code>{{ account.password }}</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side - Auth Forms -->
                <div class="auth-forms">
                    <LoginForm
                        v-if="activeForm === 'login'"
                        :login-form="loginForm"
                        :loading="loading"
                        :show-login-password="showLoginPassword"
                        @submit="handleLogin"
                        @toggle-login-password="showLoginPassword = !showLoginPassword"
                        @forgot-password="showForgotPassword"
                        @social-login="socialLogin"
                        @switch-to-register="activeForm = 'register'"
                    />

                    <RegisterForm
                        v-else
                        :register-form="registerForm"
                        :loading="loading"
                        :show-register-password="showRegisterPassword"
                        :show-confirm-password="showConfirmPassword"
                        @submit="handleRegister"
                        @toggle-register-password="showRegisterPassword = !showRegisterPassword"
                        @toggle-confirm-password="showConfirmPassword = !showConfirmPassword"
                        @show-terms="showTerms"
                        @show-privacy="showPrivacy"
                        @social-register="socialRegister"
                        @switch-to-login="activeForm = 'login'"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useAuthForm } from '@/composables/useAuthForm'
import LoginForm from './auth/LoginForm.vue'
import RegisterForm from './auth/RegisterForm.vue'

const {
    activeForm,
    loading,
    showLoginPassword,
    showRegisterPassword,
    showConfirmPassword,
    demoCredentials,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    socialLogin,
    socialRegister,
    showForgotPassword,
    showTerms,
    showPrivacy
} = useAuthForm()
</script>


<style lang="scss" scoped>
@use "@/style.scss" as *;

.auth {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 40px 0;
    background: linear-gradient(135deg, $primary-light 0%, $light-bg 100%);
}

.auth-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    max-width: 1200px;
    margin: 0 auto;
    background: $white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: $card-hover-shadow;

    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
}

.auth-welcome {
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    color: $white;
    padding: 60px 40px;
    display: flex;
    align-items: center;

    @media (max-width: 992px) {
        padding: 40px 20px;
    }
}

.welcome-content {
    .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;

        i {
            font-size: 2rem;
        }

        h1 {
            color: $white;
            margin: 0;
            font-size: 1.8rem;
        }
    }

    h2 {
        color: $white;
        margin-bottom: 15px;
        font-size: 2.2rem;
    }

    p {
        opacity: 0.9;
        margin-bottom: 40px;
        font-size: 1.1rem;
        line-height: 1.6;
    }
}

.welcome-features {
    .feature-item {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-bottom: 25px;

        i {
            font-size: 1.5rem;
            margin-top: 5px;
            opacity: 0.9;
        }

        h4 {
            color: $white;
            margin-bottom: 5px;
            font-size: 1.1rem;
        }

        p {
            margin: 0;
            opacity: 0.8;
            font-size: 0.9rem;
        }
    }
}

.demo-card {
    margin-top: 30px;
    padding: 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.16);
    backdrop-filter: blur(8px);

    h4 {
        color: $white;
        margin-bottom: 8px;
    }

    p {
        margin-bottom: 14px;
        font-size: 0.95rem;
    }
}

.demo-list {
    display: grid;
    gap: 10px;
}

.demo-item {
    display: grid;
    gap: 4px;
    padding: 12px 14px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.08);

    strong,
    span,
    code {
        color: $white;
    }

    span,
    code {
        font-size: 0.88rem;
        opacity: 0.92;
    }

    code {
        font-family: inherit;
        letter-spacing: 0.2px;
    }
}

.auth-forms {
    padding: 60px 40px;
    display: flex;
    align-items: center;

    @media (max-width: 992px) {
        padding: 40px 20px;
    }
}

@media (max-width: 768px) {
    .auth-container {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .auth-container {
        border-radius: 12px;
    }

    .auth-welcome {
        padding: 30px 20px;
    }

    .welcome-content {
        h2 {
            font-size: 1.8rem;
        }

        p {
            font-size: 1rem;
        }
    }

    .feature-item {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
}
</style>
