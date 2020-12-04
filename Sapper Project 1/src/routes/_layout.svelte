<script>
  // Components
  import Header from "../components/Header.svelte";

  export let segment;
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<main>
  <slot />
</main>

<Header />
