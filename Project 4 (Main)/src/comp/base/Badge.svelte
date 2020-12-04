<script>
  // Svelte Imports
  import { scale } from "svelte/transition";
</script>

<style>
  span {
    display: inline-block;
    margin: 0 0.25rem;
    border-radius: 3px;
    border: 1px solid #1565c0;
    background: #1565c0;
    color: white;
    padding: 0 0.5rem;
    font-family: "Lato", sans-serif;
    font-size: 0.8rem;
  }
</style>

<span transition:scale={{ duration: 200 }}>
  <slot />
</span>
