// Svelte Imports
import { writable } from 'svelte/store';

// Store Data
const { subscribe, set, update } = writable([]);

// Store Methods
// ► Container for methods
// ► Subscribe allows components to read the store
const store = { subscribe };

// ► Erases all store data and replaces it with new data
store.setData = dataArray => set(dataArray);

// ► Insert new data into an existing data structure
store.addData = dataItem => update(items => [...items, dataItem]);

// Export Store
export default store;
