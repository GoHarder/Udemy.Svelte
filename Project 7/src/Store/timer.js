import { readable } from 'svelte/store';

let count = 0;

export default readable(count, set => {
   const int = setInterval(() => {
      count++;
      set(count);
   }, 1000);

   return () => {
      clearInterval(int);
   };
});
