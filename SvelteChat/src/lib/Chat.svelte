<script>
    let messages = [];
    let inputMessage = "";

    async function sendMessage() {
        if (inputMessage.trim() === "") return;

        const response = await fetch(
            "https://localhost:7069/api/Chat/send-message",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: inputMessage }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            messages = [
                ...messages,
                { text: inputMessage, isUser: true },
                { text: data.message, isAI: true },
            ];
        } else {
            console.error("Failed to send chat message");
        }

        inputMessage = "";
    }
</script>

<div class="chat-container">
    {#each messages as message}
        <div class="message {message.isUser ? 'user-message' : 'ai-message'}">
            {message.text}
        </div>
    {/each}
</div>

<input
    type="text"
    bind:value={inputMessage}
    placeholder="Type your message..."
/>
<button on:click={sendMessage}>Send</button>

<style>
    .chat-container {
        height: 400px;
        overflow-y: scroll;
        border: 1px solid #ccc;
        padding: 10px;
    }

    .message {
        margin-bottom: 10px;
    }

    .user-message {
        background-color: lightgreen;
        padding: 5px;
        border-radius: 5px;
        color: black;
    }

    .ai-message {
        background-color: lightblue;
        padding: 5px;
        border-radius: 5px;
        color: black;
    }
</style>
