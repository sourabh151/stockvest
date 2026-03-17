import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store'
import { PersistStorage } from 'zustand/middleware'

const secureStorage: PersistStorage<any> = {
  getItem: async (name) => {
    try {
      const data = await getItemAsync(name);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error reading ${name} from secure storage:`, error);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await setItemAsync(name, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${name} to secure storage:`, error);
    }
  },
  removeItem: async (name) => {
    try {
      await deleteItemAsync(name);
    } catch (error) {
      console.error(`Error removing ${name} from secure storage:`, error);
    }
  }
}

export default secureStorage
