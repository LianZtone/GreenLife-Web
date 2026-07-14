export const authDialogCopy = {
  requiredFields: 'Harap isi semua field yang diperlukan',
  invalidEmail: 'Format email tidak valid',
  loginSuccess: 'Selamat datang kembali di GreenLife!',
  loginFailed: 'Email atau password salah. Silakan coba lagi.',
  registerSuccess: 'Selamat bergabung dengan komunitas GreenLife!',
  registerFailed: 'Terjadi kesalahan. Silakan coba lagi.',
  passwordMismatch: 'Password dan konfirmasi password tidak cocok',
  passwordTooShort: 'Password minimal 8 karakter',
  termsRequired: 'Anda harus menyetujui Syarat & Ketentuan',
  emailExists: 'Email sudah terdaftar, silakan gunakan email lain',
  forgotPasswordTitle: 'Lupa Password?',
  forgotPasswordPrompt: 'Masukkan email Anda untuk mereset password:',
  forgotPasswordButton: 'Kirim Link Reset',
  forgotPasswordSent: 'Kami telah mengirim link reset password ke email Anda',
  loginWithProviderTitle: (provider) => `Login dengan ${provider}`,
  loginWithProviderText: (provider) => `Fitur login dengan ${provider} akan segera tersedia`,
  registerWithProviderTitle: (provider) => `Daftar dengan ${provider}`,
  registerWithProviderText: (provider) => `Fitur pendaftaran dengan ${provider} akan segera tersedia`,
  logoutConfirmTitle: 'Konfirmasi Keluar',
  logoutConfirmText: 'Apakah Anda yakin ingin keluar dari akun?',
  logoutSuccessTitle: 'Berhasil Keluar!',
  logoutSuccessText: 'Anda telah berhasil keluar dari akun',
  termsTitle: 'Syarat & Ketentuan',
  privacyTitle: 'Kebijakan Privasi'
}

export const authDialogHtml = {
  forgotPassword: `
    <div style="text-align: left;">
      <p>Masukkan email Anda untuk mereset password:</p>
      <input type="email" id="forgot-email" class="swal2-input" placeholder="Email Anda">
    </div>
  `,
  terms: `
    <div style="text-align: left; max-height: 400px; overflow-y: auto;">
      <h4>1. Ketentuan Umum</h4>
      <p>Dengan mendaftar dan menggunakan layanan GreenLife, Anda setuju untuk mematuhi semua syarat dan ketentuan yang berlaku.</p>
      <h4>2. Akun Pengguna</h4>
      <p>Anda bertanggung jawab penuh atas kerahasiaan informasi akun dan password Anda.</p>
      <h4>3. Penggunaan Layanan</h4>
      <p>Layanan GreenLife hanya boleh digunakan untuk tujuan yang sah dan sesuai dengan peraturan yang berlaku.</p>
      <h4>4. Pembatalan Akun</h4>
      <p>Kami berhak membatalkan akun yang melanggar syarat dan ketentuan tanpa pemberitahuan sebelumnya.</p>
    </div>
  `,
  privacy: `
    <div style="text-align: left; max-height: 400px; overflow-y: auto;">
      <h4>1. Pengumpulan Data</h4>
      <p>Kami mengumpulkan informasi yang diperlukan untuk memberikan layanan terbaik kepada Anda.</p>
      <h4>2. Penggunaan Data</h4>
      <p>Data Anda digunakan untuk keperluan layanan, personalisasi, dan komunikasi marketing.</p>
      <h4>3. Perlindungan Data</h4>
      <p>Kami melindungi data pribadi Anda dengan sistem keamanan yang terenkripsi.</p>
      <h4>4. Hak Pengguna</h4>
      <p>Anda memiliki hak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda.</p>
    </div>
  `
}
