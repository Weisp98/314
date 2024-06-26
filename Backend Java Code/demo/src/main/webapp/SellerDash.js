//current session's username
const username = sessionStorage.getItem('username');

// FETCH from the server
async function fetchProperties() {
    const response = await fetch(`/myapp/ViewPropertyBoundary?username=${username}`);
    const properties = await response.json();
    console.log(properties);
    return properties;
}

// SEARCH
async function searchProperties() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const properties = await fetchProperties();
    const filteredProperties = properties.filter(property => property.title.trim().toLowerCase().startsWith(searchValue));
    
    if (filteredProperties.length > 0) {
        displayProperties(filteredProperties); // Display only the found properties
    } else {
        alert("Property not found.");
    }
}

// DISPLAY
async function displayProperties(filteredProperties = null) {
    console.log('displayProperties called');
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ''; // Clear existing content
    
    const properties = filteredProperties ? filteredProperties : await fetchProperties();

    properties.forEach(property => {
        const propertyDiv = createPropertyElement(property);
        dashboard.appendChild(propertyDiv);
    });
}

function createPropertyElement(property) {
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add('property');

    propertyDiv.innerHTML = `
        <h2>${property.title}</h2>
        <p>Description: ${property.description}</p>
        <p>Location: ${property.location}</p>
        <p>Size: ${property.size}</p>
        <p>Price: ${property.price}</p>
        <p>Status: ${property.status}</p>
        <button onclick="removeProperty('${property.title}')">Remove from saved</button>
    `;

    return propertyDiv;
}


function logout() {
    //clears session username
    sessionStorage.removeItem('username');
    window.location.href = "login.jsp";
}

//Buttons
document.getElementById('logoutBtn').addEventListener('click', logout);

document.getElementById('searchBtn').addEventListener('click', searchProperties);

document.getElementById('viewAllPropertiesBtn').addEventListener('click', async function() {
    await displayProperties(); // Fetch and display all properties
});

document.getElementById('viewListingsBtn').addEventListener('click', async function() {
    // Implement functionality to view user's own listings
});

document.getElementById('viewAgentsBtn').addEventListener('click', async function() {
    // Implement functionality to view agents
});

document.getElementById('viewPropertyTypesBtn').addEventListener('click', async function() {
    // Implement functionality to view types of properties sold
});