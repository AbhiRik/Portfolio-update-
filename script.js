// === Scroll-triggered Fade-in & Slide-up Animation ===
function revealOnScroll() {
  const elements = document.querySelectorAll('.scroll-animate');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);
// Progress bar animation for skills section
function animateSkillBars() {
    const bars = document.querySelectorAll('.progress-bar-inner');
    const labels = document.querySelectorAll('.progress-label');
    bars.forEach((bar, i) => {
        bar.style.width = '0%';
        setTimeout(() => {
            const percent = bar.getAttribute('data-progress');
            bar.style.transition = 'none';
            void bar.offsetWidth; // force reflow
            bar.style.transition = 'width 1.2s cubic-bezier(.4,2,.6,1)';
            bar.style.width = percent + '%';
        }, 80 * i);
    });
    // Optionally, animate the label number (if you want a counting effect)
    labels.forEach((label, i) => {
        const percent = parseInt(label.textContent);
        label.textContent = '0%';
        let current = 0;
        const bar = bars[i];
        setTimeout(() => {
            const interval = setInterval(() => {
                if (current < percent) {
                    current++;
                    label.textContent = current + '%';
                } else {
                    label.textContent = percent + '%';
                    clearInterval(interval);
                }
            }, 1200 / percent);
        }, 80 * i + 200);
    });
}

// Listen for nav click to #skills and trigger animation
document.addEventListener('DOMContentLoaded', function() {
    const navSkills = document.querySelector('nav a[href="#skills"]');
    const skillsSection = document.getElementById('skills');
    let lastScroll = 0;
    if (navSkills && skillsSection) {
        navSkills.addEventListener('click', function(e) {
            // Wait for scroll to finish, then animate
            setTimeout(() => {
                const rect = skillsSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateSkillBars();
                }
            }, 400);
        });
    }
    // Also animate on scroll into view (for direct scroll or refresh)
    function onScroll() {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            animateSkillBars();
            window.removeEventListener('scroll', onScroll);
        }
    }
    window.addEventListener('scroll', onScroll);
});
// --- Skills Progress Bar Animation ---
function animateProgressBar(bar, target, duration = 1200) {
    let start = 0;
    let startTime = null;
    function animateStep(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        bar.style.width = value + '%';
        if (progress < 1) {
            requestAnimationFrame(animateStep);
        } else {
            bar.style.width = target + '%';
        }
    }
    requestAnimationFrame(animateStep);
}

function triggerSkillsAnimation() {
    const mainBars = document.querySelectorAll('.progress-bar-inner');
    mainBars.forEach(bar => {
        const target = parseInt(bar.getAttribute('data-progress'), 10);
        bar.style.width = '0%';
        animateProgressBar(bar, target);
    });
    const subBars = document.querySelectorAll('.sub-progress-bar-inner');
    subBars.forEach(bar => {
        const target = parseInt(bar.getAttribute('data-progress'), 10);
        bar.style.width = '0%';
        animateProgressBar(bar, target, 1000);
    });
}

let skillsAnimated = false;
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight - 80 &&
        rect.bottom > 80
    );
}

window.addEventListener('scroll', function() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (skillsSection && isElementInViewport(skillsSection)) {
        triggerSkillsAnimation();
        skillsAnimated = true;
    }
});

// Also trigger if already in view on load
window.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection && isElementInViewport(skillsSection)) {
        triggerSkillsAnimation();
        skillsAnimated = true;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });



























    const typingElement = document.getElementById('typing');
    const words = ["Creative Thinker","Web Developer","Frontend Developer","Youtuber"];
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = '';
    let currentLetters = '';
    let isDeleting = false;
    function type() {
        if (isDeleting) {
            currentLetters = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentLetters = currentWord.substring(0, letterIndex + 1);
            letterIndex++;
        }

        typingElement.innerHTML = currentLetters;

        let typeSpeed = 200;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && letterIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex++;
            if (wordIndex === words.length) {
                wordIndex = 0;
            }
            currentWord = words[wordIndex];
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    currentWord = words[wordIndex];
    type();
});

// === Simple Rule-based Chatbot for Abhirup Bag ===
const botData = {
  name: "Abhirup Bag",
  education: "I scored 92% in 10th (ICSE), 73% in 12th (CBSE), and I'm currently pursuing BCA at IEM, Kolkata.",
  projects: [
    "MindSpeak (an EEG-based communication aid)",
    "DEChain (a blockchain-based digital evidence system)",
    "Sentiment Analysis",
    "Sign Language to Text"
  ],
  hobbies: "I enjoy drawing, painting, and exploring origami.",
  strength: "I believe my strengths are high patience, focus, and creativity.",
  goal: "My goal is to become a skilled software developer.",
  internships: "I interned as an AI intern at Academor, where I worked on Python-based AI projects.",
  technologies: "I'm comfortable with Python, JavaScript, React, Node.js, MongoDB, Machine Learning, and Blockchain."
};

function askBot(question) {
  const q = question.toLowerCase();
  if (q.includes("hobby") || q.includes("hobbies") || q.includes("free time")) {
    return botData.hobbies;
  }
  if (q.includes("education") || q.includes("study") || q.includes("school") || q.includes("college") || q.includes("background")) {
    return botData.education;
  }
  if (q.includes("project")) {
    return "Here are some of my projects: " + botData.projects.join(", ") + ".";
  }
  if (q.includes("goal") || q.includes("future")) {
    return botData.goal;
  }
  if (q.includes("strength")) {
    return botData.strength;
  }
  if (q.includes("intern") || q.includes("work experience")) {
    return botData.internships;
  }
  if (q.includes("technology") || q.includes("tech stack") || q.includes("language") || q.includes("programming")) {
    return botData.technologies;
  }
  if (q.includes("interesting") || q.includes("fact") || q.includes("about you")) {
    return "Something interesting about me: I love combining creativity with technology, whether it's through art or building innovative software solutions!";
  }
  if (q.includes("name") || q.includes("who are you")) {
    return "I'm Abhirup Bag, a passionate software developer and student.";
  }
  return "I'm happy to help! You can ask me about my hobbies, education, projects, goals, or anything else about me.";
}

// === Chatbot UI Logic ===
document.addEventListener('DOMContentLoaded', function() {
  const bubble = document.getElementById('chatbot-bubble');
  const windowEl = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');
  const messages = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-msg ' + sender;
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'bubble';
    bubbleDiv.textContent = text;
    msgDiv.appendChild(bubbleDiv);
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const userText = input.value.trim();
    if (!userText) return;
    appendMessage(userText, 'user');
    input.value = '';
    // Show typing animation
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-msg bot';
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'bubble';
    bubbleDiv.innerHTML = '<span class="chatbot-typing"><span>.</span><span>.</span><span>.</span></span>';
    typingDiv.appendChild(bubbleDiv);
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
    setTimeout(() => {
      typingDiv.remove();
      const botReply = askBot(userText);
      appendMessage(botReply, 'bot');
    }, 3000);
  }

  bubble.addEventListener('click', () => {
    windowEl.style.display = 'flex';
    bubble.style.display = 'none';
    setTimeout(() => input.focus(), 200);
    if (messages.childElementCount === 0) {
      appendMessage('Hi! I\'m Abhirup\'s AI assistant. Ask me anything about my background, projects, or interests!', 'bot');
    }
  });
  closeBtn.addEventListener('click', () => {
    windowEl.style.display = 'none';
    bubble.style.display = 'block';
  });
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSend();
  });
});
