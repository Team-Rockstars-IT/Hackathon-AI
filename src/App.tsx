import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState("result");

  const handleIngredientChange = (event: any) => {
    setIngredients(event.target.value);
  };

  const handleSendData = async () => {
    try {
      const response = await callChatGPTAPI(ingredients);
      console.log(response);
      setResult(response);
      // Handle the API response as needed
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <div>
          <label htmlFor="ingredientInput">Recipe Ingredients:</label>
          <input
            id="ingredientInput"
            type="text"
            value={ingredients}
            onChange={handleIngredientChange}
          />
          <button onClick={handleSendData}>Send Data</button>
        </div>

        {/* Create a field display the response of the api */}
        <div className="result">{result}{result}</div>
      </header>
    </div>
  );
}

async function callChatGPTAPI(input: string): Promise<any> {
  const apiKey = "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"; // Replace with your ChatGPT API key
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a very experienced cook" },
      {
        role: "user",
        content: `Using these ingredients ${input} what can you make?`,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch API");
  }

  const data = await response.json();
  const completion = data.choices[0].message.content.trim();

  return completion;
}

export default App;
