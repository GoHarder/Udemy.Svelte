<script>
  // Svelte Imports
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate
  } from "svelte";

  // Svelte Variables
  const dispatch = createEventDispatcher();

  // Variables
  let agree = false;
  let autoScroll = false;

  // Events
  const toggleAgree = () => {
    agree = !agree;
  };

  // Dispatches
  const close = () => {
    dispatch("close");
  };

  // This will run first
  console.log("Normal Execution");

  // Life Cycle Hooks
  onMount(() => {
    // Used to get data from an api
    console.log("On Mount Execution");
  });

  // used for non svelte functions
  beforeUpdate(() => {
    console.log("Before Update Execution");
    autoScroll = agree;
  });

  // used for non svelte functions
  afterUpdate(() => {
    console.log("After Update Execution");
    if (autoScroll) {
      const modal = document.querySelector(".modal");
      modal.scrollTo(0, modal.scrollHeight);
    }
  });

  onDestroy(() => {
    console.log("On Destory Execution");
  });
</script>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 15vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }

  header {
    border-bottom: 1px solid #ccc;
  }
</style>

<div class="backdrop" on:click={close} />

<div class="modal">
  <header>
    <slot name="header" />
  </header>

  <div class="content">
    <slot />
  </div>

  <div class="disclaimer">
    <p>Click this button to agree</p>
    <button on:click={toggleAgree}>Agree</button>
  </div>

  <footer>
    <!-- didAgree is passed to the parent if a button is in the slot -->
    <slot name="footer" didAgree={agree}>
      <!-- if nothing is provided in slot this is used -->
      <button disabled={!agree} on:click={close}>Close</button>
    </slot>
  </footer>
</div>
