// Initialize Locomotive Scroll
function locomotive(){
function initLocomotiveScroll() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        lerp: 0.05,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Update scroll position for animations
    scroll.on('scroll', ScrollTrigger.update);

    // Set up ScrollTrigger to work with Locomotive Scroll
    ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
            return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
    });

    // Each time the window updates, refresh ScrollTrigger and Locomotive Scroll
    ScrollTrigger.addEventListener('refresh', () => scroll.update());
    ScrollTrigger.refresh();

    console.log('Locomotive Scroll initialized successfully');
    return scroll;
}

// Initialize after the page is fully loaded
let locoScroll;
window.addEventListener('load', () => {
    // Initialize only after the loader animation is complete
    setTimeout(() => {
        locoScroll = initLocomotiveScroll();
    }, 5000); // Adjust timing to match your loader duration
});

}
// locomotive done

function h2timer() {
let h2timer = document.querySelectorAll(".line2 h2");
let grow = 0;
// Add initial delay before starting the counter
setTimeout(function() {
    var counterInterval = setInterval(function() {
        if (grow < 100) {
            h2timer[0].innerHTML = grow++
        } else {
            h2timer[0].innerHTML = grow
            clearInterval(counterInterval) // Stop the interval when done
        }
    }, 39)
}, 1200) // Delay before starting the counter
}



function cursor() {
    // Check if it's a touch device - don't initialize cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.style.cursor = 'auto';
        const cursorEl = document.getElementById('cursor');
        if (cursorEl) cursorEl.style.display = 'none';
        return; // Exit early for touch devices
    }
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Create cursor element if it doesn't exist
    if (!document.getElementById('cursor')) {
        const cursorElement = document.createElement('div');
        cursorElement.id = 'cursor';
        cursorElement.style.position = 'fixed';
        cursorElement.style.width = '30px';
        cursorElement.style.height = '30px';
        cursorElement.style.borderRadius = '50%';
        cursorElement.style.borderWidth = '1px';
        cursorElement.style.borderStyle = 'solid';
        cursorElement.style.borderColor = '#ffffff';
        cursorElement.style.backgroundColor = '#161616';
        cursorElement.style.pointerEvents = 'none';
        cursorElement.style.zIndex = '9999';
        cursorElement.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursorElement);
    }
    
    // Custom cursor implementation - super fast with no scaling
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Direct positioning without GSAP for maximum speed
      const cursor = document.getElementById('cursor');
      if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      }
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, nav ul li, .logo, .text1 h1');
    
    interactiveElements.forEach(el => {
      // Change cursor color on hover without scaling
      el.addEventListener('mouseenter', () => {
        const cursor = document.getElementById('cursor');
        if (cursor) {
          cursor.style.backgroundColor = 'transparent';
          cursor.style.borderWidth = '2px';
          cursor.style.borderColor = '#f2f2f2';
        }
      });
      
      // Revert cursor style on mouse leave
      el.addEventListener('mouseleave', () => {
        const cursor = document.getElementById('cursor');
        if (cursor) {
          cursor.style.backgroundColor = '#161616';
          cursor.style.borderWidth = '1.2px';
          cursor.style.borderColor = '#ffffff';
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

// Initialize responsiveness features
function initResponsiveFeatures() {
    // Check window width and adjust functionality
    const handleResize = () => {
        // We're handling overflow in CSS now, so we don't need to modify it here
        // Just initialize other responsive features as needed
    };
    
    // Run on load and resize
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Initialize mobile menu
    initMobileMenu();
}

cursor();
initResponsiveFeatures();

let tl = gsap.timeline();

tl.from(' .line1 h1 ,.line2 h1, .line2 h2, .line2 h3', {
    y: 150,
    opacity: 0,
    duration: 0.9,
    delay: 0.45,
    stagger: 0.24,
    onStart: h2timer()
})

.to('#loader', {
    display: 'none',
    delay: 3.6,
})
.from('.main', {
    opacity: 0,
    duration: 3,
})

// Animation for navigation elements
tl.from('.logo', {
    y: -50,
    opacity: 0,
    duration: 0.9,
    ease: 'power1.out',
}, '-=2');

tl.from('.text1', {
    y: 50,
    opacity: 0,
    duration: 0.9,
    height: 0,
}, '<0.3' );

tl.from('nav ul li', {
    y: -45,
    opacity: 0,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power1.out'
}, '-=0.6');

// Conditionally initialize Shery.js based on screen size
if (window.innerWidth > 768) {
    Shery.makeMagnet(".logo" /* Element to target.*/, {
        // Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });

    Shery.makeMagnet("nav ul li" /* Element to target.*/, {
        scale: 1.2,
    });
}





