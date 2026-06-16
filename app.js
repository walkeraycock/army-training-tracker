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

            renderWeek(
                parseInt(button.dataset.week)
            );

        });

    });

    renderWeek(1);

}
const trainingPlan = {

    1:{
        intervals:"6 × 400m",
        tempo:"2 Mile Tempo",
        longRun:"3 Miles"
    },

    2:{
        intervals:"8 × 400m",
        tempo:"2.5 Mile Tempo",
        longRun:"3.5 Miles"
    },

    3:{
        intervals:"5 × 800m",
        tempo:"3 Mile Tempo",
        longRun:"4 Miles"
    },

    4:{
        intervals:"6 × 800m",
        tempo:"3 Mile Tempo",
        longRun:"5 Miles"
    },

    5:{
        intervals:"4 × 1200m",
        tempo:"4 Mile Tempo",
        longRun:"5-6 Miles"
    },

    6:{
        intervals:"6 × 400m",
        tempo:"2 Mile Easy",
        longRun:"2 Mile Time Trial"
    }

};

function renderWeek(week){

    const plan =
        trainingPlan[week];

    const container =
        document.getElementById(
            "trainingContent"
        );

    container.innerHTML =

        "<div class='card'>" +

            "<h2>Week " + week + "</h2>" +

        "</div>" +

        "<div class='card'>" +

            "<h2>Monday - Lower Body</h2>" +

            createLift(
                'Back Squat',
                5
            ) +

            createLift(
                'Romanian Deadlift',
                4
            ) +

        "</div>" +

        "<div class='card'>" +

            "<h2>Tuesday Intervals</h2>" +

            "<p>" +
            plan.intervals +
            "</p>" +

            "<input placeholder='Distance'>" +

            "<input placeholder='Time'>" +

        "</div>" +

        "<div class='card'>" +

            "<h2>Wednesday - Upper Body</h2>" +

            createLift(
                'Bench Press',
                4
            ) +

            createLift(
                'Overhead Press',
                4
            ) +

        "</div>" +

        "<div class='card'>" +

            "<h2>Thursday Tempo Run</h2>" +

            "<p>" +
            plan.tempo +
            "</p>" +

            "<input placeholder='Distance'>" +

            "<input placeholder='Time'>" +

        "</div>" +

        "<div class='card'>" +

            "<h2>Friday Work Capacity</h2>" +

            createLift(
                'Deadlift',
                5
            ) +

        "</div>" +

        "<div class='card'>" +

            "<h2>Saturday Long Run</h2>" +

            "<p>" +
            plan.longRun +
            "</p>" +

            "<input placeholder='Distance'>" +

            "<input placeholder='Time'>" +

        "</div>" +

        "<div class='card'>" +

            "<h2>Sunday Recovery Swim</h2>" +

            "<input placeholder='Distance'>" +

            "<input placeholder='Time'>" +

        "</div>";

}

function createLift(name, sets, targetReps) {

    let html =
        "<h3>" + name + "</h3>";

    for (let i = 1; i <= sets; i++) {

        html +=

            "<div class='set-group'>" +

                "<label class='set-label'>" +

                    "Set " + i +
                    " (" + targetReps + " reps)" +

                "</label>" +

                "<input " +
                    "class='set-input' " +
                    "placeholder='" +
                    targetReps +
                    " @ Weight'>" +

            "</div>";

    }

    return html;

}
