import { useState, useEffect } from 'react';
import { userStorage } from '../utils/localStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const storedFavorites = userStorage.getFavorites();
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (id: number) => {
    const newFavorites = [...favorites, id];
    setFavorites(newFavorites);
    userStorage.setFavorites(newFavorites);
  };

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter(fav => fav !== id);
    setFavorites(newFavorites);
    userStorage.setFavorites(newFavorites);
  };

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites(id);
    }
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const clearFavorites = () => {
    setFavorites([]);
    userStorage.setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
};