// Admin login details
const adminUser = "darpan";
const adminPass = "darpan123";

// Check if admin already logged in
if (sessionStorage.getItem("adminLoggedIn") === "true") {
    document.getElementById("loginOverlay").style.display = "none";
    document.getElementById("adminDashboard").style.display = "block";
    loadSubmissions();
}

function loginAdmin() {

    let username = document.getElementById("adminUsername").value;
    let password = document.getElementById("adminPassword").value;
    let error = document.getElementById("loginError");

    if (username === adminUser && password === adminPass) {

        sessionStorage.setItem("adminLoggedIn", "true");

        document.getElementById("loginOverlay").style.display = "none";
        document.getElementById("adminDashboard").style.display = "block";

        error.textContent = "";

        loadSubmissions();

    } else {

        error.textContent = "Invalid Username or Password";

        setTimeout(function () {
            error.textContent = "";
        }, 3000);

    }
}

function logoutAdmin() {

    let ans = confirm("Do you want to logout?");

    if (ans) {

        sessionStorage.removeItem("adminLoggedIn");

        document.getElementById("loginOverlay").style.display = "flex";
        document.getElementById("adminDashboard").style.display = "none";

    }
}

// Read data from localStorage
function loadSubmissions() {

    let data = localStorage.getItem("formSubmissions");

    if (data == null) {
        renderSubmissions([]);
    } else {
        renderSubmissions(JSON.parse(data));
    }

}
 
// Show submissions
function renderSubmissions(data) {

    let list = document.getElementById("submissionsList");

    if (data.length === 0) {

        list.innerHTML = `
        <div class="empty-state">
            <div class="icon">-</div>
            <h3>No Submissions</h3>
            <p>Nothing has been submitted yet.</p>
        </div>
        `;

        return;
    }

    data.reverse();

    let output = "";

    for (let i = 0; i < data.length; i++) {

        let item = data[i];

        output += `
        <div class="submission-card">

            <div class="submission-header">

                <div class="submission-sender">

                    <div>
                        <div class="submission-name">${item.name || "Anonymous"}</div>
                        <div class="submission-email">${item.email || "No Email"}</div>
                    </div>

                </div>

                <div class="submission-time">${item.timestamp || "-"}</div>

            </div>

            <div class="submission-subject">
                <strong>Subject:</strong> ${item.subject || "-"}
            </div>

            <div class="submission-message">
                ${item.message || "No Message"}
            </div>

            <div class="submission-id">
                ${item.id || "-"}
            </div>

        </div>
        `;
    }

    list.innerHTML = output;
}

// Download all data
function exportSubmissions() {

    let data = JSON.parse(localStorage.getItem("formSubmissions")) || [];

    if (data.length === 0) {
        alert("No submissions found.");
        return;
    }

    let file = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(file);

    let today = new Date().toISOString().split("T")[0];

    link.download = "submissions_" + today + ".json";

    link.click();

    URL.revokeObjectURL(link.href);

}

function refreshSubmissions() {
    loadSubmissions();
}

function clearAllSubmissions() {

    let first = confirm("Delete all submissions?");

    if (!first) return;

    let second = confirm("This cannot be undone. Continue?");

    if (!second) return;

    localStorage.removeItem("formSubmissions");

    loadSubmissions();

}

// Login when Enter key is pressed
document.addEventListener("keydown", function (event) {

    let loginBox = document.getElementById("loginOverlay");

    if (event.key === "Enter" && loginBox.style.display !== "none") {
        loginAdmin();
    }

});