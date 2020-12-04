<script context="module">
  // Preload
  export function preload(page) {
    const id = page.params.id;

    return this.fetch(
      `https://svelte-class.firebaseio.com/locations/${id}.json`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error("response.ok is falsy");
        }
        return response.json();
      })
      .then(response => {
        return { data: { id, ...response } };
      })
      .catch(error => {
        this.error(500, "Internal Server Error");
      });
  }
</script>

<script>
  // Stores
  // import Locations from "../store/locations.js";

  // Svelte Import
  // import { createEventDispatcher, onDestroy } from "svelte";

  // Components
  import Button from "../components/base/Button.svelte";

  // Properties
  // export let id;
  export let data;

  // Svelte Variables
  // const dispatch = createEventDispatcher();

  // Variables
  // let storeData;

  // Subscriptions
  // const unsubscribe = Locations.subscribe(store => {
  //   storeData = store.find(item => item.id === id);
  // });

  // Events
  const close = () => dispatch("close");

  // Life Cycle
  // onDestroy(() => {
  //   unsubscribe();
  // });
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
    <img src={data.imageUrl} alt={data.title} />
  </div>

  <div class="content">
    <h1>{data.title}</h1>
    <h2>{data.subtitle} - {data.address}</h2>
    <p>{data.description}</p>
    <Button href="mailto:{data.contactEmail}">Contact</Button>
    <Button mode={'outline'} href="/">Close</Button>
  </div>
</section>
