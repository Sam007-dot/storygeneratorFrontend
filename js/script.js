function fetchUserProfile() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        return; // User is not logged in
    }

    fetch(`https://storygeneratorbackend-ytdf.onrender.com/users/profile/${userId}`, { // Replace with your actual API URL
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(user => {
        if (user.name) {
            document.getElementById('profileSection').innerHTML = `
                <img src="${user.profilePicture || 'default-avatar.jpg'}" alt="Profile" class="profile-pic">
                <span class="username">${user.name}</span>
                <button onclick="logoutUser()" class="cta-button logout">Logout</button>
            `;
        }
    })
    .catch(error => console.error('Error fetching user profile:', error));
}



function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    document.getElementById('profileSection').innerHTML = `
        <a href="login.html" class="loginBtn cta-button">Login</a>
    `;
}

document.addEventListener("DOMContentLoaded", fetchUserProfile);

