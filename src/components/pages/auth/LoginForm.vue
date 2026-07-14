<template>
    <div class="card auth-form login-form fade-in delay-1">
        <div class="form-header">
            <h2>Masuk ke Akun</h2>
            <p>Silakan masuk dengan akun Anda</p>
        </div>

        <form @submit.prevent="emit('submit')" class="auth-form-content">
            <div class="form-group">
                <label for="login-email">Email</label>
                <input type="email" id="login-email" v-model="loginForm.email"
                    placeholder="Masukkan alamat email" required>
            </div>

            <div class="form-group">
                <label for="login-password">Password</label>
                <div class="password-input">
                    <input :type="showLoginPassword ? 'text' : 'password'" id="login-password"
                        v-model="loginForm.password" placeholder="Masukkan password" required>
                    <button type="button" class="password-toggle"
                        @click="emit('toggle-login-password')">
                        <i :class="showLoginPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                </div>
            </div>

            <div class="form-options">
                <label class="checkbox-label login-checkbox">
                    <input type="checkbox" v-model="loginForm.remember">
                    <span class="checkmark"></span>
                    Ingat saya
                </label>
                <button type="button" class="forgot-password text-link" @click="emit('forgot-password')">
                    Lupa password?
                </button>
            </div>

            <AppButton
                type="submit"
                variant="accent"
                class="auth-submit"
                :loading="loading"
                :disabled="loading"
                icon="fas fa-sign-in-alt"
            >
                {{ loading ? 'Memproses...' : 'Masuk' }}
            </AppButton>

            <div class="auth-divider">
                <span>atau masuk dengan</span>
            </div>

            <div class="social-auth">
                <AppButton
                    type="button"
                    class="btn-social google"
                    icon="fab fa-google"
                    @click="emit('social-login', 'google')"
                >
                    Google
                </AppButton>
                <AppButton
                    type="button"
                    class="btn-social facebook"
                    icon="fab fa-facebook-f"
                    @click="emit('social-login', 'facebook')"
                >
                    Facebook
                </AppButton>
            </div>

            <div class="auth-switch">
                <p>Belum punya akun?
                    <button type="button" class="text-link" @click="emit('switch-to-register')">Daftar di sini</button>
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import AppButton from '@/components/button/AppButton.vue'

defineOptions({
    name: 'LoginForm'
})

defineProps({
    loginForm: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    showLoginPassword: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'submit',
    'toggle-login-password',
    'forgot-password',
    'social-login',
    'switch-to-register'
])
</script>

<style lang="scss" scoped>
@use "./auth-form.scss" as *;
@use "./login-checkbox.scss" as *;
</style>
