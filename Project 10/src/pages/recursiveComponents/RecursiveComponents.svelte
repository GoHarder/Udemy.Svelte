<script>
  import Folder from "./Folder.svelte";

  let dir = {
    name: "src",
    content: [
      {
        name: "pages",
        content: [
          {
            name: "dynamicComponents",
            content: [
              { name: "CartItem.svelte" },
              { name: "DynamicComponents.svelte" },
              { name: "Product.svelte" }
            ]
          },
          {
            name: "recursiveComponents",
            content: [
              { name: "RecursiveComponents.svelte" },
              { name: "Folder.svelte" }
            ]
          },
          {
            name: "accessingWindowsBodyAndHead",
            content: [{ name: "AccessingWindowsBodyAndHead.svelte" }]
          },
          {
            name: "cross-componentScripts",
            content: [{ name: "Cross-ComponentScripts.svelte" }]
          }
        ]
      },
      { name: "App.svelte" },
      { name: "main.js" },
      { name: "New folder", content: [] }
    ]
  };
</script>

<style>
  ul {
    list-style: none;
    padding-left: 0.25rem;
    margin: 0;
  }
</style>

<ul>
  <Folder {dir} root={true} />
</ul>
