<script>
  // Svelte Imports
  // import { onDestroy } from "svelte";

  // Stores
  import Cart from "../Store/cart.js";

  // Components
  import CartItem from "./CartItem.svelte";

  /**
   * Long form way of autosubscribing with $Cart in the HTML below

  // Variables
  let items;

   * This could be a method for a component to make an API call
  // Store
  const unsubscribe = Cart.subscribe(store => {
    items = store;
  });

  // Life Cycle
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
  */

  /**
   * DO NOT USE IF COMPONENT IS DESTROYED! THIS CAUSES MEMORY LEAKS! UNSUBSCRIBE STORES!

  Cart.subscribe(store => {
    items = store;
  });
  */
</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>
    <!-- {#each items as item (item.id)} -->
    {#each $Cart as item (item.id)}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
