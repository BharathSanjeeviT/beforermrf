import { create } from "zustand"

interface SessionStore {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

const isClient = typeof window !== 'undefined';

const fetchTokenFromLocalStorage = () => {
  if (isClient) {
    return localStorage.getItem("token")
  } else {
    return null;
  }
}
const setTokenToLocalStorage = (newToken: string) => {
  if (isClient) {
    localStorage.setItem("token", newToken)
  }
  return;
}
const removeTokenFromLocalStorage = () => {
  if (isClient) {
    localStorage.removeItem('token')
  }
  return;
}

export const useSession = create<SessionStore>((set) => ({
  token: fetchTokenFromLocalStorage(),
  signIn: (token) => {
    setTokenToLocalStorage(token)
    set({ token })
    window.location.assign('/')
  },
  signOut: () => {
    removeTokenFromLocalStorage()
    window.location.reload()
  }
}))

