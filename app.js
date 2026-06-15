const STORAGE_KEY = "walker_training_v2";

let currentWeek = 1;

const trainingPlan = {
1:{intervals:"6×400m",tempo:"2 mi steady",longRun:"3 mi easy"},
2:{intervals:"8×400m",tempo:"2.5 mi tempo",longRun:"3.5 mi easy"},
3:{intervals:"5×800m",tempo:"3 mi tempo",longRun:"4 mi easy"},
4:{intervals:"6×800m",tempo:"3 mi tempo",longRun:"5 mi easy"},
5:{intervals:"4×1200m",tempo:"4 mi tempo",longRun:"5-6 mi easy"},
6:{intervals:"6×400m",tempo:"2 mi easy",longRun:"2 mi time trial"}
};

function loadData(){
try{
return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}catch{
return {};
}
}

function saveData(data){
localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

let dataStore = loadData();

document.addEventListener("DOMContentLoaded",()=>{

setupNavigation();
setupWeekTabs();
renderWeek(1);
updateDashboard();

});

function setupNavigation(){

const buttons=document.querySelectorAll(".bottom-nav button");

buttons.forEach(button=>{

```
button.addEventListener("click",()=>{

  buttons.forEach(b=>b.classList.remove("active"));
  button.classList.add("active");

  document
    .querySelectorAll(".screen")
    .forEach(screen=>screen.classList.remove("active"));

  const target=document.getElementById(
    button.dataset.screen
  );

  if(target){
    target.classList.add("active");
  }

});
```

});

}

function setupWeekTabs(){

document
.querySelectorAll(".week-btn")
.forEach(btn=>{

```
  btn.addEventListener("click",()=>{

    document
      .querySelectorAll(".week-btn")
      .forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");

    currentWeek=Number(btn.dataset.week);

    renderWeek(currentWeek);

  });

});
```

}

function renderWeek(week){

const container =
document.getElementById("trainingContent");

const plan=trainingPlan[week];

container.innerHTML=`

```
<div class="card">

  <h2>Monday - Lower Body</h2>

  ${liftBlock(week,"squat","Back Squat",5)}

  ${liftBlock(week,"rdl","Romanian Deadlift",4)}

</div>

<div class="card">

  <h2>Tuesday Intervals</h2>

  <p><strong>${plan.intervals}</strong></p>

  <input
    placeholder="Distance (mi)"
    data-save="w${week}_interval_distance">

  <input
    placeholder="Time (min)"
    data-save="w${week}_interval_time">

</div>

<div class="card">

  <h2>Wednesday Upper Body</h2>

  ${liftBlock(week,"bench","Bench Press",4)}

  ${liftBlock(week,"ohp","Overhead Press",4)}

</div>

<div class="card">

  <h2>Thursday Tempo</h2>

  <p><strong>${plan.tempo}</strong></p>

  <input
    placeholder="Distance (mi)"
    data-save="w${week}_tempo_distance">

  <input
    placeholder="Time (min)"
    data-save="w${week}_tempo_time">

</div>

<div class="card">

  <h2>Friday Work Capacity</h2>

  ${liftBlock(week,"deadlift","Deadlift",5)}

</div>

<div class="card">

  <h2>Saturday Long Run</h2>

  <p><strong>${plan.longRun}</strong></p>

  <input
    placeholder="Distance (mi)"
    data-save="w${week}_long_distance">

  <input
    placeholder="Time (min)"
    data-save="w${week}_long_time">

</div>

<div class="card">

  <h2>Sunday Swim</h2>

  <input
    placeholder="Distance"
    data-save="w${week}_swim_distance">

  <input
    placeholder="Time"
    data-save="w${week}_swim_time">

</div>
```

`;

loadSavedValues();
attachAutosave();

}

function liftBlock(week,key,title,sets){

let html=`<h3>${title}</h3>`;

for(let i=1;i<=sets;i++){

```
html+=`

  <input
    placeholder="Set ${i} Weight"
    data-save="w${week}_${key}_${i}_weight">

  <input
    placeholder="Set ${i} Reps"
    data-save="w${week}_${key}_${i}_reps">

`;
```

}

return html;

}

function attachAutosave(){

document
.querySelectorAll("[data-save]")
.forEach(input=>{

```
  input.addEventListener("input",()=>{

    dataStore[input.dataset.save]=input.value;

    saveData(dataStore);

    updateDashboard();

  });

});
```

}

function loadSavedValues(){

document
.querySelectorAll("[data-save]")
.forEach(input=>{

```
  input.value=
    dataStore[input.dataset.save] || "";

});
```

}

function updateDashboard(){

let miles=0;
let workouts=0;

Object.entries(dataStore).forEach(([key,val])=>{

```
if(
  key.includes("distance") &&
  !isNaN(parseFloat(val))
){
  miles+=parseFloat(val);
}

if(val!=="" && val!=null){
  workouts++;
}
```

});

document.getElementById("totalMiles").textContent =
miles.toFixed(1);

document.getElementById("completedWorkouts").textContent =
workouts;

}
