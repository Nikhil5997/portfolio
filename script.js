const navbar = document.getElementById("navbar");

window.addEventListener("scroll",()=>{
if(window.scrollY>50){
navbar.classList.add("scrolled");
}else{
navbar.classList.remove("scrolled");
}
});

const faders=document.querySelectorAll(".fade-up");

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});

faders.forEach(el=>observer.observe(el));
// Animated Counters

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      let count = 0;

      const speed = 50;

      const updateCounter = () => {
        const increment = target / speed;
        count += increment;

        if(count < target){
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

// Typing animation

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
  if (charIndex < texts[index].length) {
    typingElement.innerHTML += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(deleteEffect, 1500);
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

typeEffect();

faders.forEach((el, index) => {
  // Add a slight stagger delay based on its order
  el.style.transitionDelay = `${index * 0.15}s`; 
  observer.observe(el);
});

const faders = document.querySelectorAll(".fade-up");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Small delay for cards to pop in one-by-one
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 100); 
    }
  });
}, observerOptions);

faders.forEach(el => observer.observe(el));
