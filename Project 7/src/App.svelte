<script>
  // Stores
  import Timer from "./Store/timer.js";

  // Components
  import Cart from "./Cart/Cart.svelte";
  import Products from "./Products/Products.svelte";
  import Button from "./UI/Button.svelte";

  // Variables
  let showCart = true;

  // const unsubscribe = Timer.subscribe(store => {
  //   console.log(store);
  // });

  // Events
  const toggleCart = () => (showCart = !showCart);
</script>

<Button on:click={toggleCart}>{showCart ? 'Hide' : 'Show'} Cart</Button>

{#if showCart}
  <Cart />
{/if}

<Products />
