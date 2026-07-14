import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  findUserByCredentials,
  findUserByEmail,
  getDemoCredentials,
  getRememberedEmail,
  registerUser,
  saveAuthUser
} from '@/utils/auth'
import { authDialogCopy } from './authDialogContent'
import { useAuthDialogs } from './useAuthDialogs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email || ''))
}

export function useAuthForm() {
  const router = useRouter()
  const route = useRoute()
  const dialogs = useAuthDialogs()

  const activeForm = ref('login')
  const loading = ref(false)
  const showLoginPassword = ref(false)
  const showRegisterPassword = ref(false)
  const showConfirmPassword = ref(false)
  const demoCredentials = getDemoCredentials()

  const loginForm = reactive({
    email: '',
    password: '',
    remember: false
  })

  const registerForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: true
  })

  function getPostLoginRedirect() {
    const redirectTarget = route.query.redirect

    if (typeof redirectTarget === 'string' && redirectTarget.startsWith('/')) {
      return redirectTarget
    }

    return '/'
  }

  async function handleLogin() {
    if (!loginForm.email || !loginForm.password) {
      dialogs.showFieldError(authDialogCopy.requiredFields)
      return
    }

    loading.value = true

    try {
      await sleep(2000)

      if (!isValidEmail(loginForm.email)) {
        throw new Error(authDialogCopy.invalidEmail)
      }

      const user = findUserByCredentials(loginForm.email, loginForm.password)

      if (!user) {
        const accountExists = findUserByEmail(loginForm.email)
        throw new Error(accountExists ? 'Password salah untuk akun tersebut' : 'Akun tidak ditemukan')
      }

      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        joinDate: user.joinDate
      }

      saveAuthUser(userData, { rememberEmail: loginForm.remember })

      await dialogs.showSuccess(
        'Login Berhasil!',
        authDialogCopy.loginSuccess,
        { timer: 1500 }
      )

      router.replace(getPostLoginRedirect())
    } catch (error) {
      dialogs.showFieldError(error.message || authDialogCopy.loginFailed)
    } finally {
      loading.value = false
    }
  }

  async function handleRegister() {
    const f = registerForm

    if (!f.firstName || !f.lastName || !f.email || !f.phone || !f.password || !f.confirmPassword) {
      dialogs.showFieldError(authDialogCopy.requiredFields)
      return
    }

    if (f.password !== f.confirmPassword) {
      dialogs.showFieldError(authDialogCopy.passwordMismatch)
      return
    }

    if (f.password.length < 8) {
      dialogs.showFieldError(authDialogCopy.passwordTooShort)
      return
    }

    if (!f.agreeTerms) {
      dialogs.showFieldError(authDialogCopy.termsRequired)
      return
    }

    loading.value = true

    try {
      await sleep(2000)

      if (findUserByEmail(f.email)) {
        throw new Error(authDialogCopy.emailExists)
      }

      const userData = {
        id: Date.now(),
        firstName: f.firstName,
        lastName: f.lastName,
        email: f.email,
        phone: f.phone,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        joinDate: new Date().toISOString().split('T')[0],
        password: f.password
      }

      registerUser(userData)
      saveAuthUser(userData, { rememberEmail: true })

      await dialogs.showSuccess(
        'Pendaftaran Berhasil!',
        authDialogCopy.registerSuccess
      )

      router.replace(getPostLoginRedirect())
    } catch (error) {
      dialogs.showFieldError(error.message || authDialogCopy.registerFailed)
    } finally {
      loading.value = false
    }
  }

  function socialLogin(provider) {
    dialogs.showProviderSoon(provider, 'login')
  }

  function socialRegister(provider) {
    dialogs.showProviderSoon(provider, 'register')
  }

  function showForgotPassword() {
    dialogs.showForgotPassword()
  }

  function showTerms() {
    dialogs.showTerms()
  }

  function showPrivacy() {
    dialogs.showPrivacy()
  }

  onMounted(() => {
    const rememberedEmail = getRememberedEmail()
    loginForm.email = rememberedEmail
    loginForm.remember = Boolean(rememberedEmail)
  })

  return {
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
  }
}
