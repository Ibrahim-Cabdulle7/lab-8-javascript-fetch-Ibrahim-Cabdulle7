/*
 * Lab 8 - JavaScript Fetch Exercise
 * Student Name: Ibrahim Cabdulle
 * 
 * Instructions:
 * This file contains the JavaScript code for Lab 8, focusing on:
 * 1. Working with the DOM (Document Object Model)
 * 2. Using the Fetch API to retrieve data from external sources
 * 3. Handling asynchronous operations and promises
 * 4. Error handling for network requests
 * 5. Dynamically updating the page content
 * 
 * Complete the following tasks by implementing the required functions:
 */

// Task 1: DOM Elements Selection
// TODO: Select and store references to the DOM elements we'll need
// Hint: Use document.getElementById() or document.querySelector()

const fetchButton = document.getElementById('fetch-data-btn');
const clearButton = document.getElementById('clear-data-btn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const dataDisplay = document.getElementById('data-display');
const errorMessage = document.querySelector('.error-message');

// Task 2: API Endpoint
// TODO: Define the API endpoint you'll fetch data from
// For this exercise, we'll use JSONPlaceholder, a free fake REST API
// You can use: https://jsonplaceholder.typicode.com/posts (for posts)
// Or: https://jsonplaceholder.typicode.com/users (for users)
// Or: https://jsonplaceholder.typicode.com/photos (for photos - be careful, this is large!)

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Task 3: Utility Functions
// TODO: Create helper functions for showing/hiding elements

function showElement(element) {
    // Remove the 'hidden' class to show the element
    element.classList.remove('hidden');
}

function hideElement(element) {
    // Add the 'hidden' class to hide the element
    element.classList.add('hidden');
}

function showLoading() {
    // TODO: Show the loading indicator and hide error messages
    showElement(loadingDiv);
    hideElement(errorDiv);
}

function hideLoading() {
    // TODO: Hide the loading indicator
    hideElement(loadingDiv);
}

function showError(message) {
    // TODO: Display an error message and hide loading
    hideLoading();
    errorMessage.textContent = message;
    showElement(errorDiv);
}

function hideError() {
    // TODO: Hide the error message
    hideElement(errorDiv);
}

// Task 4: Data Fetching Function
// TODO: Create an async function to fetch data from the API
async function fetchData() {
    try {
        // Step 1: Show loading state
        showLoading();
        hideError();
        
        // Step 2: Fetch data from the API
        // Use the fetch() function with the API_URL
        // Remember: fetch() returns a Promise
        const response = await fetch(API_URL);
        
        // Step 3: Check if the response is successful
        // HTTP status codes in the 200-299 range indicate success
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Step 4: Parse the JSON data
        const data = await response.json();
        
        // Step 5: Hide loading and display the data
        hideLoading();
        displayData(data);
        
    } catch (error) {
        // Step 6: Handle any errors that occur during the fetch
        console.error('Fetch error:', error);
        showError(`Failed to fetch data: ${error.message}`);
    }
}

// Task 5: Data Display Function
// TODO: Create a function to display the fetched data in the DOM
function displayData(data) {
    // Clear any existing data
    dataDisplay.innerHTML = '';
    
    // Check if data exists and is an array
    if (!data || !Array.isArray(data)) {
        dataDisplay.innerHTML = '<p>No data available to display.</p>';
        return;
    }
    
    // Limit the number of items to display (to keep the page manageable)
    const limitedData = data.slice(0, 10);
    
    // Create HTML for each data item
    limitedData.forEach(item => {
        const dataItem = document.createElement('div');
        dataItem.className = 'data-item';
        
        // Customize this based on the API data structure
        // For posts API, we have: id, userId, title, body
        dataItem.innerHTML = `
            <h4>Post #${item.id}</h4>
            <p><strong>Title:</strong> ${item.title}</p>
            <p><strong>Content:</strong> ${item.body}</p>
            <p class="meta">User ID: ${item.userId}</p>
        `;
        
        dataDisplay.appendChild(dataItem);
    });
    
    // Add a summary message
    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Showing ${limitedData.length} of ${data.length} items</strong>`;
    summary.style.textAlign = 'center';
    summary.style.marginTop = '1rem';
    summary.style.fontStyle = 'italic';
    dataDisplay.appendChild(summary);
}

// Task 6: Clear Data Function
// TODO: Create a function to clear the displayed data
function clearData() {
    // Clear the data display
    dataDisplay.innerHTML = '<p>No data to display. Click "Fetch Data" to load content.</p>';
    
    // Hide any error messages
    hideError();
    hideLoading();
}

// Task 7: Event Listeners
// TODO: Add event listeners to the buttons
// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener to the fetch button
    fetchButton.addEventListener('click', function() {
        console.log('Fetch button clicked');
        fetchData();
    });
    
    // Add click event listener to the clear button
    clearButton.addEventListener('click', function() {
        console.log('Clear button clicked');
        clearData();
    });
    
    // Initialize the page with a default message
    clearData();
    
    console.log('Lab 8 JavaScript loaded successfully!');
});

// Task 8: Alternative API Endpoints (Bonus)
// TODO: Uncomment one of these alternative endpoints to try different data types

// For user data:
// const API_URL = 'https://jsonplaceholder.typicode.com/users';

// For album data:
// const API_URL = 'https://jsonplaceholder.typicode.com/albums';

// For todo items:
// const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Note: If you change the API_URL, you'll also need to update the displayData() function
// to handle the different data structure returned by each endpoint.

// Task 9: Enhanced Error Handling (Advanced)
// TODO: Add more specific error handling for different types of network errors

function handleNetworkError(error) {
    let userMessage = 'An error occurred while fetching data.';
    
    if (error.name === 'TypeError') {
        userMessage = 'Network error: Please check your internet connection.';
    } else if (error.message.includes('404')) {
        userMessage = 'Data not found (404 error).';
    } else if (error.message.includes('500')) {
        userMessage = 'Server error (500). Please try again later.';
    }
    
    return userMessage;
}

// Task 10: Console Logging (For Debugging)
// TODO: Add console.log statements to help with debugging
console.log('Script loaded - Lab 8 JavaScript Fetch Exercise');
console.log('API URL:', API_URL);