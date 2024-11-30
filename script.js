// Particle Animation Script
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 150;

class Particle {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
}

for (let i = 0; i < particleCount; i++) {
  const size = Math.random() * 3 + 1;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speedX = (Math.random() - 0.5) * 2;
  const speedY = (Math.random() - 0.5) * 2;

  particles.push(new Particle(x, y, size, speedX, speedY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => {
    particle.draw();
    particle.update();
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Telegram Bot Integration
document.getElementById('submit').addEventListener('click', function() {
  const name = document.getElementById('name').value || "Anonymous";
  const phone = document.getElementById('phone').value || "Not provided";
  const message = document.getElementById('message').value || "No message provided";

  const botToken = "7603495774:AAEQVpoUK5ITk9MM73F_vqVHjc0nXFmAEZI"; // Replace with your bot token
  const chatId = "7429300688"; // Replace with your chat ID
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const finalMessage = `Anonymous Contact:\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;

  fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: finalMessage
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert("Message sent to EMMY HENZ!");
      } else {
        alert("Failed to send the message. Please check your bot token or chat ID.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
});