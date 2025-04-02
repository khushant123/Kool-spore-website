
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
});




