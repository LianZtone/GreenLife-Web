const AUTH_STATE_KEY = 'greenlife_auth'
const LEGACY_USER_KEY = 'user'
const LEGACY_FLAG_KEY = 'isLoggedIn'
export const AUTH_CHANGE_EVENT = 'greenlife-auth-change'

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

export function saveAuthUser(user) {
  if (!canUseStorage()) return

  writeJSON(window.localStorage, AUTH_STATE_KEY, user)
  writeJSON(window.localStorage, LEGACY_USER_KEY, user)
  window.localStorage.setItem(LEGACY_FLAG_KEY, 'true')
  dispatchAuthChange()
}

export function clearAuthUser() {
  if (!canUseStorage()) return

  window.localStorage.removeItem(AUTH_STATE_KEY)
  window.localStorage.removeItem(LEGACY_USER_KEY)
  window.localStorage.removeItem(LEGACY_FLAG_KEY)
  dispatchAuthChange()
}
