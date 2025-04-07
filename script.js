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

    // Custom cursor implementation
    document.addEventListener('mousemove', function(e) {
      gsap.to('#cursor', {
        x: e.clientX - 15, // Centering the cursor (assuming 30px width)
        y: e.clientY - 15, // Centering the cursor (assuming 30px height)
        duration: 0.3,     // Smooth follow effect
        ease: 'power3.out' // Easing function for smoother movement
      });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, nav ul li, .logo, .text1 h1 ');
    
    interactiveElements.forEach(el => {
      // Scale up cursor on hover
      el.addEventListener('mouseenter', () => {
        gsap.to('#cursor', {
          scale: 1.35,
          backgroundColor: 'transparent',
          duration: 0.3
        });
      });
      
      // Scale back on mouse leave
      el.addEventListener('mouseleave', () => {
        gsap.to('#cursor', {
          scale: 1,
          backgroundColor: '#161616',
          duration: 0.3
        });
      });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    }

cursor();

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





Shery.makeMagnet(".logo" /* Element to target.*/, {
    // //Parameters are optional.
    // ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    // duration: 1,
  });

Shery.makeMagnet("nav ul li" /* Element to target.*/, {
    scale: 1.2,
  });





