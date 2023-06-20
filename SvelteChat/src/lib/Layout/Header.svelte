<script lang="ts">
    import svelteLogo from "../../assets/svelte.svg";
    export let title = "Svelte Open AI";
</script>

<header>
    <img src={svelteLogo} alt="Svelte Logo" />
    <h1>{title}</h1>
</header>

<style>
    header {
        display: flex;
        align-items: center;
        padding: 1rem;
        background-color: #242424;
    }

    img {
        width: 40px;
        height: 40px;
        margin-right: 1rem;
    }

    h1 {
        font-size: 1.5rem;
        margin: 0;
        color: white;
    }
</style>
