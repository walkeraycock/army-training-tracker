const STORAGE_KEY = "walker_training_v2";

document.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    setupWeekTabs();
});

function setupNavigation() {

    const buttons = document.querySelectorAll(".bottom-nav button");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            buttons.forEach(function(b) {
                b.classList.remove("active");
            });

            button.classList.add("active");

            document.querySelectorAll(".screen").forEach(function(screen) {
                screen.classList.remove("active");
            });

            const targetScreen =
                document.getElementById(
                    button.dataset.screen
                );

            if (targetScreen) {
                targetScreen.classList.add("active");
            }

        });

    });

}

function setupWeekTabs() {

    const weekButtons =
        document.querySelectorAll(".week-btn");

    weekButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            weekButtons.forEach(function(b) {
                b.classList.remove("active");
            });

            button.classList.add("active");

            const trainingContent =
                document.getElementById(
                    "trainingContent"
                );

            const week =
                button.dataset.week;

            trainingContent.innerHTML =
                "<div class='card'>" +
                "<h2>Week " + week + "</h2>" +
                "<p>Week selected successfully.</p>" +
                "</div>";

        });

    });

}
