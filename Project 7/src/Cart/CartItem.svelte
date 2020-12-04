<script>
  // Stores
  import Cart from "../Store/cart.js";
  import Inventory from "../Store/inventory.js";

  // Components
  import Button from "../UI/Button.svelte";

  // Parameters
  export let title;
  export let price;
  export let id;

  // Variables
  let showDescription = false;
  let description = "Not Available";

  // Events
  const displayDescription = () => {
    showDescription = !showDescription;

    const unsubscribe = Inventory.subscribe(store => {
      let search = store.find(item => item.id === id);
      if (search) {
        description = search.description;
      }
    });
    unsubscribe();
  };

  // For regular store
  // const removeFromCart = () => {
  //   Cart.update(store => {
  //     return store.filter(item => item.id !== id);
  //   });
  // };

  // For custom store
  const removeFromCart = () => Cart.removeItem(id);
</script>

<style>
  li {
    margin: 1rem 0;
    border-radius: 5px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 1rem;
  }

  h1,
  h2 {
    font-size: 1rem;
    margin: 0;
  }

  h2 {
    color: #494949;
    margin-bottom: 1rem;
  }
</style>

<li>
  <h1>{title}</h1>
  <h2>{price}</h2>
  <Button mode="outline" on:click={displayDescription}>
    {showDescription ? 'Hide Description' : 'Show Description'}
  </Button>
  <Button on:click={removeFromCart}>Remove from Cart</Button>
  {#if showDescription}
    <p>{description}</p>
  {/if}
</li>
