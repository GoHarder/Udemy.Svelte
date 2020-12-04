<script>
  // Stores
  import Locations from "../store/locations.js";

  // Svelte Import
  import { createEventDispatcher, onDestroy } from "svelte";

  // Components
  import Button from "./base/Button.svelte";

  // Properties
  export let id;

  // Svelte Variables
  const dispatch = createEventDispatcher();

  // Variables
  let storeData;

  // Subscriptions
  const unsubscribe = Locations.subscribe(store => {
    storeData = store.find(item => item.id === id);
  });

  // Events
  const close = () => dispatch("close");

  // Life Cycle
  onDestroy(() => {
    unsubscribe();
  });
</script>

<style>
  section {
    margin-top: 4rem;
  }

  .image {
    width: 100%;
    height: 25rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image {
    background: #e7e7e7;
  }

  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }

  h1 {
    font-size: 2rem;
    font-family: "Roboto Slab", sans-serif;
    margin: 0.5rem 0;
  }

  h2 {
    font-size: 1.25rem;
    color: #6b6b6b;
  }

  p {
    font-size: 1.5rem;
  }
</style>

<section>
  <div class="image">
    <img src={storeData.imageUrl} alt={storeData.title} />
  </div>

  <div class="content">
    <h1>{storeData.title}</h1>
    <h2>{storeData.subtitle} - {storeData.address}</h2>
    <p>{storeData.description}</p>
    <Button href="mailto:{storeData.contactEmail}">Contact</Button>
    <Button mode={'outline'} on:click={close}>Close</Button>
  </div>
</section>
