<script>
  // Properties
  export let value = 1;

  // Events
  const updateValue = event => {
    //  console.log(event.target.innerHTML);
    value = event.target.innerHTML;
  };
</script>

<button disabled={value === 'Option 1'} on:click={updateValue}>Option 1</button>
<button disabled={value === 'Option 2'} on:click={updateValue}>Option 2</button>
