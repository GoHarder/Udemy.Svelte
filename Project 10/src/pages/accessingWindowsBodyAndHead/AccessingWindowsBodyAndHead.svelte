<script>
  let yPos = 0;

  $: console.log(yPos);
</script>

<style>
  p {
    height: 100vh;
  }
</style>

<svelte:window bind:scrollY={yPos} />
<svelte:body />
<!-- ► App has a good example -->
<svelte:head />

<p>All of this is in the body head or window</p>
