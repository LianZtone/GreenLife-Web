const AUTH_STATE_KEY = 'greenlife_auth'
const AUTH_USERS_KEY = 'greenlife_users'
const REMEMBERED_EMAIL_KEY = 'greenlife_remembered_email'
const LEGACY_USER_KEY = 'user'
const LEGACY_FLAG_KEY = 'isLoggedIn'
export const AUTH_CHANGE_EVENT = 'greenlife-auth-change'

const DEMO_USERS = [
  {
    id: 1,
    firstName: 'Diana',
    lastName: 'Sari',
    email: 'diana.sari@greenlife.test',
    phone: '+6281234567890',
    avatar: '',
    joinDate: '2023-01-15',
    password: 'Greenlife123!'
  },
  {
    id: 2,
    firstName: 'Admin',
    lastName: 'GreenLife',
    email: 'admin@greenlife.test',
    phone: '+6281234567891',
    avatar: '',
    joinDate: '2023-02-01',
    password: 'Admin123!'
  }
]

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readJSON(storage, key) {
  if (!storage) return null

  try {
    const raw = storage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeJSON(storage, key, value) {
  if (!storage) return
  storage.setItem(key, JSON.stringify(value))
}

function dispatchAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

export function getStoredAuthUser() {
  if (!canUseStorage()) return null

  const localUser = readJSON(window.localStorage, AUTH_STATE_KEY)
  if (localUser) return localUser

  const legacyIsLoggedIn = window.localStorage.getItem(LEGACY_FLAG_KEY) === 'true'
  if (!legacyIsLoggedIn) return null

  return readJSON(window.localStorage, LEGACY_USER_KEY)
}

export function isAuthenticated() {
  return Boolean(getStoredAuthUser())
}

export function getDemoAccounts() {
  return DEMO_USERS.map(({ password, ...account }) => account)
}

export function getDemoCredentials() {
  return DEMO_USERS.map(({ password, email, firstName, lastName }) => ({
    email,
    password,
    name: [firstName, lastName].filter(Boolean).join(' ').trim()
  }))
}

function ensureUsersSeeded() {
  if (!canUseStorage()) return

  const storedUsers = readJSON(window.localStorage, AUTH_USERS_KEY)
  if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
    writeJSON(window.localStorage, AUTH_USERS_KEY, DEMO_USERS)
  }
}

export function getRegisteredUsers() {
  if (!canUseStorage()) return DEMO_USERS

  ensureUsersSeeded()
  const users = readJSON(window.localStorage, AUTH_USERS_KEY)
  return Array.isArray(users) ? users : DEMO_USERS
}

export function findUserByCredentials(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  const normalizedPassword = String(password || '')

  return getRegisteredUsers().find((user) =>
    user.email.toLowerCase() === normalizedEmail && user.password === normalizedPassword
  ) || null
}

export function findUserByEmail(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  return getRegisteredUsers().find((user) => user.email.toLowerCase() === normalizedEmail) || null
}

export function registerUser(user) {
  if (!canUseStorage()) return user

  const users = getRegisteredUsers()
  const nextUsers = [...users, user]
  writeJSON(window.localStorage, AUTH_USERS_KEY, nextUsers)
  return user
}

export function getRememberedEmail() {
  if (!canUseStorage()) return ''
  return window.localStorage.getItem(REMEMBERED_EMAIL_KEY) || ''
}

export function setRememberedEmail(email) {
  if (!canUseStorage()) return

  const normalizedEmail = String(email || '').trim()
  if (normalizedEmail) {
    window.localStorage.setItem(REMEMBERED_EMAIL_KEY, normalizedEmail)
  } else {
    window.localStorage.removeItem(REMEMBERED_EMAIL_KEY)
  }
}

export function saveAuthUser(user, options = {}) {
  if (!canUseStorage()) return

  const safeUser = { ...user }
  delete safeUser.password

  writeJSON(window.localStorage, AUTH_STATE_KEY, safeUser)
  writeJSON(window.localStorage, LEGACY_USER_KEY, safeUser)
  window.localStorage.setItem(LEGACY_FLAG_KEY, 'true')
  if (options.rememberEmail) {
    setRememberedEmail(safeUser.email)
  } else {
    setRememberedEmail('')
  }
  dispatchAuthChange()
}

export function clearAuthUser() {
  if (!canUseStorage()) return

  window.localStorage.removeItem(AUTH_STATE_KEY)
  window.localStorage.removeItem(LEGACY_USER_KEY)
  window.localStorage.removeItem(LEGACY_FLAG_KEY)
  dispatchAuthChange()
}
