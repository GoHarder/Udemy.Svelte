<script>
  // ◄ Stores ►
  import Locations from "./store/locations.js";

  // ◄ Components ►
  import Header from "./comp/Header.svelte";
  import LocationGrid from "./comp/LocationGrid.svelte";
  import EditLocation from "./comp/EditLocation.svelte";
  import LocationDetail from "./comp/LocationDetail.svelte";
  import LoadingSpinner from "./comp/base/LoadingSpinner.svelte";
  import Error from "./comp/base/Error.svelte";
  import TextInput from "./comp/base/TextInput.svelte";
  import Button from "./comp/base/Button.svelte";

  // ◄ Variables ►
  let showEdit = false;
  let id = "";
  let page = "overview";
  let pageData = {};
  let loading = true;
  let errorMessage = "";

  // https://svelte-class.firebaseio.com/locations.json
  fetch("https://svelte-class.firebaseio.com/locations.json")
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

      // ► Test for loading spinner
      // setTimeout(() => {
      //   Locations.setLocations(output);
      //   loading = false;
      // }, 1000 * 60);

      Locations.setLocations(output);
      loading = false;
    })
    .catch(error => {
      errorMessage = error;
      loading = false;
      // console.log(error);
    });

  // ◄ Logs ►
  // ► Code to peek at the store comment out when not in use
  // let storeData = {};
  // Locations.subscribe(store => (storeData = store));
  // $: console.log(storeData);

  // ◄ Events ►
  const toggleEdit = () => {
    if (errorMessage === "") {
      showEdit = !showEdit;
    }

    id = id ? "" : id;
    errorMessage = errorMessage ? "" : errorMessage;
  };

  const showDetails = event => {
    page = "details";
    // pageData.id = event.detail;
    id = event.detail;
  };

  const editLocation = event => {
    showEdit = true;
    id = event.detail;
  };

  const closeDetails = () => {
    page = "overview";
    // pageData = {};
    id = "";
  };
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if errorMessage}
  <Error message={errorMessage} on:toggleEdit={toggleEdit} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if showEdit}
      <EditLocation {id} on:toggleEdit={toggleEdit} />
    {/if}

    {#if loading}
      <LoadingSpinner />
    {:else}
      <LocationGrid
        locations={$Locations}
        on:showDetails={showDetails}
        on:edit={editLocation}
        on:toggleEdit={toggleEdit} />
    {/if}
  {:else}
    <LocationDetail {id} on:close={closeDetails} />
  {/if}
</main>
