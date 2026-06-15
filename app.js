/* ==========================================
WALKER AYCOCK TRAINING TRACKER
APP.JS PART 1
========================================== */

const STORAGE_KEY = "walker_training_v2";

let appData = loadData();

const trainingPlan = {
1: {
intervals: "6×400m",
tempo: "2 mi steady",
longRun: "3 mi easy"
},
2: {
intervals: "8×400m",
tempo: "2.5 mi tempo",
longRun: "3.5 mi easy"
},
3: {
intervals: "5×800m",
tempo: "3 mi tempo",
longRun: "4 mi easy"
},
4: {
intervals: "6×800m",
tempo: "3 mi tempo",
longRun: "5 mi easy"
},
5: {
intervals: "4×1200m",
tempo: "4 mi tempo",
longRun: "5–6 mi easy"
},
6: {
intervals: "6×400m",
tempo: "2 mi easy",
longRun: "2 mi time trial"
}
};

let currentWeek = 1;

/* ==========================================
INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

initializeNavigation();
initializeWeekTabs();

renderTrainingWeek(1);

});

/* ==========================================
STORAGE
========================================== */

function loadData() {

const saved = localStorage.getItem(STORAGE_KEY);

if(saved){
return JSON.parse(saved);
}

return {
workouts: [],
settings: {}
};
}

function saveData(){
localStorage.setItem(
STORAGE_KEY,
JSON.stringify(appData)
);
}

/* ==========================================
NAVIGATION
========================================== */

function initializeNavigation(){

const buttons =
document.querySelectorAll(
".bottom-nav button"
);

buttons.forEach(btn => {

```
btn.addEventListener("click", () => {

  buttons.forEach(b =>
    b.classList.remove("active")
  );

  btn.classList.add("active");

  const screen =
    btn.dataset.screen;

  document
    .querySelectorAll(".screen")
    .forEach(s =>
      s.classList.remove("active")
    );

  document
    .getElementById(screen)
    .classList.add("active");

});
```

});

}

/* ==========================================
WEEK TABS
========================================== */

function initializeWeekTabs(){

const buttons =
document.querySelectorAll(
".week-btn"
);

buttons.forEach(btn => {

```
btn.addEventListener("click", () => {

  buttons.forEach(b =>
    b.classList.remove("active")
  );

  btn.classList.add("active");

  currentWeek =
    Number(btn.dataset.week);

  renderTrainingWeek(
    currentWeek
  );

});
```

});

}

/* ==========================================
TRAINING PAGE
========================================== */

function renderTrainingWeek(week){

const container =
document.getElementById(
"trainingContent"
);

const plan =
trainingPlan[week];

container.innerHTML = `

${createLowerBodyCard(week)}

${createRunCard(
week,
"Tuesday Intervals",
plan.intervals,
"intervals"
)}

${createUpperBodyCard(week)}

${createRunCard(
week,
"Thursday Tempo",
plan.tempo,
"tempo"
)}

${createWorkCapacityCard(week)}

${createRunCard(
week,
"Saturday Long Run",
plan.longRun,
"longrun"
)}

${createSwimCard(week)}

`;

initializeInputs();

}

/* ==========================================
INPUT AUTOSAVE
========================================== */

function initializeInputs(){

const inputs =
document.querySelectorAll(
"[data-save]"
);

inputs.forEach(input => {

```
input.addEventListener(
  "change",
  saveField
);

input.addEventListener(
  "input",
  saveField
);
```

});

}

function saveField(event){

const key =
event.target.dataset.save;

const value =
event.target.value;

let workout =
appData.workouts.find(
w => w.key === key
);

if(!workout){

```
workout = {
  key:key,
  value:value,
  date:new Date().toISOString()
};

appData.workouts.push(
  workout
);
```

} else {

```
workout.value = value;
```

}

saveData();

}

/* ==========================================
CARD BUILDERS
========================================== */

function createRunCard(
week,
title,
prescribed,
key
){

return `

<div class="card">

<h2>${title}</h2>

<p>
<strong>Prescribed:</strong>
${prescribed}
</p>

<label>
Distance (miles)
</label>

<input
type="number"
step="0.01"
data-save="w${week}_${key}_distance"

>

<label>
Time (minutes)
</label>

<input
type="number"
step="0.01"
data-save="w${week}_${key}_time"

>

<label>
Notes
</label>

<textarea
data-save="w${week}_${key}_notes">
</textarea>

</div>
`;

}

function createLowerBodyCard(week){

return `

<div class="card">

<h2>
Monday – Lower Body
</h2>

${buildLift(
week,
"squat",
"Back Squat",
5
)}

${buildLift(
week,
"rdl",
"Romanian Deadlift",
4
)}

</div>
`;

}

function createUpperBodyCard(week){

return `

<div class="card">

<h2>
Wednesday – Upper Body
</h2>

${buildLift(
week,
"bench",
"Bench Press",
4
)}

${buildLift(
week,
"ohp",
"Overhead Press",
4
)}

${buildLift(
week,
"rows",
"DB Rows",
4
)}

</div>
`;

}

function createWorkCapacityCard(week){

return `

<div class="card">

<h2>
Friday – Work Capacity
</h2>

${buildLift(
week,
"deadlift",
"Deadlift",
5
)}

</div>
`;

}

function createSwimCard(week){

return `

<div class="card">

<h2>
Swim Work
</h2>

<label>
Distance
</label>

<input
data-save="w${week}_swim_distance"

>

<label>
Time
</label>

<input
data-save="w${week}_swim_time"

>

<label>
Notes
</label>

<textarea
data-save="w${week}_swim_notes">
</textarea>

</div>
`;

}

/* ==========================================
LIFT TEMPLATE
========================================== */

function buildLift(
week,
key,
title,
sets
){

let html =
`<h3>${title}</h3>`;

for(let i=1;i<=sets;i++){

html += `

<div>

Set ${i}

<input
placeholder="Weight"
data-save="w${week}*${key}*${i}_weight"

>

<input
placeholder="Reps"
data-save="w${week}*${key}*${i}_reps"

>

</div>

`;

}

return html;

}
