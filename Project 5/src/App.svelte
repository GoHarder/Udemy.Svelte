<script>
  // Svelte Imports
  import { tick } from "svelte";

  // Components
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  // Variables
  let products = [
    { id: "1", title: "title 1", price: 1 },
    { id: "2", title: "title 2", price: 2 },
    { id: "3", title: "title 3", price: 3 }
  ];

  let show = false;
  let topAgree = false;
  let text = "Example Text";

  // Events
  const processEvent = event => {
    console.log(event.detail);
  };

  const toggle = () => (show = !show);

  const transform = event => {
    if (event.key !== "Tab") {
      return;
    }
    event.preventDefault();

    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    const value = event.target.value;

    text =
      value.slice(0, start) +
      value.slice(start, end).toUpperCase() +
      value.slice(end);

    // tick is like after update but it can be used within a funciton
    // tick returns a promise so it will have to be handled with then
    tick().then(() => {
      event.target.selectionStart = start;
      event.target.selectionEnd = end;
    });
  };
</script>

{#each products as product}
  <Product {...product} on:add={processEvent} on:remove={processEvent} />
{/each}

<button on:click={toggle}>Show</button>

{#if show}
  <!-- let: gets variable from slot -->
  <Modal on:close={toggle} let:didAgree={topAgree}>
    <h1 slot="header">Slot</h1>
    <p>This is a slot</p>
    <button disabled={!topAgree} on:click={toggle} slot="footer">
      Confirm
    </button>
  </Modal>
{/if}

<textarea rows="5" bind:value={text} on:keydown={transform} />
