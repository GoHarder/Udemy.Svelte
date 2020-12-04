<script>
  // ◄ Svelte Imports ►
  import { onMount } from "svelte";

  // ◄ Stores ►
  import Store from "./store.js";

  // ◄ Variables ►
  //   let items = [];
  let input = "";
  let loading = false;

  // ► Used for await block
  //   let apiItems = fetch("https://svelte-class.firebaseio.com/items.json")
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error("res.ok returned falsy");
  //       }
  //       return res.json();
  //     })
  //     .then(res => {
  //       let output = [];

  //       for (const key in res) {
  //         if (res.hasOwnProperty(key)) {
  //           const item = { id: key, data: res[key] };
  //           //  items = [item, ...items];
  //           output = [item, ...output];
  //         }
  //       }
  //       return output;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  // ◄ Logs ►
  $: console.log();

  // ◄ Events ►
  const onAdd = () => {
    loading = true;

    fetch("https://svelte-class.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(input),
      header: { "Content-Type": "application/json" }
    })
      .then(res => {
        loading = false;
        if (!res.ok) {
          throw new Error("res.ok returned falsy");
        }
        return res.json();
      })
      .then(res => {
        const item = { id: res.name, data: input };
        loading = false;
      })
      .catch(err => {
        loading = false;
        console.log(err);
      });
    input = "";
  };

  // ◄ Lifecycle ►
  onMount(() => {
    loading = true;
    fetch("https://svelte-class.firebaseio.com/items.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("res.ok returned falsy");
        }
        return res.json();
      })
      .then(res => {
        let output = [];

        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const item = { id: key, data: res[key] };
            output = [item, ...output];
          }
        }
        Store.setData(output);
        loading = false;
      })
      .catch(err => {
        loading = false;
        console.log(err);
      });
  });
</script>

<label for="input1">Input Label</label>
<input id="input1" type="text" bind:value={input} />
<button on:click={onAdd}>Add</button>

{#if loading}
  <p>loading</p>
{:else}
  <ul>
    {#each $Store as item (item.id)}
      <li>{item.data}</li>
    {/each}
  </ul>
{/if}

<!-- ► Is not reactive and wont update -->
<!-- {#await apiItems}
  <p>loading</p>
{:then apiArray}
  <ul>
    {#each apiArray as item (item.id)}
      <li>{item.data}</li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await} -->
