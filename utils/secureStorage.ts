import { deleteItemAsync, setItemAsync, getItemAsync } from 'expo-secure-store'
import { PersistStorage } from 'zustand/middleware'

/**
 * Custom SecureStore adapter for Zustand 5.
 * Note: expo-secure-store has a 2048-byte limit per item on iOS.
 * Only use this for small strings or simple objects like tokens and user flags.
 */
const secureStorage: PersistStorage<any> = {
  getItem: async (name) => {
    try {
      const data = await getItemAsync(name);
      // Return null if no data found (Zustand 5 expectation)
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
