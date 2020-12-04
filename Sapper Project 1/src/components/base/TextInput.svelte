<script>
  // Properties
  export let type = "text";
  export let id = "";
  export let labelText = "";
  export let rows = 0;
  export let value = "";
  export let valid = true;
  export let errorMessage = "";

  // Variables
  let touched = false;

  // Events
  const onTouched = event => {
    touched = true;
  };
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }

  .invalid {
    border-color: red;
    background: #ccc;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }
</style>

<div class="form-control">
  <label for={id}>{labelText}</label>
  {#if type === 'textarea'}
    <textarea
      {id}
      {rows}
      {value}
      class:invalid={!valid}
      on:input
      on:blur={onTouched} />
  {:else}
    <input
      {id}
      {type}
      {value}
      class:invalid={!valid && touched}
      on:input
      on:blur={onTouched} />
  {/if}
  {#if errorMessage && !valid && touched}
    <p class="error-message">{errorMessage}</p>
  {/if}
</div>
