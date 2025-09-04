import { create } from 'zustand'

const stored = JSON.parse(localStorage.getItem('auth') || 'null')

const useAuth = create((set) => ({
  user: stored?.user || null,
  token: stored?.token || null,
  setAuth: (payload) => {
    localStorage.setItem('auth', JSON.stringify(payload))
    set(payload)
  },
  logout: () => {
    localStorage.removeItem('auth')
    set({ user: null, token: null })
  }
}))

export default useAuth
