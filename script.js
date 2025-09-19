function h2timer() {
    const h2Element = document.querySelector(".line2 h2");
    if (!h2Element) {
        console.warn('Timer element not found');
        return;
    }
    
    let grow = 0;
    const targetValue = 100;
    const interval = 39; // ~25fps for smooth animation
    
    const counterInterval = setInterval(() => {
        if (grow <= targetValue) {
            h2Element.textContent = grow;
            grow++;
        } else {
            clearInterval(counterInterval);
        }
    }, interval);
}




function cursor() {
    // Skip cursor setup on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.style.cursor = 'auto';
        return;
    }
    
    // Cache cursor element
    let cursorElement = document.getElementById('cursor');
    
    // Create cursor if it doesn't exist
    if (!cursorElement) {
        cursorElement = document.createElement('div');
        cursorElement.id = 'cursor';
        
        // Apply styles efficiently
        Object.assign(cursorElement.style, {
            position: 'fixed',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1px solid #ffffff',
            backgroundColor: '#161616',
            pointerEvents: 'none',
            zIndex: '9999',
            transform: 'translate(-50%, -50%)',
            transition: 'background-color 0.2s, border 0.2s'
        });
        
        document.body.appendChild(cursorElement);
    }
    
    // Optimized mouse tracking with requestAnimationFrame
    let mouseX = 0, mouseY = 0;
    let isMoving = false;
    
    const updateCursor = () => {
        if (cursorElement && isMoving) {
            cursorElement.style.left = `${mouseX}px`;
            cursorElement.style.top = `${mouseY}px`;
            isMoving = false;
        }
        requestAnimationFrame(updateCursor);
    };
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
    }, { passive: true });
    
    // Start cursor animation loop
    requestAnimationFrame(updateCursor);
    
    // Interactive elements hover effects
    const interactiveElements = document.querySelectorAll('a, button, nav ul li, .logo, .text1 h1');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorElement) {
                cursorElement.style.backgroundColor = 'transparent';
                cursorElement.style.borderWidth = '2px';
                cursorElement.style.borderColor = '#f2f2f2';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (cursorElement) {
                cursorElement.style.backgroundColor = '#161616';
                cursorElement.style.borderWidth = '1px';
                cursorElement.style.borderColor = '#ffffff';
            }
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon from bars to x when menu is active
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a menu item
        const menuItems = navMenu.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}



// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functions
    cursor();
    initMobileMenu();
    
    // GSAP Timeline for animations
    const tl = gsap.timeline();
    
    tl.from('.line1 h1, .line2 h1, .line2 h2, .line2 h3', {
        y: 150,
        opacity: 0,
        duration: 0.9,
        delay: 0.45,
        stagger: 0.24,
        ease: 'power2.out'
    })
    .to('#loader', {
        display: 'none',
        delay: 0.6,
        onStart: () => {
            h2timer(); // Start counter when loader begins to fade
        }
    })

    .from('.logo', {
        y: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
    }, '-=1.5')
    .from('nav ul li', {
        y: -45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.6');
    
    // Initialize Shery.js effects for desktop only
    if (window.innerWidth > 768 && typeof Shery !== 'undefined') {
        try {
            Shery.makeMagnet('.logo', {
                ease: 'cubic-bezier(0.23, 1, 0.320, 1)',
                duration: 1
            });
            
            Shery.makeMagnet('nav ul li', {
                scale: 1.1
            });
        } catch (error) {
            console.warn('Shery.js initialization failed:', error);
        }
    }
    
    // Performance monitoring
    if (typeof performance !== 'undefined') {
        console.log(`Page load time: ${(performance.now() / 1000).toFixed(2)}s`);
    }
});


