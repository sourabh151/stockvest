import secureStorage from '@/utils/secureStorage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserState = {
  email?: string;
  phone?: string;
  verified: boolean;
  // Actions
  setVerified: (verified: boolean) => void;
  setUserInfo: (info: { email?: string; phone?: string }) => void;
  resetUser: () => void;
}

const initialState = {
  email: undefined,
  phone: undefined,
  verified: false,
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setVerified: (verified) => set({ verified }),
      setUserInfo: (info) => set({ ...info }),
      resetUser: () => set({ ...initialState }),
    }),
    {
      name: "user-storage",
      storage: secureStorage,
    }
  )
)
