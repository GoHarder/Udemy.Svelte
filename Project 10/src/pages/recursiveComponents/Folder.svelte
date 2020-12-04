<script>
  export let dir = {};
  export let root = false;
  export let end = false;
  export let step = 0;

  const { name, content } = dir;
  const next = step + 1;

  let expand = root;

  const toggle = () => (expand = !expand);
</script>

<style>
  ul {
    list-style: none;
    padding-left: 0.75rem;
    /* padding-left: 0; */
    margin: 0;
  }

  #root {
    cursor: pointer;
  }
</style>

<li id="root" on:click={toggle}>
  {#if !root}
    {#if end}└{:else}├{/if}
  {/if}
  <!-- {step}  -->
  {name}
  {#if expand}▲{:else}▼{/if}
</li>

{#if expand}
  <ul>
    {#each content as item, i}
      <li>
        {#if item.hasOwnProperty('content')}
          <svelte:self dir={item} step={next} end={i === content.length - 1} />
        {:else}
          {#if i === content.length - 1}└{:else}├{/if}
          {item.name}
        {/if}
      </li>
    {:else}
      <li>└ empty</li>
    {/each}
  </ul>
{/if}
