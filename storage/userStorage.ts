import secureStorage from '@/utils/secureStorage'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export type User = {
  email?: string,
  phone?: string,
  verified: boolean
}
const UserStorage: = create<User>(() => {
  return persist(() => {
    return {

    }
  }, {
    name: "User",
    storage: secureStorage
  })
})
