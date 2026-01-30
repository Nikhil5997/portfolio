// 1. Navbar Scroll Effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// 2. Typing Animation
const texts = [
    "React Native Developer",
    "AR and VR Enthusiast",
    "React JS Developer",
    "UI Focused Engineer"
];

let index = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
    if (typingElement) {
        if (charIndex < texts[index].length) {
            typingElement.innerHTML += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(deleteEffect, 1500);
        }
    }
}

function deleteEffect() {
    if (charIndex > 0) {
        typingElement.innerHTML = texts[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteEffect, 60);
    } else {
        index = (index + 1) % texts.length;
        setTimeout(typeEffect, 300);
    }
}

// Start typing
if (typingElement) typeEffect();

// 3. Intersection Observer for Fade-Up Animations (Staggered)
const faders = document.querySelectorAll(".fade-up");

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            fadeObserver.unobserve(entry.target); // Stop observing once shown
        }
    });
}, observerOptions);

faders.forEach((el, i) => {
    // This adds the "Crazy" stagger effect: each card pops in slightly after the other
    el.style.transitionDelay = `${(i % 3) * 0.15}s`; 
    fadeObserver.observe(el);
});

// 4. Animated Counters
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = 50;

            const updateCounter = () => {
                const increment = target / speed;
                count += increment;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + "+";
                }
            };

            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});
