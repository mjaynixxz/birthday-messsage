// Code poem that will be typed out
const codePoem = `// A special program for Fateema Nasir

class Birthday {
    constructor(name, wishes) {
        this.name = name;
        this.wishes = wishes;
        this.happiness = Infinity;
        this.success = true;
    }

    celebrate() {
        console.log("🎉 Happy Birthday Fateema Nasir! 🎉");

        const blessings = {
            health: "optimal",
            joy: "unlimited",
            dreams: "achieved",
            love: "abundant"
        };

        return blessings;
    }

    makeWish() {
        const wishes = [
            "May your life compile without errors",
            "May your path be bug-free",
            "May your happiness be in production",
            "May success be your default state"
        ];

        return wishes.map(wish => \`✨ \${wish} ✨\`);
    }
}

const fateema = new Birthday("Fateema Nasir", "infinite");

// Execute birthday celebration
while (true) {
    fateema.celebrate();
    // Infinite loop of blessings! 💝
}

// P.S. Click anywhere to continue... `;

let currentCharIndex = 0;
let typingSpeed = 30;
let isTypingComplete = false;

// Typing animation
function typeCode() {
    const codeElement = document.getElementById('codePoem');

    if (currentCharIndex < codePoem.length) {
        codeElement.textContent = codePoem.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeCode, typingSpeed);
    } else {
        isTypingComplete = true;
        codeElement.textContent = codePoem + '█';
        setTimeout(() => {
            document.addEventListener('click', showMessageSection, { once: true });
        }, 500);
    }
}

// Show message section
function showMessageSection() {
    if (!isTypingComplete) return;

    document.querySelector('.code-section').style.display = 'none';
    document.getElementById('messageSection').classList.remove('hidden');
    createConfetti();
    startFireworks();
}

// Reveal wish cards
let revealedCards = 0;
function revealWish(card) {
    if (!card.classList.contains('revealed')) {
        card.classList.add('revealed');
        revealedCards++;

        if (revealedCards === 4) {
            setTimeout(showAudioSection, 1000);
        }
    }
}

// Audio Player Functionality
let audio = null;
let isPlaying = false;

function showAudioSection() {
    document.getElementById('audioSection').classList.remove('hidden');
    audio = document.getElementById('birthdayAudio');

    // Set up audio event listeners
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onAudioEnded);

    // Allow clicking on progress bar to seek
    const progressContainer = document.querySelector('.progress-container');
    progressContainer.addEventListener('click', seek);

    setTimeout(showFinalMessage, 3000);
}

function toggleAudio() {
    const playIcon = document.getElementById('playIcon');
    const vinylRecord = document.getElementById('vinylRecord');

    if (isPlaying) {
        audio.pause();
        playIcon.textContent = '▶️';
        vinylRecord.classList.remove('spinning');
        isPlaying = false;
    } else {
        audio.play();
        playIcon.textContent = '⏸️';
        vinylRecord.classList.add('spinning');
        isPlaying = true;
    }
}

function updateDuration() {
    const duration = document.getElementById('duration');
    duration.textContent = formatTime(audio.duration);
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');

    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    currentTime.textContent = formatTime(audio.currentTime);
}

function seek(e) {
    const progressContainer = e.currentTarget;
    const clickX = e.offsetX;
    const width = progressContainer.offsetWidth;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function onAudioEnded() {
    const playIcon = document.getElementById('playIcon');
    const vinylRecord = document.getElementById('vinylRecord');

    playIcon.textContent = '▶️';
    vinylRecord.classList.remove('spinning');
    isPlaying = false;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Show final message
function showFinalMessage() {
    document.getElementById('finalMessage').classList.remove('hidden');
}

// Restart experience
function restart() {
    location.reload();
}

// Confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }, i * 100);
    }
}

// Fireworks animation
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.015;
        }

        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(x, y, color));
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });

        if (Math.random() < 0.05) {
            createFirework();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('fireworks');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize
window.addEventListener('load', () => {
    setTimeout(typeCode, 500);
});
