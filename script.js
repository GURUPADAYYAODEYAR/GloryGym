// script.js – Glory Gym Workout Suggester
// -------------------------------------------------
// Static knowledge base (partial – 9 core combos). Add more as needed.
const workoutDB = {
  // Beginner combos
  "Beginner_Build Muscle_None": {
    warmup: "Arm circles, torso twists, leg swings (5 min)",
    exercises: [
      { name: "Bodyweight Squats", sets: 3, reps: "12-15", rest: "45s" },
      { name: "Push‑ups (knee or full)", sets: 3, reps: "8-12", rest: "45s" },
      { name: "Walking Lunges", sets: 3, reps: "10 per leg", rest: "45s" },
      { name: "Plank", sets: 3, reps: "20‑30 sec", rest: "30s" }
    ],
    cooldown: "Static stretch – quads, hamstrings, chest"
  },
  "Beginner_Lose Fat_None": {
    warmup: "Jumping jacks, high knees (5 min)",
    exercises: [
      { name: "Burpees", sets: 3, reps: "10", rest: "45s" },
      { name: "Mountain climbers", sets: 3, reps: "30 sec", rest: "45s" },
      { name: "Bodyweight Squats", sets: 3, reps: "15", rest: "45s" },
      { name: "Plank", sets: 3, reps: "30 sec", rest: "30s" }
    ],
    cooldown: "Full‑body stretch – hold each 20 sec"
  },
  "Beginner_General Fitness_None": {
    warmup: "Dynamic stretch circuit (5 min)",
    exercises: [
      { name: "Bodyweight Squats", sets: 2, reps: "12-15", rest: "45s" },
      { name: "Push‑ups", sets: 2, reps: "8-10", rest: "45s" },
      { name: "Glute Bridge", sets: 2, reps: "12-15", rest: "45s" },
      { name: "Plank", sets: 2, reps: "30 sec", rest: "30s" }
    ],
    cooldown: "Gentle stretch – focus on hips and shoulders"
  },
  // Intermediate combos (using dumbbells)
  "Intermediate_Build Muscle_Dumbbells": {
    warmup: "Light cardio + shoulder rolls (5 min)",
    exercises: [
      { name: "Goblet Squat", sets: 4, reps: "8‑12", rest: "60s" },
      { name: "Dumbbell Bench Press", sets: 4, reps: "8‑12", rest: "60s" },
      { name: "Bent‑over Row", sets: 4, reps: "8‑12", rest: "60s" },
      { name: "Dumbbell Romanian Deadlift", sets: 4, reps: "8‑12", rest: "60s" }
    ],
    cooldown: "Stretch – hamstring, chest, upper back"
  },
  "Intermediate_Lose Fat_Dumbbells": {
    warmup: "Jump rope (5 min)",
    exercises: [
      { name: "Dumbbell Thrusters", sets: 3, reps: "12", rest: "45s" },
      { name: "Renegade Rows", sets: 3, reps: "10 per side", rest: "45s" },
      { name: "Dumbbell Swings", sets: 3, reps: "15", rest: "45s" },
      { name: "Burpees", sets: 3, reps: "10", rest: "45s" }
    ],
    cooldown: "Full‑body stretch – hold 20‑30 sec each"
  },
  "Intermediate_General Fitness_Dumbbells": {
    warmup: "Dynamic mobility (5 min)",
    exercises: [
      { name: "Dumbbell Lunges", sets: 3, reps: "10 per leg", rest: "45s" },
      { name: "Dumbbell Chest Press", sets: 3, reps: "10‑12", rest: "45s" },
      { name: "Single‑arm Row", sets: 3, reps: "10 per side", rest: "45s" },
      { name: "Plank with Row", sets: 3, reps: "30 sec", rest: "30s" }
    ],
    cooldown: "Stretch – focus on hips, chest, back"
  },
  // Advanced combos (full gym access)
  "Advanced_Build Muscle_Full Gym Access": {
    warmup: "Treadmill jog 5 min + mobility",
    exercises: [
      { name: "Barbell Back Squat", sets: 5, reps: "5", rest: "90s" },
      { name: "Deadlift", sets: 5, reps: "5", rest: "90s" },
      { name: "Bench Press", sets: 5, reps: "5", rest: "90s" },
      { name: "Pull‑up", sets: 5, reps: "6‑8", rest: "90s" }
    ],
    cooldown: "Static stretch – quads, chest, lats"
  },
  "Advanced_Lose Fat_Full Gym Access": {
    warmup: "Rowing machine 5 min",
    exercises: [
      { name: "HIIT Treadmill (30‑sec sprint/30‑sec walk)", sets: 10, reps: "", rest: "" },
      { name: "Kettlebell Swings", sets: 4, reps: "15", rest: "60s" },
      { name: "Leg Press", sets: 4, reps: "12", rest: "60s" },
      { name: "Cable Woodchoppers", sets: 4, reps: "12 per side", rest: "60s" }
    ],
    cooldown: "Full‑body stretch – hold 30 sec each"
  },
  "Advanced_General Fitness_Full Gym Access": {
    warmup: "Cycling 5 min",
    exercises: [
      { name: "Leg Press", sets: 3, reps: "12", rest: "60s" },
      { name: "Chest Press Machine", sets: 3, reps: "12", rest: "60s" },
      { name: "Lat Pulldown", sets: 3, reps: "12", rest: "60s" },
      { name: "Seated Row", sets: 3, reps: "12", rest: "60s" }
    ],
    cooldown: "Stretch – hamstrings, chest, shoulders"
  }
};

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check local storage for theme preference
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    theme = 'light';
  } else {
    theme = 'dark';
  }
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
  if (theme === 'light') {
    themeIcon.classList.remove('bi-moon-stars-fill');
    themeIcon.classList.add('bi-sun-fill');
  } else {
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-stars-fill');
  }
}

