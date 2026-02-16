// ---------- STARFIELD AND METEORS ----------
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for(let i=0;i<200;i++){
  stars.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, size:Math.random()*1.5+0.5, speed:Math.random()*0.3+0.1, alpha:Math.random()});
}
let meteors = [];

function animate(){
  const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2,0,canvas.width/2,canvas.height/2,canvas.width);
  grad.addColorStop(0,"#0a0a0a"); grad.addColorStop(1,"#000");
  ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);

  stars.forEach(s=>{
    s.y -= s.speed; if(s.y<0) s.y=canvas.height;
    s.alpha += (Math.random()-0.5)*0.02;
    if(s.alpha>1)s.alpha=1; if(s.alpha<0.2)s.alpha=0.2;
    ctx.fillStyle = `rgba(102,255,204,${s.alpha})`; ctx.fillRect(s.x,s.y,s.size,s.size);
  });

  if(Math.random()<0.008){ meteors.push({x:Math.random()*canvas.width, y:canvas.height+20, size:2+Math.random()*2, speed:3+Math.random()*1.5, trail:[]}); }
  meteors.forEach((m,i)=>{
    m.trail.push({x:m.x,y:m.y}); if(m.trail.length>10)m.trail.shift();
    m.x -= m.speed*0.3; m.y -= m.speed;
    for(let j=0;j<m.trail.length;j++){ const p=m.trail[j]; ctx.fillStyle = `rgba(255,165,0,${j/m.trail.length})`; ctx.fillRect(p.x,p.y,m.size*2,m.size/2);}
    if(m.x<0 || m.y<0) meteors.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });


// ---------- QUIZ LOGIC ----------
let quiz, i, score;
function start(type){ quiz = data[type]; i=0; score=0; show("quiz"); load(); }
function load(){ /* same as previous load() */ }
function check(btn, idx, correctIdx){ /* same as previous check() */ }
function next(){ i++; if(i<quiz.length) load(); else end(); }
function end(){ show("result"); document.getElementById("final").textContent=`Final Score: ${score} / ${quiz.length}`; }
function menu(){ show("menu"); }
function show(id){ document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active")); document.getElementById(id).classList.add("active"); }

// ---------- QUIZ LOGIC ----------
// ---------- QUIZ DATA ----------
const quizData = {

  algorithm: [
    { question: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1 },

    { question: "Which algorithm finds the shortest path in a graph?",
      options: ["Merge Sort", "Dijkstra's Algorithm", "Binary Search", "Linear Search"],
      answer: 1 },

    { question: "Which sorting algorithm uses Divide and Conquer?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
      answer: 2 },

    { question: "Worst-case time complexity of Quick Sort?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      answer: 3 },

    { question: "Recursion must have a:",
      options: ["Loop", "Array", "Base Case", "Pointer"],
      answer: 2 },

    { question: "Which algorithm tries all possible solutions?",
      options: ["Greedy", "Divide & Conquer", "Brute Force", "Dynamic Programming"],
      answer: 2 },

    { question: "Linear search works best on:",
      options: ["Sorted data only", "Unsorted data", "Binary Trees", "Graphs"],
      answer: 1 },

    { question: "Time complexity measures:",
      options: ["Memory usage", "Execution time growth", "Code length", "CPU type"],
      answer: 1 },

    { question: "Which is NOT stable?",
      options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
      answer: 2 },

    { question: "Average case of Merge Sort?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      answer: 2 }
  ],

  datastructure: [
    { question: "Which structure follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: 1 },

    { question: "Which structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: 1 },

    { question: "Which uses nodes and pointers?",
      options: ["Array", "Linked List", "Stack", "Queue"],
      answer: 1 },

    { question: "Best for hierarchical data?",
      options: ["Array", "Tree", "Stack", "Queue"],
      answer: 1 },

    { question: "Used in recursion?",
      options: ["Queue", "Array", "Stack", "Graph"],
      answer: 2 },

    { question: "Array elements are stored:",
      options: ["Randomly", "Sequentially in memory", "Tree format", "Graph format"],
      answer: 1 },

    { question: "Key-value fast lookup structure?",
      options: ["Stack", "Hash Table", "Tree", "Queue"],
      answer: 1 },

    { question: "Which is a linear data structure?",
      options: ["Graph", "Tree", "Stack", "Heap"],
      answer: 2 },

    { question: "Which is a non-linear structure?",
      options: ["Array", "Stack", "Tree", "Queue"],
      answer: 2 },

    { question: "First element of a queue is called:",
      options: ["Top", "Rear", "Front", "Head"],
      answer: 2 }
  ],

  avl: [
    { question: "AVL tree is a type of:",
      options: ["Graph", "Binary Search Tree", "Heap", "Linked List"],
      answer: 1 },

    { question: "Balance factor is:",
      options: ["Left height - Right height", "Right - Left", "Total nodes", "Depth"],
      answer: 0 },

    { question: "Valid balance factors are:",
      options: ["-1, 0, 1", "-2, 0, 2", "0, 1, 2", "1, 2, 3"],
      answer: 0 },

    { question: "Which rotation fixes Left-Left case?",
      options: ["Left Rotation", "Right Rotation", "Double Rotation", "None"],
      answer: 1 },

    { question: "Search time complexity in AVL tree:",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      answer: 1 },

    { question: "Which rotation fixes Right-Right case?",
      options: ["Left Rotation", "Right Rotation", "LR Rotation", "RL Rotation"],
      answer: 0 },

    { question: "AVL tree is:",
      options: ["Self-balancing", "Complete", "Full", "Threaded"],
      answer: 0 },

    { question: "Maximum height of AVL tree:",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1 },

    { question: "AVL was introduced by:",
      options: ["Turing", "Adelson-Velsky & Landis", "Dijkstra", "Knuth"],
      answer: 1 },

    { question: "AVL maintains:",
      options: ["Sorting only", "Balance automatically", "Heap property", "Graph rule"],
      answer: 1 }
  ],

  binary: [
    { question: "Binary tree node has at most:",
      options: ["1 child", "2 children", "3 children", "Unlimited"],
      answer: 1 },

    { question: "Top node of tree is called:",
      options: ["Leaf", "Root", "Parent", "Child"],
      answer: 1 },

    { question: "Left, Root, Right traversal is:",
      options: ["Preorder", "Postorder", "Inorder", "Level order"],
      answer: 2 },

    { question: "Full binary tree has:",
      options: ["All nodes 2 children", "0 or 2 children", "One child only", "No children"],
      answer: 1 },

    { question: "Maximum nodes at level L:",
      options: ["2^L", "L²", "2L", "L"],
      answer: 0 },

    { question: "Height of tree with one node:",
      options: ["0", "1", "2", "-1"],
      answer: 0 },

    { question: "Leaf nodes have:",
      options: ["Two children", "One child", "No children", "Parent only"],
      answer: 2 },

    { question: "Binary Search Tree property:",
      options: ["Left > Root", "Right < Root", "Left < Root < Right", "No rule"],
      answer: 2 },

    { question: "Level order traversal uses:",
      options: ["Stack", "Queue", "Array", "Tree"],
      answer: 1 },

    { question: "Maximum nodes of height h:",
      options: ["2^h - 1", "h²", "h", "2h"],
      answer: 0 }
  ]

};

