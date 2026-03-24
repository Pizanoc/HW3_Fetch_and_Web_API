//get elements 
const form = document.getElementById("characterForm");
const characterNameInput = document.getElementById("characterName");
const message = document.getElementById("message");
const results = document.getElementById("results");

//event listener
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const characterName = characterNameInput.value.trim();

    if (characterName === "") {
        message.textContent = "Please enter a character name.";
        results.innerHTML = "";
        return;
    }

    const apiURL = "https://rickandmortyapi.com/api/character/?name=" + encodeURIComponent(characterName);

    message.textContent = "Loading...";
    results.innerHTML = "";

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Character not found");
        }

        const data = await response.json();

        message.textContent = "Found " + data.results.length + " character(s).";

        data.results.forEach(function(character) {
            const card = document.createElement("div");
            card.classList.add("character-card");

            card.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
                <p><strong>Location:</strong> ${character.location.name}</p>
            `;

            results.appendChild(card);
        });

    } catch (error) {
        message.textContent = "No characters found. Please try another name.";
        results.innerHTML = "";
    }
});