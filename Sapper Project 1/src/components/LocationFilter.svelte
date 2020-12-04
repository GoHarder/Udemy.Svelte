<script>
  // Svelte Import
  import { createEventDispatcher } from "svelte";

  // Svelte Variables
  const dispatch = createEventDispatcher();

  // Variables
  let setting = "All";

  // Events
  const toggle = event => {
    setting = event.target.innerHTML;
    dispatch("toggle", setting);
  };
</script>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  .active {
    background: #cf0056;
    border-color: #cf0056;
    color: white;
  }
</style>

<div>
  <button class:active={setting === 'All'} type="button" on:click={toggle}>
    All
  </button>
  <button
    class:active={setting === 'Favorites'}
    type="button"
    on:click={toggle}>
    Favorites
  </button>
</div>
