<script>
  // Components
  import CustomInput from "./comp/base/CustomInput.svelte";
  import Toggle from "./comp/base/Toggle.svelte";

  // Variables
  let value01 = "value";
  let value2 = "value";
  let value3 = 0;
  let value4 = false;
  let value5 = "Blue";
  let value6 = ["Blue"];
  let value7 = "Blue";
  let value8;
  let value9;

  // Events
  const setValue = event => (value01 = event.target.value);

  const saveData = event => {
    // console.log(document.querySelector("#custom-text-1").value);
    // Same code as above but uses bind:this={value8} on element
    // console.log(value8.value);
    // console.dir(value8);
    value9.empty();
  };

  // Logs
  // $: console.log("value 1 >", value01);
  // $: console.log("value 2 >", value2);
  // $: console.log("value 3 >", value3);
  // $: console.log("value 4 >", value4);
  // $: console.log("value 5 >", value5);
  // $: console.log("value 6 >", value6);
  // $: console.log("value 7 >", value7);
  // $: console.log("value 8 >", value8);
  $: console.log("value 9 >", value9);
</script>

<style>
  main {
    margin: 1rem;
  }

  .input-wrap {
    margin: 1rem 0;
  }
</style>

<main>
  <h1>Bindings & Forms</h1>

  <!-- Seperate binding -->
  <!-- <input type="text" value={value01} on:input={setValue} /> -->

  <!-- Two way binding -->
  <!-- <input type="text" bind:value={value01} /> -->

  <div class="input-wrap">
    <CustomInput bind:value={value01} bind:this={value9} />

    <Toggle bind:value={value2} />
  </div>

  <div class="input-wrap">
    <input type="number" bind:value={value3} />

    <label for="check">Agree</label>
    <input id="check" type="checkbox" bind:checked={value4} />
  </div>

  <div class="input-wrap">
    <label for="radio1">Red</label>
    <input
      id="radio1"
      type="radio"
      name="color"
      value="Red"
      bind:group={value5} />
    <label for="radio2">Blue</label>
    <input
      id="radio2"
      type="radio"
      name="color"
      value="Blue"
      bind:group={value5} />
    <label for="radio3">Yellow</label>
    <input
      id="radio3"
      type="radio"
      name="color"
      value="Yellow"
      bind:group={value5} />
  </div>

  <div class="input-wrap">
    <label for="checkbox1">Red</label>
    <input
      id="checkbox1"
      type="checkbox"
      name="color"
      value="Red"
      bind:group={value6} />
    <label for="checkbox2">Blue</label>
    <input
      id="checkbox2"
      type="checkbox"
      name="color"
      value="Blue"
      bind:group={value6} />
    <label for="checkbox3">Yellow</label>
    <input
      id="checkbox3"
      type="checkbox"
      name="color"
      value="Yellow"
      bind:group={value6} />
  </div>

  <div class="input-wrap">
    <select bind:value={value7}>
      <option value="Red">Red</option>
      <option value="Blue">Blue</option>
      <option value="Yellow">Yellow</option>
    </select>
  </div>

  <div class="input-wrap">
    <input type="text" id="custom-text-1" bind:this={value8} />
    <button on:click={saveData}>Save</button>
  </div>
</main>

<!-- validate.js can be used -->
