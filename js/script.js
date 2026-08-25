document.addEventListener("DOMContentLoaded", function () {

    const taskBoxes = document.querySelectorAll(".task-box");
    const taskCount = document.getElementById("taskCount");

    function updateTaskCount() {
        if (!taskCount) return;

        const completed = document.querySelectorAll(".task-box:checked").length;

        taskCount.textContent = `${completed}/4 completed`;
    }

    taskBoxes.forEach(function (box) {
        box.addEventListener("change", updateTaskCount);
    });

    updateTaskCount();


    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;

            localStorage.setItem("placeTrackUser", email);

            window.location.href = "index.html";
        });
    }


    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;

            localStorage.setItem("placeTrackUser", email);

            alert("Account created successfully.");

            window.location.href = "index.html";
        });
    }


    const addProblemBtn = document.getElementById("addProblemBtn");
    const modal = document.getElementById("problemModal");
    const closeModal = document.getElementById("closeModal");
    const saveProblem = document.getElementById("saveProblem");

    if (addProblemBtn) {
        addProblemBtn.addEventListener("click", function () {
            modal.classList.remove("hidden");
        });
    }

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            modal.classList.add("hidden");
        });
    }

    if (saveProblem) {
        saveProblem.addEventListener("click", function () {

            const name = document.getElementById("problemName").value;

            if (name.trim() === "") {
                alert("Please enter a problem name.");
                return;
            }

            alert("Problem added successfully.");

            document.getElementById("problemName").value = "";

            modal.classList.add("hidden");
        });
    }


    const addGoalBtn = document.getElementById("addGoalBtn");
    const goalList = document.getElementById("goalList");

    if (addGoalBtn) {
        addGoalBtn.addEventListener("click", function () {

            const goal = prompt("Enter your goal:");

            if (!goal || goal.trim() === "") {
                return;
            }

            const label = document.createElement("label");

            label.className = "goal-item";

            label.innerHTML =
                '<input type="checkbox">' +
                '<span>' + escapeHtml(goal) + '</span>';

            goalList.appendChild(label);
        });
    }


    const saveProfile = document.getElementById("saveProfile");
    const profileMessage = document.getElementById("profileMessage");

    if (saveProfile) {
        saveProfile.addEventListener("click", function () {

            profileMessage.textContent = "Profile saved successfully.";

            setTimeout(function () {
                profileMessage.textContent = "";
            }, 2500);
        });
    }

});


function demoLogin() {

    localStorage.setItem(
        "placeTrackUser",
        "demo@placetrack.com"
    );

    window.location.href = "index.html";
}


function logout() {

    localStorage.removeItem("placeTrackUser");

    window.location.href = "login.html";
}


function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
