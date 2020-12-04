<script context="module">
  // Preload
  export function preload(page) {
    return this.fetch("https://svelte-class.firebaseio.com/locations.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("response.ok is falsy");
        }
        return response.json();
      })
      .then(response => {
        let output = [];

        for (const key in response) {
          const item = response[key];
          item.id = key;
          output = [item, ...output];
        }

        return { fetchedLocations: output };
      })
      .catch(error => {
        this.error(500, "Internal Server Error");
      });
  }
</script>

<script>
  // Svelte Import
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  // Stores
  import Locations from "../store/locations.js";

  // Components
  import LocationItem from "../components/LocationItem.svelte";
  import LocationFilter from "../components/LocationFilter.svelte";
  import EditLocation from "../components/EditLocation.svelte";
  import Button from "../components/base/Button.svelte";
  import LoadingSpinner from "../components/base/LoadingSpinner.svelte";

  // Properties
  // export let locations = [];

  export let fetchedLocations;

  // Variables
  let locations = [];
  let filter = false;
  let showEdit = false;
  let loading = false;
  let id;
  let unsubscribe;

  // Reactive Variables
  // $: filteredLocations = filter
  //   ? locations.filter(location => location.favorite)
  //   : locations;

  $: filteredLocations = filter
    ? fetchedLocations.filter(location => location.favorite)
    : fetchedLocations;

  // Logs
  // $: console.log(fetchedLocations);

  // Events
  const toggleFilter = event => {
    if (event.detail === "Favorites") {
      filter = true;
    } else {
      filter = false;
    }
  };

  const editLocation = event => {
    showEdit = true;
    id = event.detail;
  };

  const toggleEdit = () => {
    id = "";
    showEdit = !showEdit;
  };

  // Lifecycle
  onMount(() => {
    Locations.setLocations(fetchedLocations);
    // unsubscribe = Locations.subscribe(store => (locations = store));
    unsubscribe = Locations.subscribe(store => (fetchedLocations = store));
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
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

<svelte:head>
  <title>All Locations</title>
</svelte:head>

{#if showEdit}
  <EditLocation {id} on:toggleEdit={toggleEdit} />
{/if}

<section id="location-controls">
  <LocationFilter on:toggle={toggleFilter} />
  <Button on:click={toggleEdit}>Add Location</Button>
</section>

{#if loading}
  <LoadingSpinner />
{:else}
  <section id="locations">
    {#each filteredLocations as location (location.id)}
      <div
        transition:scale={{ delay: 300, duration: 300 }}
        animate:flip={{ delay: 300, duration: 300 }}>
        <LocationItem {...location} on:edit={editLocation} on:showDetails />
      </div>
    {:else}
      <p id="no-locations">Nothing Available</p>
    {/each}
  </section>
{/if}
