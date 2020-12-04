<script>
  // Components
  import ContactCard from "./ContactCard.svelte";

  // Variables
  let name = "";
  let title = "";
  let image = "";
  let description = "";
  let formState = "empty";
  let contacts = [];

  // Logs
  // $: console.log("contacts", contacts);

  // Events
  const addContact = event => {
    if (
      name.trim().length === 0 ||
      title.trim().length === 0 ||
      image.trim().length === 0 ||
      description.trim().length === 0
    ) {
      formState = "invalid";
    } else {
      formState = "valid";

      let contact = { id: Math.random(), name, title, image, description };

      contacts = [...contacts, contact];

      name = "";
      title = "";
      image = "";
      description = "";
    }
  };

  const deleteFirst = () => {
    contacts = contacts.slice(1);

    console.log("deleteFirst");
  };

  const deleteLast = () => {
    contacts = contacts.slice(0, -1);
    console.log("deleteLast");
  };
</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>

<form id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
  <button on:click|preventDefault={addContact}>Add</button>
</form>

<button on:click={deleteFirst}>Delete First</button>
<button on:click={deleteLast}>Delete Last</button>

{#if formState === 'invalid'}
  <p>Error: invalid form input</p>
{:else}
  <hr />
{/if}

{#each contacts as contact, index (contact.id)}
  <p>#{index + 1}</p>
  <ContactCard
    userName={contact.name}
    jobTitle={contact.title}
    description={contact.description}
    userImage={contact.image} />
{:else}
  <p>No contacts available</p>
{/each}
