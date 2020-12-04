<script>
  import Product from "./Product.svelte";
  import CartItem from "./CartItem.svelte";

  let selected = 0;
  let selections = [Product, CartItem];

  //   $: console.log(selections[selected]);
  $: output = selections[selected];

  const select = () => {
    if (selected === 0) {
      selected = 1;
    } else {
      selected = 0;
    }
  };
</script>

<button on:click={select}>Select</button>

<!-- {#if selected === 0}
  <Product />
{:else}
  <CartItem />
{/if} -->

<svelte:component this={output} />
