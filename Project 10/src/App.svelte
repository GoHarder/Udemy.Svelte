<script>
  import DynamicComponents from "./pages/dynamicComponents/DynamicComponents.svelte";
  import RecursiveComponents from "./pages/recursiveComponents/RecursiveComponents.svelte";
  import AccessingWindowsBodyAndHead from "./pages/accessingWindowsBodyAndHead/AccessingWindowsBodyAndHead.svelte";
  import CrossComponentScripts from "./pages/cross-componentScripts/Cross-ComponentScripts.svelte";

  const pages = [
    { title: "Dynamic Components", component: DynamicComponents },
    { title: "Recursive Components", component: RecursiveComponents },
    {
      title: "Accessing Windows, Body & Head",
      component: AccessingWindowsBodyAndHead
    },
    { title: "Cross-ComponentScripts", component: CrossComponentScripts }
  ];

  let selected = 1;

  $: component = pages[selected].component;
  $: title = pages[selected].title;
  // $: console.log(selected);
</script>

<svelte:head>
  <title>Svelte app - {title}</title>
</svelte:head>

<select bind:value={selected}>
  {#each pages as page, i}
    <option value={i}>{page.title}</option>
  {/each}
</select>

<hr />

<svelte:component this={component} />
