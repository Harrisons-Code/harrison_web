class CursorPet {
    constructor(options = {}) {
        // Default options
        this.options = {
            element: null,
            petSize: 40,
            speed: 0.05,
            maxSpeed: 4,
            acceleration: 0.15,
            deceleration: 0.92,
            type: 'bird', // Changed from cat to bird
            ...options
        };

        this.position = { x: 0, y: 0 };
        this.mousePosition = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.isMoving = false;
        this.direction = 'right';
        this.animationFrame = 0;
        this.frameCount = 0;
        this.animationSpeed = 10;
        this.states = {
            idle: 0,
            walking: 1,
            running: 2,
            sleeping: 3
        };
        this.currentState = this.states.idle;
        this.spriteOffset = 0;
        this.isSleeping = false;
        this.isPerched = false; // New property for perched state

        // ASCII art for bird with flapping wings
        this.asciiPets = {
            bird: {
                idle: [
                    `     .---.        .-----------
     /     \\  __  /    ------
    / /     \\(oo)/    -----
   //////   ' \\/ \`   ---
  //// / // :    : ---
 // /   /  /\`    '--
//          //..\\\\
       ====UU====UU====
           '//||\\\\\'
             ''´´`,
                    `     .---.        .-----------
     /     \\  __  /    ------
    / /     \\(oo)/    -----
   //////   ' \\/ \`   ---
  //// / // :    : ---
 // /   /  /\`    '--
//          //..\\\\
       ====UU====UU====
           '//||\\\\\'
             ''´´`
                ],
                running: [
                    `                   /|_
                  /   |_
                 /  o  /
                / o    ;
               (^     ;
              /      /
             /     /
            /      /
         __/      \\_____
        /'             |
         /     /-\\     /
        /      /  \\--/
       /     /
      /      /  
     (      ;
    /      ;
   /     _|
  /  __/
 /_/
                           `,
                    `                   /|_
                  /   |_
                 /  o  /
                /  o   ;
               (^     ;
              /      /
             /    ~/
            /     ~/
         __/      \\_____
        /'             |
         /    ~/-\\    ~/
        /     ~/  \\-~/
       /    ~/
      /     ~/  
     (     ~;
    /      ;
   /     _|
  /  __/
 /_/
                           `
                ],
                sleeping: [
                    `     .---.        .-----------
     /     \\  __  /    ------
    / /     \\(--)/    -----
   //////   ' \\/ \`   ---
  //// / // :    : ---
 // /   /  /\`    '--
//          //..\\\\           ZZZ
       ====UU====UU====
           '//||\\\\\'
             ''´´`,
                    `     .---.        .-----------
     /     \\  __  /    ------
    / /     \\(--)/    -----
   //////   ' \\/ \`   ---
  //// / // :    : ---
 // /   /  /\`    '--
//          //..\\\\           ZZ
       ====UU====UU====
           '//||\\\\\'
             ''´´`
                ],
                perched: [
                    `     .---.        .-----------
     /     \\  __  /    ------
    / /     \\(oo)/    -----
   //////   ' \\/ \`   ---
  //// / // :    : ---
 // /   /  /\`    '--
//          //..\\\\
       ====UU====UU====
           '//||\\\\\'
             ''´´`,
                    `     .---.        .-----------
     /     \\  __  /    ------
    / /     \\(oo)/    -----
   //////   ' \\/ \`   ---
  //// / // :    : ---
 // /   /  /\`    '--
//          //..\\\\
       ====UU====UU====
           '//||\\\\\'
             ''´´`
                ]
            }
        };

        this.init();
    }

    init() {
        // Create pet element if not provided
        if (!this.options.element) {
            const pet = document.createElement('div');
            pet.className = 'cursor-pet';
            document.body.appendChild(pet);
            this.options.element = pet;
        }

        // Styles for the pet - make sure it's visible
        const style = this.options.element.style;
        style.position = 'fixed';
        style.zIndex = '9999';
        style.pointerEvents = 'none';
        style.transition = 'transform 0.3s';
        style.fontFamily = 'monospace, Courier New, Courier';
        style.fontSize = '14px';
        style.color = 'black';
        style.whiteSpace = 'pre';
        style.lineHeight = '1';
        style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
        
        // Set initial position - start at center of screen
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        this.updatePosition(windowWidth / 2, windowHeight / 2);
        
        // Set initial mouse position to the same spot to avoid jumping
        this.mousePosition.x = windowWidth / 2;
        this.mousePosition.y = windowHeight / 2;
        
        // Add event listeners
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Set initial ASCII art
        this.updateAsciiArt();
        
        // Start the animation loop
        this.animate();
    }

    updateAsciiArt() {
        const petType = this.options.type;
        let state;
        
        if (this.isSleeping) {
            state = 'sleeping';
        } else if (this.isPerched) {
            state = 'perched';
        } else {
            state = this.currentState === this.states.idle ? 'idle' : 'running';
        }
        
        // Determine which frame to show based on animation frame
        const frameIndex = Math.floor(this.animationFrame) % 2;
        
        // Get the ASCII art for the current pet, state, and frame
        const asciiArt = this.asciiPets[petType][state][frameIndex];
        
        // Check if dark mode is active
        const isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                         window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set color based on theme
        const textColor = isDarkMode ? '#f0f0f0' : '#333';
        const textShadow = isDarkMode ? '0 0 1px black' : '0 0 1px white';
        
        // Update the element content without any background
        this.options.element.innerHTML = `<pre style="color: ${textColor}; text-shadow: ${textShadow}; margin: 0; padding: 0;">${asciiArt}</pre>`;
    }

    toggleSleep() {
        // Can't sleep if perched
        if (this.isPerched) {
            return this.isSleeping;
        }
        
        this.isSleeping = !this.isSleeping;
        
        // Reset animation frame when transitioning to/from sleep
        this.animationFrame = 0;
        this.frameCount = 0;
        
        // Update the ASCII art immediately
        this.updateAsciiArt();
        
        return this.isSleeping;
    }

    togglePerch() {
        this.isPerched = !this.isPerched;
        
        // Can't be sleeping and perched at the same time
        if (this.isPerched) {
            this.isSleeping = false;
        }
        
        // Reset animation frame when transitioning to/from perched state
        this.animationFrame = 0;
        this.frameCount = 0;
        
        if (this.isPerched) {
            // Update the position to bottom of the page
            this.updatePerchPosition();
            
            // Add scroll event listener when perched
            window.addEventListener('scroll', this.handleScroll.bind(this));
            
            // Stop velocities
            this.velocity.x = 0;
            this.velocity.y = 0;
            
            // Show notification about perch behavior
            this.showRetroNotification(`Eagle is now perched at the bottom of the page. Scroll down to see it!`);
        } else {
            // Remove scroll event listener when not perched
            window.removeEventListener('scroll', this.handleScroll.bind(this));
            
            // Make sure the eagle is visible again
            this.options.element.style.display = 'block';
            
            // Show notification about eagle being free
            this.showRetroNotification(`Eagle is free to follow your cursor!`);
        }
        
        // Update the ASCII art immediately
        this.updateAsciiArt();
        
        return this.isPerched;
    }

    // New method to handle scrolling when perched
    handleScroll() {
        if (this.isPerched) {
            this.updatePerchPosition();
        }
    }

    // New method to update position when perched
    updatePerchPosition() {
        const windowWidth = window.innerWidth;
        
        // Get document height and scroll position
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        );
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const scrollBottom = scrollTop + windowHeight;
        
        // Center horizontally, position at the bottom of the document
        const x = windowWidth / 2;
        const y = docHeight - 120; // Position above the footer
        
        // Update the position
        this.updatePosition(x, y);
        
        // Check if user has scrolled to the bottom area of the page
        const isNearBottom = scrollBottom > docHeight - 300; // Bottom 300px of the page
        
        // Show/hide the eagle based on scroll position
        if (isNearBottom) {
            this.options.element.style.display = 'block';
        } else {
            this.options.element.style.display = 'none';
        }
    }

    handleMouseMove(event) {
        // Only track mouse if not perched
        if (!this.isPerched) {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
            this.isMoving = true;
        }
    }
    
    updatePosition(x, y) {
        this.position.x = x;
        this.position.y = y;
        
        const style = this.options.element.style;

        // Calculate offsets to account for the eagle's dimensions
        // Move the offset point to the eagle's head instead of its back
        const offsetX = -25; // Position cursor near the eagle's head
        const offsetY = -10; // Position cursor near the eagle's head
        
        // Update position based on direction and cursor position
        if (this.mousePosition.x < this.position.x) {
            // Moving left, eagle faces left normally (no mirror)
            this.direction = 'left';
            style.transform = 'scaleX(1)'; // No mirroring
            style.left = `${x + offsetX}px`; // Normal positioning
        } else {
            // Moving right, eagle should be mirrored
            this.direction = 'right';
            style.transform = 'scaleX(-1)'; // Mirror horizontally
            style.left = `${x - 145}px`; // Adjust position for mirrored eagle
        }
        
        style.top = `${y + offsetY}px`;
        
        // When perched, use absolute positioning to attach to document
        if (this.isPerched) {
            style.position = 'absolute';
        } else {
            style.position = 'fixed'; // Keep using fixed positioning for normal mode
        }

        // Adjust positioning to ensure the eagle is visible
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Store current position for boundary checking
        let currentLeft = parseInt(style.left);
        let currentTop = parseInt(style.top);
        
        // Make sure we don't position off-screen
        if (currentLeft < 0) {
            style.left = '0px';
            this.position.x = this.direction === 'right' ? 145 : -offsetX;
        }
        
        if (currentTop < 0) {
            style.top = '0px';
            this.position.y = -offsetY;
        }
        
        if (currentLeft > windowWidth - 200) {
            style.left = `${windowWidth - 200}px`;
            this.position.x = this.direction === 'right' ? 
                windowWidth - 200 + 145 : 
                windowWidth - 200 - offsetX;
        }
        
        if (currentTop > windowHeight - 120) {
            style.top = `${windowHeight - 120}px`;
            this.position.y = windowHeight - 120 - offsetY;
        }
    }
    
    animate() {
        // If perched, just do a slow idle animation and don't follow cursor
        if (this.isPerched) {
            // Continue animation loop for perched animation
            requestAnimationFrame(this.animate.bind(this));
            
            // Update animation frame for perched animation (slower than idle)
            this.frameCount++;
            if (this.frameCount % 80 === 0) { // Very slow animation for perched
                this.animationFrame++;
                this.updateAsciiArt();
            }
            
            return;
        }
        
        // If sleeping, don't move
        if (this.isSleeping) {
            // Continue animation loop for sleeping animation
            requestAnimationFrame(this.animate.bind(this));
            
            // Update animation frame for sleeping animation
            this.frameCount++;
            if (this.frameCount % 60 === 0) { // Slower animation for sleeping
                this.animationFrame++;
                this.updateAsciiArt();
            }
            
            return;
        }
    
        // Calculate distance to mouse
        const dx = this.mousePosition.x - this.position.x;
        const dy = this.mousePosition.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Determine state based on distance
        if (distance < 5) {
            this.currentState = this.states.idle;
            // Don't move when idle
            this.velocity.x *= 0.8;
            this.velocity.y *= 0.8;
            
            // Update animation frame
            this.frameCount++;
            if (this.frameCount % 40 === 0) {
                this.animationFrame++;
                this.updateAsciiArt();
            }
            
            // Continue animation loop
            requestAnimationFrame(this.animate.bind(this));
            return;
        } else if (distance < 100) {
            this.currentState = this.states.walking;
        } else {
            this.currentState = this.states.running;
        }
        
        // Update animation frame - make eagle's wings flap faster when moving faster
        this.frameCount++;
        const animationSpeed = this.currentState === this.states.running ? 5 : 
                              (this.currentState === this.states.walking ? 8 : 30);
        
        if (this.frameCount % animationSpeed === 0) {
            this.animationFrame++;
            this.updateAsciiArt();
        }
        
        // Move toward the mouse if not too close
        if (distance > 5) {
            // Calculate target acceleration based on distance
            const baseAccel = this.options.acceleration;
            let accel = baseAccel;
            
            // Adjust acceleration based on state
            if (this.currentState === this.states.running) {
                accel = baseAccel * 1.5;
            } else if (this.currentState === this.states.idle) {
                accel = baseAccel * 0.5;
            }
            
            // Normalize direction vector
            const norm = distance;
            const dirX = dx / norm;
            const dirY = dy / norm;
            
            // Accelerate towards mouse
            this.velocity.x += dirX * accel;
            this.velocity.y += dirY * accel;
            
            // Apply max speed limit
            const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
            let maxSpeed = this.options.maxSpeed;
            
            // Adjust max speed based on state
            if (this.currentState === this.states.running) {
                maxSpeed = this.options.maxSpeed * 2.0; // Faster eagle
            } else if (this.currentState === this.states.walking) {
                maxSpeed = this.options.maxSpeed * 1.0;
            } else if (this.currentState === this.states.idle) {
                maxSpeed = this.options.maxSpeed * 0.5;
            }
            
            if (speed > maxSpeed) {
                const ratio = maxSpeed / speed;
                this.velocity.x *= ratio;
                this.velocity.y *= ratio;
            }
            
            // Apply natural deceleration (friction)
            this.velocity.x *= this.options.deceleration;
            this.velocity.y *= this.options.deceleration;
            
            // Update position
            const newX = this.position.x + this.velocity.x;
            const newY = this.position.y + this.velocity.y;
            this.updatePosition(newX, newY);
        } else {
            // Slow down when close to target
            this.velocity.x *= 0.8;
            this.velocity.y *= 0.8;
        }
        
        // Continue animation loop
        requestAnimationFrame(this.animate.bind(this));
    }

    // Function to create a retro-styled notification
    showRetroNotification(message) {
        // Remove any existing notifications
        const existingNotification = document.getElementById('pet-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Check if dark mode is active
        const isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                         window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Create the notification window
        const notification = document.createElement('div');
        notification.id = 'pet-notification';
        notification.className = 'retro-notification eagle-status-notification';
        
        // Apply theme class if in dark mode
        if (isDarkMode) {
            notification.classList.add('dark-theme');
        }
        
        // Create window title bar
        const titleBar = document.createElement('div');
        titleBar.className = 'notification-title-bar';
        
        const title = document.createElement('span');
        title.textContent = 'Eagle Status';
        titleBar.appendChild(title);
        
        const closeButton = document.createElement('span');
        closeButton.className = 'notification-close';
        closeButton.textContent = '×';
        closeButton.addEventListener('click', () => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        });
        titleBar.appendChild(closeButton);
        
        notification.appendChild(titleBar);
        
        // Create content
        const content = document.createElement('div');
        content.className = 'notification-content';
        content.textContent = message;
        notification.appendChild(content);
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        return notification;
    }

    // New method to handle window resize
    handleResize() {
        // If the eagle is perched, update its position when window is resized
        if (this.isPerched) {
            this.updatePerchPosition();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create pet container
    const petContainer = document.createElement('div');
    petContainer.id = 'pet-container';
    document.body.appendChild(petContainer);
    
    // Define available pet types
    const petTypes = ['bird'];
    
    // Initialize the pet
    const pet = new CursorPet({
        element: petContainer,
        petSize: 40,
        speed: 0.05,
        maxSpeed: 5, // Increased maximum speed for eagle
        acceleration: 0.15,
        deceleration: 0.92,
        type: 'bird'
    });
    
    // Function to toggle sleep mode
    const toggleSleep = () => {
        const isSleeping = pet.toggleSleep();
        
        // Update button text if it exists
        const sleepButton = document.getElementById('change-pet');
        if (sleepButton) {
            sleepButton.textContent = isSleeping ? `Wake Eagle` : `Sleep Eagle`;
        }
        
        // Show retro notification
        pet.showRetroNotification(isSleeping ? `Eagle is now sleeping. Zzz...` : `Eagle woke up!`);
    };
    
    // Function to toggle perch mode
    const togglePerch = () => {
        const isPerched = pet.togglePerch();
        
        // Update perch button text if it exists
        const perchButton = document.getElementById('perch-eagle');
        if (perchButton) {
            perchButton.textContent = isPerched ? `Free Eagle` : `Perch Eagle`;
        }
        
        // Update sleep button if needed
        const sleepButton = document.getElementById('change-pet');
        if (sleepButton && isPerched) {
            sleepButton.textContent = `Sleep Eagle`;
        }
        
        // Show retro notification
        pet.showRetroNotification(isPerched ? `Eagle is now perched at the bottom of the page.` : `Eagle is free to follow your cursor!`);
    };
    
    // Connect the sleep button
    const sleepButton = document.getElementById('change-pet');
    if (sleepButton) {
        sleepButton.addEventListener('click', toggleSleep);
        
        // Set initial button text
        sleepButton.textContent = `Sleep Eagle`;
    }
    
    // Connect the perch button
    const perchButton = document.getElementById('perch-eagle');
    if (perchButton) {
        perchButton.addEventListener('click', togglePerch);
        
        // Set initial button text
        perchButton.textContent = `Perch Eagle`;
    }
    
    // Allow sleep toggle with keyboard shortcut - now using 'p' instead of 'c'
    document.addEventListener('keydown', (event) => {
        // Press 'p' to toggle sleep
        if (event.key === 'p' || event.key === 'P') {
            toggleSleep();
        }
    });
}); 