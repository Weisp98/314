//current session's username
const username = sessionStorage.getItem('username');

// FETCH from the server
async function fetchProperties() {
    const response = await fetch(`/myapp/ViewAllBoundary`); // Removed username from the URL
    const properties = await response.json();
    console.log(properties);
    return properties;
}

// SEARCH
async function searchProperties() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const properties = await fetchProperties();
    const filteredProperties = properties.filter(property => property.title.trim().toLowerCase().includes(searchValue));
    
    if (filteredProperties.length > 0) {
        displayProperties(filteredProperties); // Display only the found properties
    } else {
        alert("Property not found.");
    }
}

// DISPLAY
async function displayProperties(properties) {
    console.log('displayProperties called');
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    // If no properties are passed to the function, fetch all properties
    if (!properties) {
        properties = await fetchProperties();
    }

    properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.classList.add('property');

        propertyDiv.innerHTML = `
            <h2>${property.title}</h2>
            <p>Description: ${property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Status: ${property.status}</p>
            <button class="favourite-btn">❤️</button>
        `;

        dashboard.appendChild(propertyDiv);

        propertyDiv.querySelector('.favourite-btn').addEventListener('click', () => addToFavourites(property));
    });
}

async function addToFavourites(property) {
    // Send a request to the server to add the property to the user's favourites
    const response = await fetch(`/myapp/FavPropertyBoundary?username=${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(property)
    });

    if (response.ok) {
        alert("Property added to favourites.");
    } else {
        alert("Failed to add property to favourites.");
    }
}

displayProperties();


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Search button called');
    document.getElementById('searchBtn').addEventListener('click', searchProperties);
});


//reusable code for login and back to dashboard replacing each other. 
document.addEventListener('DOMContentLoaded', (event) => {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('backToDashboard').style.display = 'inline';
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('loginLink').style.display = 'none';
    }
});