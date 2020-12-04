<script>
  // Components
  import ContactCard from "./components/ContactCard.svelte";

  // Variables
  let userName = "Name";
  let jobTitle = "Job Title";
  let description = "Description";
  let userImage = "";
  let age = 30;

  // Calculated Variables
  $: uppercaseName = userName.toUpperCase();

  // Calculated Rules
  $: if (age > 40) {
    age = 18;
  }

  $: contactCard = {
    userName,
    jobTitle,
    description,
    userImage
  };

  // Logs
  //   $: console.log(contactCard);

  // Local Events
  const incrementAge = () => {
    age += 1;
  };
</script>

<style>
  h1 {
    color: purple;
  }

  textarea {
    width: 100%;
    height: 200px;
  }
</style>

<h1>Hello {uppercaseName}, my age is {age}!</h1>
<button on:click={incrementAge}>Change Age</button>
<input type="text" bind:value={userName} />
<input type="text" bind:value={jobTitle} />
<input type="text" bind:value={userImage} />
<textarea cols="30" rows="10" bind:value={description} />
<ContactCard {...contactCard} />
