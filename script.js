const quizData = {
    web: [
        { q: "HTML stands for?", a: "HyperText Markup Language", b: "Hyper Tool", c: "High Tech", d: "Home Link", ans: "a" },
        { q: "Which tag is used for Links?", a: "img", b: "a", c: "link", d: "src", ans: "b" },
        { q: "What is CSS used for?", a: "Database", b: "Logic", c: "Styling", d: "Server", ans: "c" },
        { q: "Inside which HTML element do we put JS?", a: "js", b: "javascript", c: "script", d: "code", ans: "c" },
        { q: "React is a...", a: "CSS library", b: "JS library", c: "Database", d: "Browser", ans: "b" }
    ],
    ai: [
        { q: "Full form of AI?", a: "Auto Intelligence", b: "Artificial Intelligence", c: "Apple Intel", d: "None", ans: "b" },
        { q: "Python is famous for?", a: "Styling", b: "Data Science/AI", c: "Browsers", d: "Hardware", ans: "b" },
        { q: "Who is the CEO of OpenAI?", a: "Elon Musk", b: "Sam Altman", c: "Bill Gates", d: "Sundar Pichai", ans: "b" },
        { q: "What is a Neural Network?", a: "Computer Wire", b: "AI Brain model", c: "Internet Cable", d: "Virus", ans: "b" },
        { q: "Can AI feel emotions currently?", a: "Yes", b: "No", c: "Sometimes", d: "Only GPT-4", ans: "b" }
    ],
    cpp: [
        { q: "Who developed C++?", a: "James Gosling", b: "Bjarne Stroustrup", c: "Dennis Ritchie", d: "Mark Zuckerberg", ans: "b" },
        { q: "Input operator in C++?", a: "cout <<", b: "printf()", c: "cin >>", d: "scanf()", ans: "c" },
        { q: "Correct extension for C++?", a: ".cplus", b: ".cp", c: ".cpp", d: ".exe", ans: "c" },
        { q: "Which is a Pillar of OOP?", a: "Inheritance", b: "Segmentation", c: "Interpretation", d: "Iteration", ans: "a" },
        { q: "Keyword to create a class?", a: "struct", b: "className", c: "class", d: "object", ans: "c" }
    ],
    cyber: [
        { q: "What does WWW stand for?", a: "World Wide Web", b: "Web World Wide", c: "World Wide Weapon", d: "World Wide Work", ans: "a" },
        { q: "A 'Strong' password is?", a: "123456", b: "password", c: "Admin@123!", d: "MyName", ans: "c" },
        { q: "What is a Firewall?", a: "Heating PC", b: "Network Security", c: "Faster Internet", d: "Deleting Files", ans: "b" },
        { q: "Ethical Hackers are?", a: "Black Hat", b: "Red Hat", c: "White Hat", d: "Grey Hat", ans: "c" },
        { q: "What is Phishing?", a: "Catching fish", b: "Fake emails/links", c: "RAM Speed", d: "Installing Apps", ans: "b" }
    ],
    friends: [
        { q: "Best quality of a friend?", a: "Lying", b: "Trust", c: "Money", d: "Angry", ans: "b" },
        { q: "A true friend...", a: "Leaves you", b: "Stays with you", c: "Hates you", d: "Steals", ans: "b" },
        { q: "Friendship day month?", a: "January", b: "August", c: "December", d: "May", ans: "b" },
        { q: "BFF means?", a: "Best Friend Forever", b: "Big Fat Friend", c: "Best Food Fan", d: "Boy Friend", ans: "a" },
        { q: "Is listening important?", a: "No", b: "Yes", c: "Maybe", d: "Never", ans: "b" }
    ]
};

let currentSet = [], currentQIndex = 0, userPicks = [], selectedOption = null;

// Selectors
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const homeView = document.getElementById('home-view');
const quizView = document.getElementById('quiz-view');
const resultView = document.getElementById('result-view');
const optionsList = document.getElementById('options-list');
const nextBtn = document.getElementById('next-btn');

// Menu Interaction
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuBtn.classList.toggle('open');
});

function startQuiz(cat) {
    currentSet = quizData[cat];
    currentQIndex = 0; userPicks = [];
    
    sidebar.classList.remove('active');
    menuBtn.classList.remove('open');
    
    gsap.to(".hero-card", { opacity: 0, y: -20, duration: 0.4 });
    setTimeout(() => {
        homeView.classList.add('hidden');
        resultView.classList.add('hidden');
        quizView.classList.remove('hidden');
        showQuestion();
    }, 400);
}

function showQuestion() {
    selectedOption = null;
    const data = currentSet[currentQIndex];
    
    gsap.fromTo("#main-card", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.4 });
    
    document.getElementById('question-text').innerText = data.q;
    document.getElementById('progress-text').innerText = `Question ${currentQIndex + 1}/${currentSet.length}`;
    
    optionsList.innerHTML = `
        <div class="option" onclick="pick('a', this)">${data.a}</div>
        <div class="option" onclick="pick('b', this)">${data.b}</div>
        <div class="option" onclick="pick('c', this)">${data.c}</div>
        <div class="option" onclick="pick('d', this)">${data.d}</div>
    `;
}

function pick(letter, el) {
    selectedOption = letter;
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
}

nextBtn.addEventListener('click', () => {
    if(!selectedOption) return gsap.to("#main-card", { x: 10, repeat: 5, yoyo: true, duration: 0.05 });

    userPicks.push(selectedOption);
    currentQIndex++;

    if(currentQIndex < currentSet.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizView.classList.add('hidden');
    resultView.classList.remove('hidden');
    
    let summaryHTML = "";
    currentSet.forEach((item, i) => {
        const isCorrect = userPicks[i] === item.ans;
        summaryHTML += `
            <div style="border-left: 4px solid ${isCorrect ? '#4ade80' : '#f87171'}; padding: 15px; background: rgba(255,255,255,0.02); margin-bottom: 10px; border-radius: 10px;">
                <p><strong>${item.q}</strong></p>
                <p style="color: ${isCorrect ? '#4ade80' : '#f87171'}">You: ${item[userPicks[i]]}</p>
            </div>
        `;
    });
    document.getElementById('summary-container').innerHTML = summaryHTML;
}