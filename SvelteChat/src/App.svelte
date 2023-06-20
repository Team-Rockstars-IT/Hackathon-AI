<script>
  import Chat from "./lib/Chat.svelte";
  import Header from "./lib/Layout/Header.svelte";
</script>

<main>
  <Header />
  <section class="chat-container">
    <Chat />
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }

  .chat-container {
    width: 500px;
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 2rem;
  }
</style>
