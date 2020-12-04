<script>
  // ◄ External Import ►
  import { isEmpty, isValidEmail } from "../lib/validation.js";

  // ◄ Svelte Import ►
  import { createEventDispatcher } from "svelte";

  // ◄ Stores ►
  import Locations from "../store/locations.js";

  // ◄ Components ►
  import Modal from "./base/Modal.svelte";
  import TextInput from "./base/TextInput.svelte";
  import Button from "./base/Button.svelte";

  // ◄ Properties ►
  export let id = "";

  // ◄ Svelte Variables ►
  const dispatch = createEventDispatcher();

  // ◄ Variables ►
  let title = "";
  let subtitle = "";
  let description = "Description of the items.";
  let imageUrl = "https://via.placeholder.com/200x150";
  let address = "15 North Elm St. Some Town, PA 22222";
  let contactEmail = "";
  let validForm = false;

  // ◄ Reactive Variables ►
  $: validTitle = !isEmpty(title);
  $: validSubtitle = !isEmpty(subtitle);
  $: validDescription = !isEmpty(description);
  $: validImageUrl = !isEmpty(imageUrl);
  $: validAddress = !isEmpty(address);
  $: validContactEmail = isValidEmail(contactEmail);
  $: validForm =
    validTitle &&
    validSubtitle &&
    validDescription &&
    validImageUrl &&
    validAddress &&
    validContactEmail;

  // ◄ Reactive Rules ►
  $: if (id) {
    const unsubscribe = Locations.subscribe(store => {
      const storeData = store.find(item => item.id === id);
      title = storeData.title;
      subtitle = storeData.subtitle;
      description = storeData.description;
      imageUrl = storeData.imageUrl;
      address = storeData.address;
      contactEmail = storeData.contactEmail;
    });

    unsubscribe();
  }

  // ◄ Logs ►
  // $: console.log({
  //   title,
  //   subtitle,
  //   description,
  //   imageUrl,
  //   address,
  //   contactEmail
  // });

  // ◄ Events ►
  const submit = () => {
    const data = {
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail
    };

    if (id) {
      fetch(`https://svelte-class.firebaseio.com/locations/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw error;
          }
          data.id = id;
          Locations.editLocation(data);
        })
        .catch(error => console.log(error));

      // data.id = id;
      // Locations.editLocation(data);
    } else {
      data.favorite = false;
      fetch("https://svelte-class.firebaseio.com/locations.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw error;
          }
          return response.json();
        })
        .then(response => {
          data.id = response.name;
          Locations.addLocation(data);
        })
        .catch(error => console.log(error));
      // Locations.addLocation(data);
    }

    title = "";
    subtitle = "";
    description = "Description of the items.";
    imageUrl = "https://via.placeholder.com/200x150";
    address = "15 North Elm St. Some Town, PA 22222";
    contactEmail = "";

    dispatch("toggleEdit");
  };

  const _delete = () => {
    fetch(`https://svelte-class.firebaseio.com/locations/${id}.json`, {
      method: "DELETE"
    })
      .then(response => {
        if (!response.ok) {
          throw error;
        }

        Locations.deleteLocation(id);
      })
      .catch(error => console.log(error));

    dispatch("toggleEdit");
  };

  const toggleEdit = () => {
    dispatch("toggleEdit");
  };
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Location Data" on:toggleEdit>
  <!-- on:submit here for reference its not being triggered -->
  <!-- <form on:submit|preventDefault={editLocation}> -->
  <form>
    <TextInput
      id={'title'}
      labelText={'Title'}
      value={title}
      valid={validTitle}
      errorMessage={'Title is not valid'}
      on:input={event => {
        title = event.target.value;
      }} />
    <TextInput
      id={'subtitle'}
      labelText={'Subtitle'}
      value={subtitle}
      valid={validSubtitle}
      errorMessage={'Subitle is not valid'}
      on:input={event => {
        subtitle = event.target.value;
      }} />
    <TextInput
      id={'address'}
      labelText={'Address'}
      value={address}
      valid={validAddress}
      errorMessage={'Address is not valid'}
      on:input={event => {
        address = event.target.value;
      }} />
    <TextInput
      id={'imageurl'}
      labelText={'Image URL'}
      value={imageUrl}
      valid={validImageUrl}
      errorMessage={'URL is not valid'}
      on:input={event => {
        imageUrl = event.target.value;
      }} />
    <TextInput
      id={'email'}
      labelText={'E-Mail'}
      value={contactEmail}
      valid={validContactEmail}
      errorMessage={'E-Mail is not valid'}
      type={'email'}
      on:input={event => {
        contactEmail = event.target.value;
      }} />
    <TextInput
      id={'description'}
      labelText={'Description'}
      value={description}
      valid={validDescription}
      errorMessage={'Description is not valid'}
      type={'textarea'}
      rows={3}
      on:input={event => {
        description = event.target.value;
      }} />
  </form>

  <div slot="footer">
    <Button disabled={!validForm} on:click={submit}>Save</Button>
    <Button on:click={toggleEdit} mode={'outline'}>Cancel</Button>
    {#if id}
      <Button on:click={_delete}>Delete</Button>
    {/if}
  </div>
</Modal>
