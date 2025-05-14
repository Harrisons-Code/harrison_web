document.addEventListener('DOMContentLoaded', () => {
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