document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const profileSection = document.getElementById("profile-section");
    const profilePic = document.getElementById("profilePic");
    const username = document.getElementById("username");
    const logoutBtn = document.getElementById("logoutBtn");

    // Function to fetch user details
    function fetchUser() {
        fetch("https://storygeneratorbackend-ytdf.onrender.com/api/user")  // Adjust API endpoint as per backend
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    // Hide Login Button & Show Profile Section
                    loginBtn.classList.add("hidden");
                    profileSection.classList.remove("hidden");

                    // Set User Details
                    username.textContent = data.username;
                    profilePic.src = data.profilePic || "default-avatar.png";
                } else {
                    loginBtn.classList.remove("hidden");
                    profileSection.classList.add("hidden");
                }
            })
            .catch(error => console.error("Error fetching user:", error));
    }

    // Logout Functionality
    logoutBtn.addEventListener("click", function () {
        fetch("https://storygeneratorbackend-ytdf.onrender.com/api/logout", { method: "POST" })  // Adjust API endpoint as per backend
            .then(() => {
                sessionStorage.removeItem("user");  // Remove session data if stored
                window.location.reload();  // Refresh page
            })
            .catch(error => console.error("Logout failed:", error));
    });

    // Initial Fetch Call
    fetchUser();
});
