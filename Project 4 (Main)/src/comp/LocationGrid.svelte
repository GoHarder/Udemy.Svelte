<script>
  // Svelte Import
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  // Components
  import LocationItem from "./LocationItem.svelte";
  import LocationFilter from "./LocationFilter.svelte";
  import Button from "./base/Button.svelte";

  // Properties
  export let locations = [];

  // Svelte Variables
  const dispatch = createEventDispatcher();

  // Variables
  let filter = false;

  // Reactive Variables
  $: filteredLocations = filter
    ? locations.filter(location => location.favorite)
    : locations;

  // Logs
  // $: console.log(filteredLocations);

  // Events
  const toggleFilter = event => {
    if (event.detail === "Favorites") {
      filter = true;
    } else {
      filter = false;
    }
  };

  const toggleEdit = () => {
    dispatch("toggleEdit");
  };
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    justify-items: center;
  }

  #location-controls {
    margin: 1rem 1rem 0;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: space-between;
  }

  /* #no-locations {
    color: red;
  } */

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="location-controls">
  <LocationFilter on:toggle={toggleFilter} />
  <Button on:click={toggleEdit}>Add Location</Button>
</section>

<section id="locations">
  {#each filteredLocations as location (location.id)}
    <div
      transition:scale={{ delay: 300, duration: 300 }}
      animate:flip={{ delay: 300, duration: 300 }}>
      <LocationItem {...location} on:edit on:showDetails />
    </div>
  {:else}
    <p id="no-locations">Nothing Available</p>
  {/each}
</section>
