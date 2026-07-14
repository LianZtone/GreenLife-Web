import Swal from 'sweetalert2'
import { authDialogCopy, authDialogHtml } from './authDialogContent'

const DEFAULT_CONFIRM_COLOR = '#4CAF50'

export function useAuthDialogs() {
  function showFieldError(message = authDialogCopy.requiredFields) {
    return Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonColor: '#f44336'
    })
  }

  function showSuccess(title, text, options = {}) {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: DEFAULT_CONFIRM_COLOR,
      ...options
    })
  }

  function showInfo(title, text) {
    return Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonColor: DEFAULT_CONFIRM_COLOR
    })
  }

  function showForgotPassword() {
    return Swal.fire({
      title: authDialogCopy.forgotPasswordTitle,
      html: authDialogHtml.forgotPassword,
      showCancelButton: true,
      confirmButtonText: authDialogCopy.forgotPasswordButton,
      cancelButtonText: 'Batal',
      confirmButtonColor: DEFAULT_CONFIRM_COLOR,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#forgot-email').value
        if (!email) Swal.showValidationMessage('Harap masukkan email')
        return { email }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        return showSuccess('Link Terkirim!', authDialogCopy.forgotPasswordSent)
      }
    })
  }

  function showTerms() {
    return Swal.fire({
      title: authDialogCopy.termsTitle,
      html: authDialogHtml.terms,
      confirmButtonText: 'Mengerti',
      confirmButtonColor: DEFAULT_CONFIRM_COLOR,
      width: 600
    })
  }

  function showPrivacy() {
    return Swal.fire({
      title: authDialogCopy.privacyTitle,
      html: authDialogHtml.privacy,
      confirmButtonText: 'Mengerti',
      confirmButtonColor: DEFAULT_CONFIRM_COLOR,
      width: 600
    })
  }

  function showProviderSoon(provider, action = 'login') {
    if (action === 'register') {
      return showInfo(
        authDialogCopy.registerWithProviderTitle(provider),
        authDialogCopy.registerWithProviderText(provider)
      )
    }

    return showInfo(
      authDialogCopy.loginWithProviderTitle(provider),
      authDialogCopy.loginWithProviderText(provider)
    )
  }

  function confirmLogout() {
    return Swal.fire({
      title: authDialogCopy.logoutConfirmTitle,
      text: authDialogCopy.logoutConfirmText,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal'
    })
  }

  function showLogoutSuccess() {
    return showSuccess(
      authDialogCopy.logoutSuccessTitle,
      authDialogCopy.logoutSuccessText,
      { timer: 1500 }
    )
  }

  return {
    showFieldError,
    showSuccess,
    showInfo,
    showForgotPassword,
    showTerms,
    showPrivacy,
    showProviderSoon,
    confirmLogout,
    showLogoutSuccess
  }
}
