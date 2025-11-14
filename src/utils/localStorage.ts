export const storage = {
  
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },

  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};

export const STORAGE_KEYS = {
  USER: 'edurent_user',
  FAVORITES: 'edurent_favorites',
  RECENT_SEARCHES: 'edurent_recent_searches',
  SETTINGS: 'edurent_settings',
  CART: 'edurent_cart',
  VIEWED_ITEMS: 'edurent_viewed_items'
} as const;

export const userStorage = {
  getUser: () => storage.get(STORAGE_KEYS.USER),
  setUser: (user: any) => storage.set(STORAGE_KEYS.USER, user),
  removeUser: () => storage.remove(STORAGE_KEYS.USER),
  
  getFavorites: (): number[] => storage.get(STORAGE_KEYS.FAVORITES) || [],
  setFavorites: (favorites: number[]) => storage.set(STORAGE_KEYS.FAVORITES, favorites),
  addToFavorites: (id: number) => {
    const favorites = userStorage.getFavorites();
    if (!favorites.includes(id)) {
      userStorage.setFavorites([...favorites, id]);
    }
  },
  removeFromFavorites: (id: number) => {
    const favorites = userStorage.getFavorites();
    userStorage.setFavorites(favorites.filter(fav => fav !== id));
  },
  
  getRecentSearches: (): string[] => storage.get(STORAGE_KEYS.RECENT_SEARCHES) || [],
  addRecentSearch: (query: string) => {
    const searches = userStorage.getRecentSearches();
    const filtered = searches.filter(s => s !== query);
    const updated = [query, ...filtered].slice(0, 10); 
    storage.set(STORAGE_KEYS.RECENT_SEARCHES, updated);
  },
  
  getViewedItems: (): number[] => storage.get(STORAGE_KEYS.VIEWED_ITEMS) || [],
  addViewedItem: (id: number) => {
    const viewed = userStorage.getViewedItems();
    const filtered = viewed.filter(v => v !== id);
    const updated = [id, ...filtered].slice(0, 20); 
    storage.set(STORAGE_KEYS.VIEWED_ITEMS, updated);
  }
};


export const settingsStorage = {
  getSettings: () => storage.get(STORAGE_KEYS.SETTINGS) || {
    language: 'ru',
    currency: 'KZT',
    notifications: true,
    theme: 'light'
  },
  
  updateSettings: (newSettings: Partial<any>) => {
    const currentSettings = settingsStorage.getSettings();
    storage.set(STORAGE_KEYS.SETTINGS, { ...currentSettings, ...newSettings });
  }
};