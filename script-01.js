/*
 * Tutorial Exercise 07
 *
 * Objective:
 * The goal of this exercise is to enhance our understanding of working with APIs and handling asynchronous data in JavaScript.
 * Specifically, we're learning to use the `fetch()` function to request information from an external API (PokeAPI) and display 
 * relevant details (like the Pokémon's `base_experience`) on the web page. This approach helps us dynamically interact with 
 * data that's not hardcoded in our code, making our application more flexible and capable of updating in real-time based on 
 * external information.
 *
 * Steps to enable fetch() and display the Pokémon's base_experience:
 *
 * 1. Create a function called `getBaseExperience` that:
 *    - Accepts a Pokémon name as a parameter.
 *    - Uses fetch() to request data from `https://pokeapi.co/api/v2/pokemon/{pokemonName}`.
 *    - Extracts and returns the `base_experience` value from the API response.
 * 
 * 2. Update the `listClickHandler` function to:
 *    - Call `getBaseExperience` with the Pokémon name retrieved from the clicked button's sibling.
 *    - Display both the Pokémon name and the retrieved `base_experience` in the `pokeMessage` element.
 *
 * 3. Test by clicking each Pokémon button to ensure the correct base_experience value is displayed.
 *
 * 4. Commit and push your changes. Show a TA when you've completed this step.
 *
 * 5. Add error handling for:
 *    - When the pokeAPI server does not respond
 *    - When you request a Pokemon that doesn't exist (e.g. https://pokeapi.co/api/v2/pokemon/james)
 *
 * 6. Commit and push your changes again. You're done!
 */

//
// APP VARIABLES AND DOM ELEMENTS
//

// 1. The ul for the list of pokemon
const pokeList = document.querySelector(".poke-items");
// 2. The span message to display the index
const pokeMessage = document.querySelector(".message");

//
// FUNCTIONS
//

// 1. Create a function called `getBaseExperience` that fetches Pokemon data from PokeAPI
async function getBaseExperience(pokemonName) {
  try {
    // Convert Pokemon name to lowercase for API consistency
    const lowercaseName = pokemonName.toLowerCase();
    
    // Use fetch() to request data from PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${lowercaseName}`);
    
    // Check if the response is successful
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokemon "${pokemonName}" not found!`);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    
    // Parse the JSON response
    const pokemonData = await response.json();
    
    // Extract and return the base_experience value
    return pokemonData.base_experience;
    
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'TypeError') {
      throw new Error('Network error: Please check your internet connection');
    } else {
      throw error;
    }
  }
}

// 2. Handle the event when a user clicks on the list
async function listClickHandler(event) {
  // Check if the click event is from a button or something else
  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  // Get the Pokémon name from the previous sibling element of the button
  const pokemonName = event.target.previousElementSibling.textContent.trim();

  try {
    // Show loading message
    pokeMessage.textContent = `Loading ${pokemonName} data...`;
    
    // Call getBaseExperience with the Pokemon name
    const baseExperience = await getBaseExperience(pokemonName);
    
    // Display both the Pokémon name and the retrieved base_experience
    pokeMessage.textContent = `${pokemonName} has base experience: ${baseExperience}`;
    
  } catch (error) {
    // Display error message if something goes wrong
    console.error('Error fetching Pokemon data:', error);
    pokeMessage.textContent = `Error: ${error.message}`;
  }
}

//
// EVENT LISTENERS AND INITIALISATION
//

// 3. Add the click event handler to the list
pokeList.addEventListener("click", listClickHandler);