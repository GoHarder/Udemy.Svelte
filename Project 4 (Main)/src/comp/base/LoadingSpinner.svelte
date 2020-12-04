<script>
  // ► Code for loading text
  // let text = "Loading...";

  // let messages = ["Loading...", "Calculating pi...", "Copying your cookies..."];

  // setInterval(() => {
  //   let i = Math.floor(Math.random() * messages.length);

  //   text = messages[i];
  // }, 5000);
</script>

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }

  .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #1565c0 transparent #1565c0 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class="loading">
  <div class="lds-dual-ring" />
</div>
<!-- <div class="loading">
  <p>{text}</p>
</div> -->
