<script>
  // Svelte Imports
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicIn } from "svelte/easing";
  import { fade, fly, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Spring from "./comp/Spring.svelte";

  const progress = tweened(0, {
    delay: 0,
    duration: 700,
    easing: cubicIn
  });

  setTimeout(() => {
    progress.set(0.5);
  }, 1500);

  // Variables
  let boxes = [];
  let fruit = "";
  let showParagraph = true;
  let id = 0;

  const addBox = () => {
    boxes = [{ id, fruit }, ...boxes];
    id++;
    fruit = "";
  };

  const discard = value => {
    boxes = boxes.filter(item => item !== value);
  };

  const toggle = () => {
    showParagraph = !showParagraph;
  };
</script>

<style>
  div {
    height: 10rem;
    width: 10rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    border-radius: 0.3125rem;
  }
</style>

<!-- <progress value={$progress} /> -->
<!-- <Spring /> -->

<button on:click={toggle}>Toggle</button>
{#if showParagraph}
  <p in:fade out:fly={{ x: 300 }}>Can you see me</p>
{/if}

<hr />

<!-- | Local sets it for each list item -->

<!-- on:introstart={() => console.log('intro start')}
      on:introend={() => console.log('intro end')}
      on:outrostart={() => console.log('outro start')}
      on:outroend={() => console.log('outro end')} -->

<input type="text" bind:value={fruit} />
<button on:click={addBox}>Add</button>
{#if showParagraph}
  {#each boxes as box (box.id)}
    <div
      transition:fly={{ key: box.id, easing: cubicIn, x: 300, y: -300 }}
      on:click={discard.bind(this, box)}
      animate:flip={{ duration: 300 }}>
      {box.fruit}
    </div>
  {/each}
{/if}
