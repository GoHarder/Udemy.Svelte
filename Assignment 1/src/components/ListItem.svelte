<script>
  // Properties
  export let input;

  // Computed Variables
  $: isRed = input.match(/[!]/);

  // Logs
  $: console.log(isRed);
</script>

<style>
  .red {
    color: red;
  }
</style>

<h1 class:red={isRed}>{input}</h1>
