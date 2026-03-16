import { User } from '@/storage/userStorage';
import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store'
import { PersistStorage } from 'zustand/middleware'

const secureStorage: PersistStorage<User> = {
  getItem: async (name) => {
    const data = await getItemAsync(name);
    if (data) {
      return JSON.parse(data)
    }
  },
  setItem: async (name, value) => {
    return await setItemAsync(name, JSON.stringify(value))
  },
  removeItem: async (name) => {
    return await deleteItemAsync(name)
  }
}

export default secureStorage