// Helper to build DB key from user selections
function buildKey(level, goal, equipment) {
  return `${level}_${goal}_${equipment}`;
}

// Duration handling – base routines are ~30 min. If user asks longer, suggest repeats.
function adjustForDuration(routine, selectedMinutes) {
  const baseMinutes = 30; // approximate length of the stored routine
  if (selectedMinutes <= baseMinutes) return routine;
  const extra = selectedMinutes - baseMinutes;
  const repeats = Math.floor(extra / baseMinutes) + 1; // repeat circuit
  const note = `This routine (~${baseMinutes} min) can be repeated ${repeats} times to reach ~${repeats * baseMinutes} min.`;
  return { ...routine, extraNote: note };
}

// Fallback routine used when a combo is missing
const fallbackRoutine = {
  warmup: "Dynamic warm‑up (5 min)",
  exercises: [
    { name: "Bodyweight Squats", sets: 3, reps: "12‑15", rest: "45s" },
    { name: "Push‑ups", sets: 3, reps: "8‑12", rest: "45s" },
    { name: "Lunges", sets: 3, reps: "10 per leg", rest: "45s" },
    { name: "Plank", sets: 3, reps: "30 sec", rest: "30s" }
  ],
  cooldown: "Full‑body static stretch"
};

// DOM elements
const form = document.getElementById("workoutForm");
const outputDiv = document.getElementById("resultContainer");
const submitBtn = document.getElementById("suggestBtn");

// Update duration display as slider moves
const durationInput = document.getElementById('duration');
const durationDisplay = document.getElementById('durationValue');
durationInput.addEventListener('input', () => {
  durationDisplay.textContent = durationInput.value;
});

// Frequency button handling
const freqButtons = document.querySelectorAll('.freq-btn');
freqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    freqButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerText = "Generating...";

  const level = document.getElementById("fitnessLevel").value;
  const goal = document.getElementById("primaryGoal").value;
  const equipment = document.getElementById("equipment").value;
  const duration = parseInt(document.getElementById("duration").value, 10);
  const freq = document.querySelector('.freq-btn.active')?.dataset.freq || '3';

  const key = buildKey(level, goal, equipment);
  let routine = workoutDB[key] || fallbackRoutine;
  // Add note if fallback was used
  if (!workoutDB[key]) {
    routine = { ...routine, extraNote: "Displaying fallback routine (general fitness – bodyweight)." };
  }

  // Adjust for longer duration
  if (duration > 30) {
    routine = adjustForDuration(routine, duration);
  }
  // Attach frequency info
  routine = { ...routine, frequency: freq };

  renderRoutine(routine, duration);
  submitBtn.disabled = false;
  submitBtn.innerText = "Suggest My Workout";
});

function renderRoutine(routine, selectedDuration) {
  // Clear previous output and show container
  outputDiv.innerHTML = "";
  outputDiv.classList.remove("hidden");
  const card = document.createElement("div");
  card.className = "glass-card shadow-lg";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body p-4";

  const title = document.createElement("h4");
  title.className = "card-title text-center mb-4";
  title.innerHTML = "<span style='color: var(--accent-cyan); font-family: Orbitron, monospace; font-weight: 700;'>Your Personalized Workout</span>";
  cardBody.appendChild(title);

  // Warm‑up
  const warmupEl = document.createElement("p");
  warmupEl.innerHTML = `<strong>Warm‑up:</strong> ${routine.warmup}`;
  cardBody.appendChild(warmupEl);

  // Exercises list
  const list = document.createElement("ul");
  list.className = "list-group list-group-flush mb-3";
  routine.exercises.forEach((ex, idx) =>
    {
      const li = document.createElement("li");
      li.className = "list-group-item bg-transparent border-0";
      li.style.color = "var(--text-primary)";
      li.innerHTML = `<strong>${idx + 1}. ${ex.name}</strong> – ${ex.sets} sets × ${ex.reps} reps, rest ${ex.rest}`;
      list.appendChild(li);
    });
  cardBody.appendChild(list);

  // Cool‑down
  const cd = document.createElement("p");
  cd.innerHTML = `<strong>Cooldown:</strong> ${routine.cooldown}`;
  cardBody.appendChild(cd);

  // Duration note
  const note = document.createElement("p");
  note.className = "mt-3 text-muted";
  note.innerHTML = `Estimated routine length: ~30 min. Your target duration: <strong>${selectedDuration} min</strong>`;
  if (routine.extraNote) {
    note.innerHTML += `<br>${routine.extraNote}`;
  }
  cardBody.appendChild(note);
  // Frequency note
  if (routine.frequency) {
    const freqEl = document.createElement('p');
    freqEl.innerHTML = `<strong>Frequency:</strong> ${routine.frequency} days/week`;
    cardBody.appendChild(freqEl);
  }

  // Motivational footer
  const footer = document.createElement("div");
  footer.className = "text-center mt-4";
  footer.innerHTML = "<em>Stay strong. ENGINEERED by <strong>TECHFORGE | CODE‑V</strong></em>";
  cardBody.appendChild(footer);

  card.appendChild(cardBody);
  outputDiv.appendChild(card);
}




// Fallback if JS disabled – not needed but kept for completeness
if (!window.document.getElementById) {
  console.error("Browser does not support required DOM methods.");
}

// End of script.js
