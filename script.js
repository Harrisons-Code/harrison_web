document.addEventListener('DOMContentLoaded', () => {
    // Show Windows 95 style welcome popup for cursor pet
    setTimeout(() => {
        // Only show welcome popup if user hasn't previously chosen not to see it
        if (localStorage.getItem('hideWelcomePopup') !== 'true') {
            showWelcomePopup();
        }
    }, 1000);
    
    // Setup theme toggle functionality
    setupThemeToggle();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple typewriter effect for the subtitle
    const subtitle = document.querySelector('.subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Add global keydown listener for cursor pet
    window.addEventListener('keydown', (event) => {
        // This is a redundant backup for the keydown listener in cursor-pet.js
        if (event.key === 'c' || event.key === 'C') {
            // Try to find the sleep button and click it
            const sleepButton = document.getElementById('change-pet');
            if (sleepButton) {
                sleepButton.click();
            }
        }
    });
    
    // Add "Read more" functionality
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const article = this.closest('article');
            const title = article.querySelector('h3').textContent;
            alert(`Full article for "${title}" would open here.`);
        });
    });
    
    // Initialize Meowmageddon
    setupMeowmageddon();
    
    // Windows 95 style welcome popup function
    function showWelcomePopup() {
        // Remove any existing notifications
        const existingNotification = document.getElementById('welcome-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Check if dark mode is active
        const isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                         window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Create the notification window
        const notification = document.createElement('div');
        notification.id = 'welcome-notification';
        notification.className = 'retro-notification';
        
        // Apply theme class if in dark mode
        if (isDarkMode) {
            notification.classList.add('dark-theme');
        }
        
        // Create window title bar
        const titleBar = document.createElement('div');
        titleBar.className = 'notification-title-bar';
        
        const titleIcon = document.createElement('span');
        titleIcon.className = 'notification-title-bar-icon';
        titleIcon.innerHTML = '&#x1F4CD;'; // 📍 pushpin icon
        
        const title = document.createElement('span');
        title.textContent = 'Welcome to Harrison\'s Site';
        titleBar.appendChild(titleIcon);
        titleBar.appendChild(title);
        
        const closeButton = document.createElement('span');
        closeButton.className = 'notification-close';
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        titleBar.appendChild(closeButton);
        
        notification.appendChild(titleBar);
        
        // Create content
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const icon = document.createElement('div');
        icon.className = 'notification-icon';
        icon.innerHTML = '&#x1F4A1;'; // 💡 light bulb icon
        content.appendChild(icon);
        
        const message = document.createElement('div');
        message.className = 'notification-message';
        message.innerHTML = `
            <p>Did you notice the eagle following your cursor?</p>
            <p>You can press the <strong>'p'</strong> key to make it sleep or wake up.</p>
            <p>Click the <strong>"Sleep Eagle"</strong> button at the bottom of the page.</p>
            <p>Click the <strong>"Perch Eagle"</strong> button to make it stay at the bottom of the page. The eagle will only be visible when you scroll to the bottom.</p>
            <p style="margin-top: 10px;">🐱 <strong>Meowmageddon:</strong> Click the <strong>"Meowmageddon"</strong> button at the bottom of the page to see what happens!</p>
        `;
        content.appendChild(message);
        
        notification.appendChild(content);
        
        // Add buttons
        const buttons = document.createElement('div');
        buttons.className = 'notification-buttons';
        
        const okButton = document.createElement('button');
        okButton.className = 'notification-button';
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
            notification.remove();
        });
        buttons.appendChild(okButton);
        
        notification.appendChild(buttons);
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Create a "never show again" checkbox option
        const optionRow = document.createElement('div');
        optionRow.style.display = 'flex';
        optionRow.style.alignItems = 'center';
        optionRow.style.padding = '0 12px 12px';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'dont-show-again';
        checkbox.style.marginRight = '8px';
        
        const label = document.createElement('label');
        label.htmlFor = 'dont-show-again';
        label.textContent = 'Don\'t show this message again';
        label.style.fontSize = '0.75rem';
        
        optionRow.appendChild(checkbox);
        optionRow.appendChild(label);
        notification.appendChild(optionRow);
        
        // Store in localStorage if user checks "don't show again"
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                localStorage.setItem('hideWelcomePopup', 'true');
            } else {
                localStorage.removeItem('hideWelcomePopup');
            }
        });
        
        return notification;
    }
    
    // Function to setup Meowmageddon
    function setupMeowmageddon() {
        // Create ASCII cat designs
        const catDesigns = [
            // Basic cat
            `
 /\\_/\\
( o.o )
 > ^ <
            `,
            // Happy cat
            `
 /\\_/\\
(=^-^=)
(")_(")
            `,
            // Sleeping cat
            `
 /\\_/\\
( -.- )
 (u u)~/*
            `,
            // Surprised cat
            `
  /\\_/\\  
 ( *o* ) 
  />_<\\  
            `,
            // Focused cat
            `
  /\\_/\\  
 ( ·.· ) 
  >-I-<  
            `,
            // Fuzzy cat
            `
^-.-^
            `,
            // Simple cat
            `
 /\\_/\\
(='.'=)
(")_(")
            `,
            // Evil cat
            `
 /| |\\
( >.< )
 > ^ <
 ~~~~~
            `
        ];
        
        // Variables to track cats
        let cats = [];
        let isRaining = false;
        let animationFrameId = null;
        let lastTime = 0;
        let catRate = 100; // ms between cat spawns
        let lastCatTime = 0;
        
        // Create audio player for Meowmageddon
        let audioPlayer = null;
        
        // Get reference to the Meowmageddon button
        const meowButton = document.getElementById('meowmageddon-button');
        if (meowButton) {
            meowButton.addEventListener('click', () => {
                if (!isRaining) {
                    showConfirmationPopup();
                } else {
                    stopMeowmageddon();
                }
            });
        }
        
        // Create YouTube Player for music
        function createAudioPlayer() {
            // Create a hidden container for the YouTube iframe
            const audioContainer = document.createElement('div');
            audioContainer.id = 'meowmageddon-audio';
            audioContainer.style.position = 'fixed';
            audioContainer.style.bottom = '0';
            audioContainer.style.right = '0';
            audioContainer.style.width = '10px';
            audioContainer.style.height = '10px';
            audioContainer.style.opacity = '0.01';
            audioContainer.style.pointerEvents = 'none';
            audioContainer.style.zIndex = '-1';
            document.body.appendChild(audioContainer);
            
            // Load YouTube IFrame API
            if (!window.YT) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                
                // Set up callback for when API is ready
                window.onYouTubeIframeAPIReady = function() {
                    createYouTubePlayer();
                };
            } else {
                // YouTube API already loaded
                createYouTubePlayer();
            }
        }
        
        // Create the actual YouTube player once API is loaded
        function createYouTubePlayer() {
            audioPlayer = new YT.Player('meowmageddon-audio', {
                height: '10',
                width: '10',
                videoId: 'kpnW68Q8ltc', // YouTube video ID for the music
                playerVars: {
                    'autoplay': 0,
                    'controls': 0,
                    'disablekb': 1,
                    'fs': 0,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
        
        // Function called when player is ready
        function onPlayerReady(event) {
            // Player is ready but don't autoplay yet
            // Check if Meowmageddon is already waiting for music
            if (window.meowmageddonMusicPending && isRaining) {
                event.target.playVideo();
                window.meowmageddonMusicPending = false;
            }
        }
        
        // Handle player state changes
        function onPlayerStateChange(event) {
            // If the video ends but Meowmageddon is still active, restart it
            if (event.data === YT.PlayerState.ENDED && isRaining) {
                audioPlayer.playVideo();
            }
        }
        
        // Function to show a Windows 95 style confirmation popup
        function showConfirmationPopup() {
            // Check if dark mode is active
            const isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                            window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Create the notification window
            const notification = document.createElement('div');
            notification.id = 'confirmation-notification';
            notification.className = 'retro-notification';
            
            // Apply theme class if in dark mode
            if (isDarkMode) {
                notification.classList.add('dark-theme');
            }
            
            // Create window title bar
            const titleBar = document.createElement('div');
            titleBar.className = 'notification-title-bar';
            
            const titleIcon = document.createElement('span');
            titleIcon.className = 'notification-title-bar-icon';
            titleIcon.innerHTML = '&#x1F431;'; // 🐱 cat emoji
            
            const title = document.createElement('span');
            title.textContent = 'Meowmageddon';
            titleBar.appendChild(titleIcon);
            titleBar.appendChild(title);
            
            const closeButton = document.createElement('span');
            closeButton.className = 'notification-close';
            closeButton.textContent = '×';
            closeButton.addEventListener('click', () => {
                notification.remove();
            });
            titleBar.appendChild(closeButton);
            
            notification.appendChild(titleBar);
            
            // Create content
            const content = document.createElement('div');
            content.className = 'notification-content';
            
            const icon = document.createElement('div');
            icon.className = 'notification-icon';
            icon.innerHTML = '&#x26A0;'; // ⚠️ warning icon
            content.appendChild(icon);
            
            const message = document.createElement('div');
            message.className = 'notification-message';
            message.innerHTML = `
                <p>Are you sure you want to unleash the cats?</p>
                <p style="margin-top: 10px;">Your screen will be filled with ASCII cats!</p>
                <p style="font-size: 0.8em; font-style: italic; margin-top: 8px;">Click the button again to stop the madness.</p>
                <p style="font-size: 0.8em; color: #ff4757;">Music will play during Meowmageddon!</p>
            `;
            content.appendChild(message);
            
            notification.appendChild(content);
            
            // Add buttons
            const buttons = document.createElement('div');
            buttons.className = 'notification-buttons';
            
            const cancelButton = document.createElement('button');
            cancelButton.className = 'notification-button';
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', () => {
                notification.remove();
            });
            buttons.appendChild(cancelButton);
            
            const confirmButton = document.createElement('button');
            confirmButton.className = 'notification-button';
            confirmButton.textContent = 'Unleash!';
            confirmButton.addEventListener('click', () => {
                notification.remove();
                startMeowmageddon();
            });
            buttons.appendChild(confirmButton);
            
            notification.appendChild(buttons);
            
            // Add to DOM
            document.body.appendChild(notification);
        }
        
        // Function to start the cat rain
        function startMeowmageddon() {
            if (isRaining) return;
            
            isRaining = true;
            
            // Update button text
            const meowButton = document.getElementById('meowmageddon-button');
            if (meowButton) {
                meowButton.textContent = 'Stop Meowmageddon';
                meowButton.title = 'Make it stop!';
                meowButton.classList.add('stopping');
            }
            
            // Start the music
            if (!audioPlayer) {
                // Create player if it doesn't exist yet
                createAudioPlayer();
                // We'll need to wait for the player to be ready before playing
                window.meowmageddonMusicPending = true;
            } else {
                // Player exists, play the music
                audioPlayer.playVideo();
            }
            
            // Start the animation loop
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(animateCats);
        }
        
        // Function to stop the cat rain
        function stopMeowmageddon() {
            isRaining = false;
            
            // Stop the animation loop
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            
            // Stop the music
            if (audioPlayer) {
                audioPlayer.pauseVideo();
            }
            
            // Update button text
            const meowButton = document.getElementById('meowmageddon-button');
            if (meowButton) {
                meowButton.textContent = 'Meowmageddon';
                meowButton.title = 'Unleash the cats!';
                meowButton.classList.remove('stopping');
            }
            
            // Remove all cats - more thorough cleanup
            // First attempt with our tracked cats
            cats.forEach(cat => {
                if (cat.element && cat.element.parentNode) {
                    cat.element.parentNode.removeChild(cat.element);
                }
            });
            
            // Second safety check - find and remove any cats that might have been missed
            const allRemainingCats = document.querySelectorAll('.meow-cat');
            allRemainingCats.forEach(catElement => {
                if (catElement.parentNode) {
                    catElement.parentNode.removeChild(catElement);
                }
            });
            
            // Clear the cats array
            cats = [];
        }
        
        // Function to create a new cat
        function createCat() {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            
            // Pick a random cat design
            const design = catDesigns[Math.floor(Math.random() * catDesigns.length)];
            
            // Create cat element
            const catElement = document.createElement('div');
            catElement.className = 'meow-cat';
            catElement.innerHTML = `<pre>${design}</pre>`;
            
            // Apply styles
            Object.assign(catElement.style, {
                position: 'fixed',
                zIndex: '9999',
                fontFamily: 'monospace, Courier New, Courier',
                fontSize: `${8 + Math.random() * 8}px`,
                lineHeight: '1',
                color: `hsl(${Math.random() * 360}, 80%, 70%)`,
                whiteSpace: 'pre',
                pointerEvents: 'none',
                userSelect: 'none',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                transform: 'rotate(' + (Math.random() * 40 - 20) + 'deg)'
            });
            
            // Add cat to the page
            document.body.appendChild(catElement);
            
            // Calculate random position and speed
            const x = Math.random() * windowWidth;
            const y = -100; // Start above the viewport
            const speed = 50 + Math.random() * 150; // Pixels per second
            const wobbleSpeed = Math.random() * 2 + 1; // Wobble speed
            const wobbleAmount = Math.random() * 20 + 5; // Wobble amount
            const baseX = x; // Store original x position for wobble
            
            // Add to cats array
            cats.push({
                element: catElement,
                x: x,
                y: y,
                baseX: baseX,
                speed: speed,
                wobbleSpeed: wobbleSpeed,
                wobbleAmount: wobbleAmount,
                wobbleOffset: Math.random() * Math.PI * 2, // Random start phase
                timestamp: performance.now()
            });
            
            return catElement;
        }
        
        // Function to animate cats
        function animateCats(timestamp) {
            if (!isRaining) return;
            
            const deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            
            // Create new cats at regular intervals
            if (timestamp - lastCatTime > catRate) {
                lastCatTime = timestamp;
                createCat();
                
                // Gradually increase spawn rate (but not too much to avoid performance issues)
                if (catRate > 25) {
                    catRate *= 0.99;
                }
            }
            
            // Update existing cats
            for (let i = cats.length - 1; i >= 0; i--) {
                const cat = cats[i];
                
                // Update position
                cat.y += (cat.speed * deltaTime) / 1000;
                
                // Wobble horizontally
                const wobble = Math.sin((timestamp / 1000) * cat.wobbleSpeed + cat.wobbleOffset) * cat.wobbleAmount;
                cat.x = cat.baseX + wobble;
                
                // Apply position
                cat.element.style.left = `${cat.x}px`;
                cat.element.style.top = `${cat.y}px`;
                
                // Remove if out of view
                if (cat.y > window.innerHeight + 100) {
                    if (cat.element.parentNode) {
                        cat.element.parentNode.removeChild(cat.element);
                    }
                    cats.splice(i, 1);
                    
                    // If we have too many cats, increase minimum removal height
                    if (cats.length > 150) {
                        cats.splice(0, 10); // Remove the 10 oldest cats
                    }
                }
            }
            
            // Continue animation loop
            animationFrameId = requestAnimationFrame(animateCats);
        }
        
        // Initialize the audio player at page load
        // This pre-loads the YouTube API so it's ready when needed
        createAudioPlayer();
    }
    
    // Function to show a Windows 95 style popup for cats
    function showCatPopup(title, description) {
        // Check if dark mode is active
        const isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                         window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Create the notification window
        const notification = document.createElement('div');
        notification.id = 'cat-notification';
        notification.className = 'retro-notification';
        
        // Apply theme class if in dark mode
        if (isDarkMode) {
            notification.classList.add('dark-theme');
        }
        
        // Create window title bar
        const titleBar = document.createElement('div');
        titleBar.className = 'notification-title-bar';
        
        const titleIcon = document.createElement('span');
        titleIcon.className = 'notification-title-bar-icon';
        titleIcon.innerHTML = '&#x1F431;'; // 🐱 cat emoji
        
        const titleText = document.createElement('span');
        titleText.textContent = title;
        titleBar.appendChild(titleIcon);
        titleBar.appendChild(titleText);
        
        const closeButton = document.createElement('span');
        closeButton.className = 'notification-close';
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        titleBar.appendChild(closeButton);
        
        notification.appendChild(titleBar);
        
        // Create content
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const icon = document.createElement('div');
        icon.className = 'notification-icon';
        icon.innerHTML = '&#x1F431;'; // 🐱 cat emoji
        content.appendChild(icon);
        
        const message = document.createElement('div');
        message.className = 'notification-message';
        message.innerHTML = `<p>${description}</p>`;
        content.appendChild(message);
        
        notification.appendChild(content);
        
        // Add buttons
        const buttons = document.createElement('div');
        buttons.className = 'notification-buttons';
        
        const okButton = document.createElement('button');
        okButton.className = 'notification-button';
        okButton.textContent = 'OK';
        okButton.addEventListener('click', () => {
            notification.remove();
        });
        buttons.appendChild(okButton);
        
        notification.appendChild(buttons);
        
        // Add to DOM
        document.body.appendChild(notification);
    }
    
    // ASCII Art Generator
    const imageUrlInput = document.getElementById('image-url');
    const generateButton = document.getElementById('generate-ascii');
    const asciiOutput = document.getElementById('ascii-output');
    
    if (generateButton && imageUrlInput && asciiOutput) {
        generateButton.addEventListener('click', () => {
            const imageUrl = imageUrlInput.value.trim();
            
            if (!imageUrl) {
                asciiOutput.textContent = 'Please enter a valid image URL from Imgur.com';
                return;
            }
            
            // Show loading state
            asciiOutput.textContent = 'Converting image to ASCII...';
            
            // Create our own ASCII art conversion using a proxy and canvas
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            
            // Add a CORS proxy for external images
            // Note: This is a workaround and may not work for all images
            const proxyUrl = 'https://corsproxy.io/?';
            const isImgurUrl = imageUrl.includes('imgur.com');
            
            img.onload = function() {
                try {
                    // Calculate aspect ratio
                    const originalWidth = img.width;
                    const originalHeight = img.height;
                    
                    // Determine width based on aspect ratio
                    const asciiWidth = 60;
                    const asciiHeight = Math.floor(asciiWidth * (originalHeight / originalWidth) / 2);
                    
                    // Create a canvas to draw the image
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    canvas.width = asciiWidth;
                    canvas.height = asciiHeight;
                    
                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0, asciiWidth, asciiHeight);
                    
                    // Get image data
                    const imageData = ctx.getImageData(0, 0, asciiWidth, asciiHeight);
                    const pixels = imageData.data;
                    
                    // Enhance contrast before converting
                    for (let i = 0; i < pixels.length; i += 4) {
                        // Calculate brightness
                        const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                        
                        // Apply contrast enhancement
                        // Values > 128 become brighter, values < 128 become darker
                        const contrast = 1.5; // Increase for more contrast
                        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
                        
                        const newBrightness = factor * (brightness - 128) + 128;
                        
                        // Apply the new value to all channels
                        pixels[i] = pixels[i + 1] = pixels[i + 2] = Math.max(0, Math.min(255, newBrightness));
                    }
                    
                    // ASCII character set from dark to light (higher contrast)
                    const asciiChars = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' '];
                    
                    // Generate ASCII art
                    let asciiArt = '';
                    
                    for (let y = 0; y < asciiHeight; y++) {
                        for (let x = 0; x < asciiWidth; x++) {
                            // Get pixel index (4 values per pixel: r, g, b, a)
                            const index = (y * asciiWidth + x) * 4;
                            
                            // Calculate brightness (simple average)
                            const brightness = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
                            
                            // Map brightness to ASCII character
                            const charIndex = Math.floor(brightness / 255 * (asciiChars.length - 1));
                            asciiArt += asciiChars[charIndex];
                        }
                        asciiArt += '\n';
                    }
                    
                    // Display the ASCII art
                    asciiOutput.textContent = asciiArt;
                } catch (error) {
                    console.error('Error generating ASCII art:', error);
                    asciiOutput.textContent = 'Error generating ASCII art. Please try an Imgur image URL.';
                    
                    // Fallback to easier method with basic characters
                    generateSimpleAsciiArt(img);
                }
            };
            
            img.onerror = function() {
                // Fallback to a third-party API that handles CORS better
                console.error('Error loading image, trying API fallback');
                fallbackToTextToAsciiApi(imageUrl);
            };
            
            // Try to load image with CORS proxy if not from Imgur
            img.src = isImgurUrl ? imageUrl : proxyUrl + encodeURIComponent(imageUrl);
            
            // Simple ASCII art fallback function - less detailed but more reliable
            function generateSimpleAsciiArt(image) {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    const width = 40; // smaller width for simplicity
                    const height = Math.floor(width * (image.height / image.width) / 2);
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    ctx.drawImage(image, 0, 0, width, height);
                    const imageData = ctx.getImageData(0, 0, width, height);
                    const pixels = imageData.data;
                    
                    // Apply contrast enhancement
                    for (let i = 0; i < pixels.length; i += 4) {
                        const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
                        const contrast = 2.0; // Even more contrast for simple mode
                        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
                        
                        const newBrightness = factor * (brightness - 128) + 128;
                        pixels[i] = pixels[i + 1] = pixels[i + 2] = Math.max(0, Math.min(255, newBrightness));
                    }
                    
                    // Higher contrast character set
                    const chars = ['█', '▓', '▒', '░', ' '];
                    
                    let result = '';
                    for (let y = 0; y < height; y++) {
                        for (let x = 0; x < width; x++) {
                            const idx = (y * width + x) * 4;
                            const avg = (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
                            const charIdx = Math.floor(avg / 255 * (chars.length - 1));
                            result += chars[charIdx];
                        }
                        result += '\n';
                    }
                    
                    asciiOutput.textContent = result;
                } catch (err) {
                    console.error('Simple ASCII generation failed:', err);
                    asciiOutput.textContent = 'Failed to convert image. Please try an Imgur URL.';
                }
            }
            
            // Fallback API
            function fallbackToTextToAsciiApi(url) {
                // Server-side ASCII generator using text-to-ascii.com
                const apiUrl = `https://artii.herokuapp.com/make?text=ASCII%20ART&font=standard`;
                
                fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) throw new Error('API failed');
                        return response.text();
                    })
                    .then(text => {
                        asciiOutput.textContent = 
                            text + "\n\n" + 
                            "URL conversion failed.\n" +
                            "Please upload your image to imgur.com first!\n" +
                            "Imgur images work best with this converter.";
                    })
                    .catch(err => {
                        console.error('Final fallback failed:', err);
                        asciiOutput.textContent = 
                            "ASCII Art Generator\n\n" +
                            "Image conversion failed.\n" + 
                            "Please upload your image to imgur.com first!\n" +
                            "Visit https://imgur.com to upload your image.";
                    });
            }
        });
        
        // Allow pressing Enter to submit
        imageUrlInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                generateButton.click();
            }
        });
        
        // Add Imgur example image URLs
        const exampleUrls = [
            'https://i.imgur.com/FXlEY0x.jpeg', // cat on imgur
            'https://i.imgur.com/yzGKYUp.jpeg', // dog on imgur
            'https://i.imgur.com/P3MfKC7.jpeg'  // bird on imgur
        ];
        
        // Set a random example URL as placeholder
        imageUrlInput.placeholder = `Try Imgur URL: ${exampleUrls[Math.floor(Math.random() * exampleUrls.length)]}`;
        
        // Add note about using Imgur under the input
        const imgurNote = document.createElement('p');
        imgurNote.className = 'imgur-note';
        imgurNote.innerHTML = 'For best results, use <a href="https://imgur.com" target="_blank">Imgur.com</a> image URLs';
        
        // Insert after the input group
        const inputGroup = document.querySelector('.input-group');
        if (inputGroup && inputGroup.parentNode) {
            inputGroup.parentNode.insertBefore(imgurNote, inputGroup.nextSibling);
        }
    }
    
    // Setup theme toggle functionality
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.documentElement; // Using HTML element for theme class
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggle.innerHTML = '&#9728;'; // Sun icon in light mode
        } else {
            body.classList.remove('light-mode');
            themeToggle.innerHTML = '&#9790;'; // Moon icon in dark mode
        }
        
        // Add click event to toggle theme
        themeToggle.addEventListener('click', () => {
            // Toggle light mode class
            body.classList.toggle('light-mode');
            
            // Update button text and save preference
            if (body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '&#9728;'; // Sun icon in light mode
                localStorage.setItem('theme', 'light');
            } else {
                themeToggle.innerHTML = '&#9790;'; // Moon icon in dark mode
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}); 