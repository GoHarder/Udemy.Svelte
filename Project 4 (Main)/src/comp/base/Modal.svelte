<script>
  // Svelte Imports
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  // Components
  import Button from "./Button.svelte";

  // Properties
  export let title = "";

  // Svelte Variables
  const dispatch = createEventDispatcher();

  // Dispatches
  const toggleEdit = () => {
    dispatch("toggleEdit");
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
    overflow-x: hidden;
  }

  h1 {
    padding: 1rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: "Roboto Slab", sans-serif;
  }

  .content {
    padding: 1rem;
  }

  footer {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
</style>

<div
  class="modal-backdrop"
  on:click={toggleEdit}
  transition:fade={{ duration: 200 }} />

<div class="modal" transition:fly={{ duration: 300, y: 300 }}>
  {#if title}
    <h1>{title}</h1>
  {/if}

  <div class="content">
    <slot />
  </div>

  <footer>
    <slot name="footer">
      <Button on:click={toggleEdit}>Close</Button>
    </slot>
  </footer>
</div>
