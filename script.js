// 🎨 Moving Gradient Background with subtle stars

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];

function initCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      alpha: Math.random()
    });
  }
}

window.addEventListener('resize', initCanvas);
initCanvas();

function animateBG() {
  // Radial gradient background shifting by hue
  let time = Date.now() * 0.0001;
  let hue = (time * 360) % 360;

  const grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
  grad.addColorStop(0, `hsl(${(hue + 120) % 360}, 50%, 10%)`);
  grad.addColorStop(1, `hsl(${hue}, 70%, 5%)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Draw stars with flickering
  stars.forEach(s => {
    s.y -= s.speed;
    if (s.y < 0) s.y = h;
    s.alpha += (Math.random() - 0.5) * 0.05;
    s.alpha = Math.min(1, Math.max(0.2, s.alpha));
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
    ctx.fill();
  });

  requestAnimationFrame(animateBG);
}
animateBG();

// -------- QUIZ DATA from user -----------

const quizData = {
  algorithm: [
    {question:"What is the time complexity of Binary Search?", options:["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer:1},
    {question:"Which algorithm finds the shortest path in a graph?", options:["Merge Sort", "Dijkstra's Algorithm", "Binary Search", "Linear Search"], answer:1},
    {question:"Which sorting algorithm uses divide and conquer?", options:["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], answer:2},
    {question:"Worst-case time complexity of Quick Sort?", options:["O(n)", "O(log n)", "O(n log n)", "O(n²)"], answer:3},
    {question:"Recursion must have a:", options:["Loop", "Array", "Base Case", "Pointer"], answer:2},
    {question:"Which algorithm tries all possible solutions?", options:["Greedy", "Divide & Conquer", "Brute Force", "Dynamic Programming"], answer:2},
    {question:"Linear search works best on:", options:["Sorted data only", "Unsorted data", "Binary Trees", "Graphs"], answer:1},
    {question:"Time complexity measures:", options:["Memory usage", "Execution time growth", "Code length", "CPU type"], answer:1},
    {question:"Which is NOT stable?", options:["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"], answer:2},
    {question:"Average case of Merge Sort?", options:["O(n)", "O(log n)", "O(n log n)", "O(n²)"], answer:2}
  ],
  datastructure: [
    {question:"Which structure follows FIFO?", options:["Stack", "Queue", "Tree", "Graph"], answer:1},
    {question:"Which structure follows LIFO?", options:["Queue", "Stack", "Array", "Linked List"], answer:1},
    {question:"Which uses nodes and pointers?", options:["Array", "Linked List", "Stack", "Queue"], answer:1},
    {question:"Best for hierarchical data?", options:["Array", "Tree", "Stack", "Queue"], answer:1},
    {question:"Used in recursion?", options:["Queue", "Array", "Stack", "Graph"], answer:2},
    {question:"Array elements stored:", options:["Randomly", "Sequentially in memory", "Tree format", "Graph format"], answer:1},
    {question:"Key-value fast lookup?", options:["Stack", "Hash Table", "Tree", "Queue"], answer:1},
    {question:"Linear structure?", options:["Graph", "Tree", "Stack", "Heap"], answer:2},
    {question:"Non-linear structure?", options:["Array", "Stack", "Tree", "Queue"], answer:2},
    {question:"First element in queue?", options:["Top", "Rear", "Front", "Head"], answer:2}
  ],
  avl: [
    {question:"AVL tree is a type of:", options:["Graph", "Binary Search Tree", "Heap", "Linked List"], answer:1},
    {question:"Balance factor is:", options:["Left height - Right height", "Right - Left", "Total nodes", "Depth"], answer:0},
    {question:"Valid balance factors?", options:["-1, 0, 1", "-2, 0, 2", "0, 1, 2", "1, 2, 3"], answer:0},
    {question:"Fix Left-Left case?", options:["Left Rotation", "Right Rotation", "Double Rotation", "No rotation"], answer:1},
    {question:"Search time complexity?", options:["O(n)", "O(log n)", "O(n²)", "O(1)"], answer:1},
    {question:"Fix Right-Right case?", options:["Left Rotation", "Right Rotation", "LR Rotation", "RL Rotation"], answer:0},
    {question:"AVL is:", options:["Self-balancing", "Complete", "Full", "Threaded"], answer:0},
    {question:"Maximum height is:", options:["O(n)", "O(log n)", "O(n log n)", "O(1)"], answer:1},
    {question:"Invented by:", options:["Turing", "Adelson-Velsky & Landis", "Dijkstra", "Knuth"], answer:1},
    {question:"AVL maintains:", options:["Sorting only", "Balance automatically", "Heap property", "Graph rules"], answer:1}
  ],
  binary: [
    {question:"Binary tree node has at most:", options:["1 child", "2 children", "3 children", "Unlimited"], answer:1},
    {question:"Top node is called:", options:["Leaf", "Root", "Parent", "Child"], answer:1},
    {question:"Left, Root, Right traversal?", options:["Preorder", "Postorder", "Inorder", "Level order"], answer:2},
    {question:"Full binary tree has:", options:["All nodes 2 children", "0 or 2 children", "Only one child", "No children"], answer:1},
    {question:"Max nodes at level L?", options:["2^L", "L²", "2L", "L"], answer:0},
    {question:"Height of single node tree?", options:["0", "1", "2", "-1"], answer:0},
    {question:"Leaf nodes have:", options:["Two children", "One child", "No children", "Parent only"], answer:2},
    {question:"BST property:", options:["Left > Root", "Right < Root", "Left < Root < Right", "No rule"], answer:2},
    {question:"Level order uses:", options:["Stack", "Queue", "Array", "Tree"], answer:1},
    {question:"Max nodes of height h?", options:["2^h - 1", "h²", "h", "2h"], answer:0}
  ]
};

// --- Theme colors & fonts per topic ---

const themeColors = {
  algorithm: {
    bg: '#0D1B2A',
    button: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
    font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  datastructure: {
    bg: '#114B5F',
    button: 'linear-gradient(45deg, #11998e, #38ef7d)',
    font: "'Arial Rounded MT Bold', cursive"
  },
  avl: {
    bg: '#7B3F00',
    button: 'linear-gradient(45deg, #f7971e, #ffd200)',
    font: "'Georgia', serif"
  },
  binary: {
    bg: '#3C096C',
    button: 'linear-gradient(45deg, #7b4397, #dc2430)',
    font: "'Courier New', monospace"
  }
};

let currentQuiz = [];
let index = 0;
let score = 0;
let currentTopic = "";

// Apply theme dynamically
function applyTheme(topic) {
  currentTopic = topic;
  const theme = themeColors[topic];
  document.body.style.backgroundColor = theme.bg;
  document.body.style.fontFamily = theme.font;

  // Style buttons dynamically
  document.querySelectorAll("button").forEach(btn => {
    btn.style.background = theme.button;
    btn.style.boxShadow = `0 3px 10px ${theme.button.split(',')[1].replace(')', ', 0.7)')}`;
  });

  // Also style active card background (slightly transparent)
  document.querySelectorAll(".card").forEach(card => {
    card.style.backgroundColor = theme.bg + 'cc'; // 80% opacity
  });
}

// --- Quiz controls ---

function startGame(topic) {
  applyTheme(topic);
  currentQuiz = quizData[topic];
  index = 0;
  score = 0;
  showCard("quiz");
  loadQuestion();
}

function loadQuestion() {
  const q = currentQuiz[index];
  document.getElementById("progress").innerText = `Question ${index + 1} / ${currentQuiz.length}`;
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("question").innerText = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.options = q.options || q.a || q.answers || []; // fallback if different keys (just safe)
  const options = q.options.length ? q.options : (q.a ? q.a : []);

  (options.length ? options : q.options).forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = currentTopic;
    btn.onclick = () => checkAnswer(i);
    answersDiv.appendChild(btn);
  });
  document.getElementById("nextBtn").style.display = "none";
}

function checkAnswer(selected) {
  const correct = currentQuiz[index].answer;
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    buttons[selected].style.backgroundColor = "#00e676"; // green
    score++;
  } else {
    buttons[selected].style.backgroundColor = "#ff1744"; // red
    buttons[correct].style.backgroundColor = "#00e676";
  }
  document.getElementById("score").innerText = `Score: ${score}`;
  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  index++;
  if (index < currentQuiz.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showCard("result");
  document.getElementById("finalScore").innerText =
    `🎉 You scored ${score} out of ${currentQuiz.length} on ${capitalize(currentTopic)}!`;
}

function goMenu() {
  showCard("menu");
  // Reset buttons to default style for menu
  document.querySelectorAll("button").forEach(btn => {
    btn.style.background = '';
    btn.style.boxShadow = '';
  });
  document.body.style.backgroundColor = '#111';
  document.body.style.fontFamily = "'Comic Sans MS', cursive";
}

function showCard(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}
