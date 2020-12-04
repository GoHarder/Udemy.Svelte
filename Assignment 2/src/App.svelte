<script>
  // Variables
  let inputValue = "";
  let message = "";
  let listItems = [];

  // Calculated Variables
  $: valid = inputValue.match(/\b\w{5,10}\b/);

  // Calculated Rules
  $: if (!valid && inputValue.length !== 0) {
    if (inputValue.length < 6) {
      message = "Too Short";
    } else {
      message = "Too Long";
    }
  } else {
    if (inputValue.length === 0) {
      message = "";
    } else {
      message = inputValue;
    }
  }

  // Logs
  // $: console.log("listItems", listItems.length);

  // Events
  const addItem = event => {
    listItems = [...listItems, inputValue];
  };

  const removeItem = ulItem => {
    listItems = listItems.filter(item => {
      return item !== ulItem;
    });
  };
</script>

<h1>Assignment</h1>

<p>Solve these tasks.</p>

<ol>
  <li>Add a password input field and save the user input in a variable.</li>
  <li>
    Output "Too short" if the password is shorter than 5 characters and "Too
    long" if it's longer than 10.
  </li>
  <li>
    Output the password in a paragraph tag if it's between these boundaries.
  </li>
  <li>Add a button and let the user add the passwords to an array.</li>
  <li>Output the array values (= passwords) in a unordered list (ul tag).</li>
  <li>Bonus: If a password is clicked, remove it from the list.</li>
</ol>

<hr />

<input type="password" bind:value={inputValue} />
<button on:click={addItem} disabled={!valid}>Add</button>
{#if message}
  <p>{message}</p>
{/if}

{#if listItems.length > 0}
  <ul>
    {#each listItems as item (item)}
      <ul on:click={() => removeItem(item)}>{item}</ul>
    {/each}
  </ul>
{/if}
