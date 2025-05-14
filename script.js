document.addEventListener('DOMContentLoaded', () => {
    // Show Windows 95 style welcome popup for cursor pet
    setTimeout(() => {
        // Only show welcome popup if user hasn't previously chosen not to see it
        if (localStorage.getItem('hideWelcomePopup') !== 'true') {
            showWelcomePopup();
        }
    }, 1000);
    
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
    
    // Set up hidden cats
    setupHiddenCats();
    
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
            <p style="margin-top: 10px;">🐱 <strong>Cats Hunt:</strong> There are <strong>7 ASCII cats</strong> visible on section headers, and <strong>4 hidden cats</strong> lurking somewhere on this page. Can you find them all?</p>
            <p style="font-size: 0.8em; font-style: italic;">Hint: Try clicking on the cats for more information!</p>
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
    
    // Function to set up hidden cats around the site
    function setupHiddenCats() {
        // Create hidden cats
        const hiddenCats = [
            {
                position: 'bottom',
                ascii: `
 /\\_/\\
( o w o)
 (> < )
                `,
                styles: {
                    position: 'fixed',
                    bottom: '5px',
                    right: '20px',
                    fontSize: '10px',
                    lineHeight: '1',
                    color: 'var(--accent-color)',
                    opacity: '0.7',
                    pointerEvents: 'auto',
                    zIndex: '999',
                    transform: 'translateY(10px)',
                    transition: 'transform 0.3s ease',
                    cursor: 'help',
                    whiteSpace: 'pre',
                    fontFamily: 'monospace'
                },
                hoverText: 'Secret cat: Bottom Dweller',
                description: 'This is the Bottom Dweller cat. It lurks in the depths of the page, always watching from below.'
            },
            {
                position: 'header',
                ascii: `^-.-^`,
                styles: {
                    position: 'absolute', 
                    top: '5px',
                    right: '10px',
                    fontSize: '10px',
                    lineHeight: '1',
                    color: 'var(--accent-color)',
                    opacity: '0.6',
                    pointerEvents: 'auto',
                    zIndex: '999',
                    cursor: 'help',
                    whiteSpace: 'pre',
                    fontFamily: 'monospace'
                },
                hoverText: 'Secret cat: Header Hider',
                description: 'Header Hider is a sneaky cat that hides in the top of the page. Very shy, but always watching.'
            },
            {
                position: 'footer',
                ascii: `
   /\\___/\\
  ( =\'.\' )
~~~~(")_(")~~~~
                `,
                styles: {
                    opacity: '0',
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '12px',
                    lineHeight: '1',
                    color: 'var(--accent-color)',
                    pointerEvents: 'auto',
                    whiteSpace: 'pre',
                    fontFamily: 'monospace',
                    transition: 'opacity 0.5s ease',
                    zIndex: '999'
                },
                hoverText: 'Secret cat: Footer Floater',
                description: 'This is the Footer Floater cat. It appears when you hover over the footer, floating above it like a gentle feline spirit.'
            }
        ];
        
        // Add hidden cats to the page
        hiddenCats.forEach((cat, index) => {
            const catElement = document.createElement('div');
            catElement.className = 'hidden-cat';
            catElement.id = `hidden-cat-${index}`;
            catElement.innerHTML = `<pre>${cat.ascii}</pre>`;
            
            // Apply styles
            Object.keys(cat.styles).forEach(style => {
                catElement.style[style] = cat.styles[style];
            });
            
            // Add tooltip
            catElement.setAttribute('title', cat.hoverText);
            
            // Create a tooltip span element for better visibility
            const tooltip = document.createElement('span');
            tooltip.className = 'cat-tooltip';
            tooltip.textContent = cat.hoverText;
            catElement.appendChild(tooltip);
            
            // Add event listeners for the tooltip
            catElement.addEventListener('mouseenter', () => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            });
            
            catElement.addEventListener('mouseleave', () => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
            
            // Add click event to show Windows 95 popup
            catElement.addEventListener('click', () => {
                showCatPopup(cat.hoverText, cat.description);
            });
            
            // Position the cat
            if (cat.position === 'header') {
                const header = document.querySelector('header');
                if (header) {
                    catElement.style.position = 'absolute';
                    header.style.position = 'relative';
                    header.appendChild(catElement);
                } else {
                    document.body.appendChild(catElement);
                }
            } else if (cat.position === 'footer') {
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.style.position = 'relative';
                    footer.appendChild(catElement);
                    
                    // Make this cat appear on hover over footer
                    footer.addEventListener('mouseenter', () => {
                        catElement.style.opacity = '1';
                    });
                    
                    footer.addEventListener('mouseleave', () => {
                        catElement.style.opacity = '0';
                    });
                } else {
                    document.body.appendChild(catElement);
                }
            } else {
                document.body.appendChild(catElement);
                
                // Add scrolling effect to bottom cat
                if (cat.position === 'bottom') {
                    window.addEventListener('scroll', () => {
                        const scrollY = window.scrollY;
                        const maxScroll = document.body.scrollHeight - window.innerHeight;
                        
                        // Show the cat when near the bottom of the page
                        if (scrollY > maxScroll - 300) {
                            catElement.style.transform = 'translateY(0)';
                        } else {
                            catElement.style.transform = 'translateY(40px)';
                        }
                    });
                }
            }
        });
        
        // Make the super secret cat work
        const superSecretCat = document.getElementById('hidden-cat-super-secret');
        if (superSecretCat) {
            superSecretCat.style.pointerEvents = 'auto';
            superSecretCat.setAttribute('title', 'Secret cat: Edge Peeker');
            
            // Create tooltip for super secret cat
            const tooltip = document.createElement('span');
            tooltip.className = 'cat-tooltip';
            tooltip.textContent = 'Secret cat: Edge Peeker';
            tooltip.style.width = 'auto'; // Ensure width accommodates the text
            tooltip.style.whiteSpace = 'nowrap'; // Prevent text wrapping
            
            // Remove any existing tooltips to avoid duplicates
            const existingTooltip = superSecretCat.querySelector('.cat-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            superSecretCat.appendChild(tooltip);
            
            // Add event listeners
            superSecretCat.addEventListener('mouseenter', () => {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
            });
            
            superSecretCat.addEventListener('mouseleave', () => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
            
            // Add click event to show Windows 95 popup
            superSecretCat.addEventListener('click', () => {
                showCatPopup('Edge Peeker', 'This is the Edge Peeker cat. It lurks at the edge of the screen, peeking in when you hover near the left side.');
            });
        }
        
        // Add click events for visible section cats
        document.querySelectorAll('.section-pet').forEach((sectionPet, index) => {
            sectionPet.style.pointerEvents = 'auto';
            sectionPet.style.cursor = 'pointer';
            
            const catNames = [
                'About Cat',
                'Writing Cat',
                'Projects Cat',
                'Stuff I Use Cat',
                'ASCII Gallery Cat',
                'ASCII Generator Cat',
                'Contact Cat'
            ];
            
            const catDescriptions = [
                'The wise About Cat watches over your bio section with sleepy eyes.',
                'The Writing Cat oversees your articles with a friendly gaze.',
                'The Projects Cat is excited about what you build!',
                'The Stuff I Use Cat is curious about your tools and preferences.',
                'The ASCII Gallery Cat loves art made with text characters.',
                'The ASCII Generator Cat can turn any image into text art.',
                'The Contact Cat helps visitors get in touch with you.'
            ];
            
            // Use the index to determine which cat description to show
            const name = catNames[index] || `Section Cat ${index + 1}`;
            const description = catDescriptions[index] || 'A mysterious cat that guards this section of the page.';
            
            sectionPet.addEventListener('click', () => {
                showCatPopup(name, description);
            });
        });
        
        // Secret: Add cat counter in console
        console.log("%c🐱 Cat Hunt: Can you find all 11 ASCII cats on this page?", "color: #4db8ff; font-weight: bold; font-size: 14px;");
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
}); 