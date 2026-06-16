const STORAGE_KEY = "army_training_tracker_v3";

let currentWeek = 1;

document.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    setupWeekTabs();
});

let squatChart;
let benchChart;
let deadliftChart;

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

            if (
    button.dataset.screen ===
    "progress-screen"
) {
    buildProgressCharts();
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

    currentWeek = week;
    
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
                5,
                5
            ) +

            createLift(
                'Romanian Deadlift',
                4,
                8
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
                4,
                8
            ) +

            createLift(
                'Overhead Press',
                4,
                10
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
                5,
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

    loadInputs();

document.querySelectorAll("input").forEach(input => {

    input.addEventListener(
        "input",
        saveInputs
    );

});

updateDashboard();

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

function saveInputs() {

    let savedData =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || {};

    if (!savedData["week" + currentWeek]) {

        savedData["week" + currentWeek] = {};

    }

    document
        .querySelectorAll("input")
        .forEach(function(input, index) {

            savedData[
                "week" + currentWeek
            ][index] = input.value;

        });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedData)
    );

    updateDashboard();

}

function loadInputs() {

    const savedData =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

    if (!savedData) return;

    const weekData =
        savedData[
            "week" + currentWeek
        ];

    if (!weekData) return;

    document
        .querySelectorAll("input")
        .forEach(function(input, index) {

            if (
                weekData[index] !== undefined
            ) {

                input.value =
                    weekData[index];

            }

        });

}

function updateDashboard() {

    let completed = 0;
    let totalVolume = 0;
    let totalMiles = 0;

    document.querySelectorAll("input").forEach(input => {

        const value = input.value.trim();

        if (value !== "") {
            completed++;
        }

        if (value.includes("@")) {

            const parts =
                value.split("@");

            if (parts.length === 2) {

                const reps =
                    parseFloat(parts[0].trim());

                const weight =
                    parseFloat(parts[1].trim());

                if (
                    !isNaN(reps) &&
                    !isNaN(weight)
                ) {
                    totalVolume +=
                        reps * weight;
                }

            }

        }

        if (
            input.placeholder === "Distance"
        ) {

            const distance =
                parseFloat(value);

            if (!isNaN(distance)) {
                totalMiles += distance;
            }

        }

    });

    const completionCard =
        document.getElementById(
            "completionPercent"
        );

    const volumeCard =
        document.getElementById(
            "totalVolume"
        );

    const milesCard =
        document.getElementById(
            "totalMiles"
        );

    if (completionCard) {

        const totalInputs =
            document.querySelectorAll("input")
                .length;

        const percent =
            totalInputs === 0
            ? 0
            : Math.round(
                (completed / totalInputs) * 100
              );

        completionCard.textContent =
            percent + "%";

    }

    if (volumeCard) {

        volumeCard.textContent =
            totalVolume.toLocaleString() +
            " lbs";

    }

    if (milesCard) {

        milesCard.textContent =
            totalMiles.toFixed(1);

    }

    const workoutsCard =
    document.getElementById(
        "completedWorkouts"
    );

if (workoutsCard) {

    workoutsCard.textContent =
        completed;

}

}
function getLiftProgressData() {

    const savedData =
        JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        ) || {};

    const squatData = [];
    const benchData = [];
    const deadliftData = [];

    for (let week = 1; week <= 6; week++) {

        const weekData =
            savedData["week" + week] || {};

        let bestSquat = 0;
        let bestBench = 0;
        let bestDeadlift = 0;

        Object.entries(weekData).forEach(function(entry) {

            const index =
                parseInt(entry[0]);

            const value =
                entry[1];

            if (
                typeof value !== "string" ||
                !value.includes("@")
            ) {
                return;
            }

            const weight =
                parseFloat(
                    value.split("@")[1]
                );

            if (isNaN(weight)) {
                return;
            }

            if (
                index >= 0 &&
                index <= 4
            ) {
                bestSquat =
                    Math.max(
                        bestSquat,
                        weight
                    );
            }

            if (
                index >= 11 &&
                index <= 14
            ) {
                bestBench =
                    Math.max(
                        bestBench,
                        weight
                    );
            }

            if (
                index >= 21 &&
                index <= 25
            ) {
                bestDeadlift =
                    Math.max(
                        bestDeadlift,
                        weight
                    );
            }

        });

        squatData.push(bestSquat);
        benchData.push(bestBench);
        deadliftData.push(bestDeadlift);

    }

    return {
        squatData: squatData,
        benchData: benchData,
        deadliftData: deadliftData
    };

}
function buildProgressCharts() {

    const labels = [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4",
        "Week 5",
        "Week 6"
    ];

    const progress =
    getLiftProgressData();

const squatData =
    progress.squatData;

const benchData =
    progress.benchData;

const deadliftData =
    progress.deadliftData;

    if (squatChart) squatChart.destroy();
    if (benchChart) benchChart.destroy();
    if (deadliftChart) deadliftChart.destroy();

    squatChart = new Chart(
        document.getElementById("squatChart"),
        {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Back Squat",
                    data: squatData
                }]
            }
        }
    );

    benchChart = new Chart(
        document.getElementById("benchChart"),
        {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Bench Press",
                    data: benchData
                }]
            }
        }
    );

    deadliftChart = new Chart(
        document.getElementById("deadliftChart"),
        {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Deadlift",
                    data: deadliftData
                }]
            }
        }
    );

}

