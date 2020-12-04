import { writable } from 'svelte/store';

// Comment out for custom store
// export default writable([
//    {
//       id: 'sp1',
//       title: 'Test',
//       price: 9.99
//    },
//    {
//       id: 'sp2',
//       title: 'Test',
//       price: 9.99
//    }
// ]);

// Custom store with custom methods
function customStore() {
   const { subscribe, set, update } = writable([
      {
         id: 'sp1',
         title: 'Test',
         price: 9.99
      },
      {
         id: 'sp2',
         title: 'Test',
         price: 9.99
      }
   ]);

   return {
      subscribe,
      addItem: item => update(store => [...store, item]),
      removeItem: id => update(store => store.filter(item => item.id !== id))
   };
}

export default customStore();
