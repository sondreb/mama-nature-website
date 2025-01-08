const faders = document.querySelectorAll('.fade-in');
const staggerElements = document.querySelectorAll('.stagger');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        appearOnScroll.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

staggerElements.forEach(element => {
    appearOnScroll.observe(element);
});
