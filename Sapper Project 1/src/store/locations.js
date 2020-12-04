import { writable } from 'svelte/store';

const { subscribe, set, update } = writable([]);

const store = { subscribe };

store.setLocations = locations => set(locations);

store.addLocation = location => update(store => [location, ...store]);

store.editLocation = location => {
   update(store => {
      const index = store.findIndex(item => (item.id = location.id));
      const storeItem = { ...store[index], ...location }; // Overwrites the data that is spread with new data from location
      const storeItems = [...store];
      storeItems[index] = storeItem;
      return storeItems;
   });
};

store.deleteLocation = id => update(store => store.filter(item => item.id !== id));

store.toggleFavorite = id => {
   update(store => {
      return store.map(location => {
         if (location.id === id) {
            location.favorite = !location.favorite;
         }
         return location;
      });
   });
};

export default store;
