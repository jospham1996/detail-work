document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  // Table animation
  gsap.from(".competitors-table tbody tr", {
    scrollTrigger: {
      trigger: ".competitors-table",
      start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
  });

  // h3 + h4 + h2 animation + person card
  gsap.utils.toArray(".h3-section, .h4-section, .h2-section, .persona-card, .competitors-table thead th, .strategy-section, .structure-column").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  // journey cards
  gsap.utils.toArray(".journey-card").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  });

  ScrollTrigger.refresh();

});



const cards = document.querySelectorAll(".persona-card");

cards.forEach(card => {

  gsap.set(card, { transformPerspective: 800 });

  const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
  const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });

  card.addEventListener("pointermove", (e) => {
    const bounds = card.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width;
    const y = (e.clientY - bounds.top) / bounds.height;

    rotateX(gsap.utils.interpolate(10, -10, y));
    rotateY(gsap.utils.interpolate(-10, 10, x));
  });

  card.addEventListener("pointerleave", () => {
    rotateX(0);
    rotateY(0);
  });

});



/* ===== CUSTOM CURSOR ===== */

if (window.matchMedia("(hover: hover)").matches) {

  gsap.set('.cursor-dot', {scale: 0.1});
  gsap.set('.cursor-outline', {scale: 0.5});

  let xCTo = gsap.quickTo(".cursor-outline", "left", { duration: 0.2, ease: "power3" });
  let yCTo = gsap.quickTo(".cursor-outline", "top", { duration: 0.2, ease: "power3" });

  let xDTo = gsap.quickTo(".cursor-dot", "left", { duration: 0.6, ease: "power3" });
  let yDTo = gsap.quickTo(".cursor-dot", "top", { duration: 0.6, ease: "power3" });

  let isVisible = false;

  document.addEventListener("mousemove", (e) => {

    if (!isVisible) {
      gsap.set(".cursor-outline, .cursor-dot", { opacity: 1 });
      isVisible = true;
    }

    xCTo(e.clientX);
    yCTo(e.clientY);
    xDTo(e.clientX);
    yDTo(e.clientY);

  });

  /* Hover enlarge effect */
  const hoverTargets = document.querySelectorAll("a, button, .persona-card, .flow-box");

  let scaleAnim = gsap.timeline({ paused: true });

  scaleAnim
    .to(".cursor-outline", { scale: 1 })
    .to(".cursor-dot", { scale: 1, duration: 0.35 }, 0);

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => scaleAnim.play());
    el.addEventListener("mouseleave", () => scaleAnim.reverse());
  });

}

if (document.querySelector(".brand-logo")) {

  gsap.to(".brand-logo", {
    y: 24,                  // di chuyển nhẹ
    duration: 2,
    ease: "sine.inOut",
    repeat: -5,
    yoyo: true
  });

}
