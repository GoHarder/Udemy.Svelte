<script>
  // Properties
  export let value = "";
  export let type = "text";

  // This syntax is needed to run the function from outside
  export function empty() {
    value = "";
  }
</script>

<!-- Currently not supported -->
<!-- <input type={type} bind:value /> -->

<input type="text" bind:value />
