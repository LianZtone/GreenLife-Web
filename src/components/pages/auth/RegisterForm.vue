<template>
    <div class="card auth-form register-form fade-in delay-1">
        <div class="form-header">
            <h2>Daftar Akun Baru</h2>
            <p>Bergabunglah dengan komunitas GreenLife</p>
        </div>

        <form @submit.prevent="emit('submit')" class="auth-form-content">
            <div class="form-grid grid grid-2">
                <div class="form-group">
                    <label for="register-firstname">Nama Depan</label>
                    <input type="text" id="register-firstname" v-model="registerForm.firstName"
                        placeholder="Nama depan" required>
                </div>
                <div class="form-group">
                    <label for="register-lastname">Nama Belakang</label>
                    <input type="text" id="register-lastname" v-model="registerForm.lastName"
                        placeholder="Nama belakang" required>
                </div>
            </div>

            <div class="form-group">
                <label for="register-email">Email</label>
                <input type="email" id="register-email" v-model="registerForm.email"
                    placeholder="Masukkan alamat email" required>
            </div>

            <div class="form-group">
                <label for="register-phone">Nomor Telepon</label>
                <input type="tel" id="register-phone" v-model="registerForm.phone"
                    placeholder="Contoh: 081234567890" required>
            </div>

            <div class="form-grid grid grid-2">
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <div class="password-input">
                        <input :type="showRegisterPassword ? 'text' : 'password'" id="register-password"
                            v-model="registerForm.password" placeholder="Buat password" required>
                        <button type="button" class="password-toggle"
                            @click="emit('toggle-register-password')">
                            <i :class="showRegisterPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="register-confirm-password">Konfirmasi Password</label>
                    <div class="password-input">
                        <input :type="showConfirmPassword ? 'text' : 'password'"
                            id="register-confirm-password" v-model="registerForm.confirmPassword"
                            placeholder="Ulangi password" required>
                        <button type="button" class="password-toggle"
                            @click="emit('toggle-confirm-password')">
                            <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="checkbox-label register-checkbox register-terms-checkbox">
                    <input type="checkbox" v-model="registerForm.agreeTerms" required>
                    <span class="checkmark"></span>
                    <span class="checkbox-content">
                        Saya setuju dengan
                        <button type="button" class="text-link inline-link" @click="emit('show-terms')">Syarat & Ketentuan</button>
                        dan
                        <button type="button" class="text-link inline-link" @click="emit('show-privacy')">Kebijakan Privasi</button>
                    </span>
                </label>
            </div>

            <div class="form-group">
                <label class="checkbox-label register-checkbox register-newsletter-checkbox">
                    <input type="checkbox" v-model="registerForm.newsletter">
                    <span class="checkmark"></span>
                    <span class="checkbox-content">
                        Saya ingin menerima newsletter dan promo dari GreenLife
                    </span>
                </label>
            </div>

            <AppButton
                type="submit"
                variant="accent"
                class="auth-submit"
                :loading="loading"
                :disabled="loading"
                icon="fas fa-user-plus"
            >
                {{ loading ? 'Mendaftarkan...' : 'Daftar Sekarang' }}
            </AppButton>

            <div class="auth-divider">
                <span>atau daftar dengan</span>
            </div>

            <div class="social-auth">
                <AppButton
                    type="button"
                    class="btn-social google"
                    icon="fab fa-google"
                    @click="emit('social-register', 'google')"
                >
                    Google
                </AppButton>
                <AppButton
                    type="button"
                    class="btn-social facebook"
                    icon="fab fa-facebook-f"
                    @click="emit('social-register', 'facebook')"
                >
                    Facebook
                </AppButton>
            </div>

            <div class="auth-switch">
                <p>Sudah punya akun?
                    <button type="button" class="text-link" @click="emit('switch-to-login')">Masuk di sini</button>
                </p>
            </div>
        </form>
    </div>
</template>

<script setup>
import AppButton from '@/components/button/AppButton.vue'

defineOptions({
    name: 'RegisterForm'
})

defineProps({
    registerForm: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    showRegisterPassword: {
        type: Boolean,
        default: false
    },
    showConfirmPassword: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits([
    'submit',
    'toggle-register-password',
    'toggle-confirm-password',
    'show-terms',
    'show-privacy',
    'social-register',
    'switch-to-login'
])
</script>

<style lang="scss" scoped>
@use "./auth-form.scss" as *;
@use "./register-checkbox.scss" as *;
</style>
