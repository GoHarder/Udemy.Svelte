<script>
  // Svelte Import
  import { createEventDispatcher } from "svelte";

  // Parameters
  export let id = "";
  export let title = "";
  export let price = 0;

  // Svelte Variables
  const dispatch = createEventDispatcher();

  // Events
  const add = () => {
    dispatch("add", { action: "add", title });
  };

  const remove = () => {
    dispatch("remove", { action: "remove", title });
  };
</script>

<article>
  <h1>{title}</h1>
  <h2>${price}</h2>
  <!-- on:click without={} forwards the event to the parent -->
  <button on:click={add}>Add</button>
  <button on:click={remove}>Delete</button>
</article>
