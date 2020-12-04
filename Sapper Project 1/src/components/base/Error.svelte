<script>
  // ◄ Components ►
  import Modal from "./Modal.svelte";

  // ◄ Properties ►
  export let message = "";
</script>

<Modal title="Error" on:toggleEdit>
  <p>{message}</p>
</Modal>
