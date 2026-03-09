// Smooth scroll with Lenis

const lenis = new Lenis({
  duration: 2,
  smooth: true,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
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
  gsap.utils.toArray(".block-title, .h3-section, .h4-section, .section, .strategy-section, .h2-section, .persona-card, .gs-card, .competitors-table thead th, .strategy-section, .structure-column, .flow-container, .em-map, .pa-card").forEach((el) => {
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



const cards = document.querySelectorAll(".persona-card, .em-quad, .gs-card, .pa-card");

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

// if (window.matchMedia("(hover: hover)").matches) {

//   gsap.set('.cursor-dot', {scale: 0.1});
//   gsap.set('.cursor-outline', {scale: 0.5});

//   let xCTo = gsap.quickTo(".cursor-outline", "left", { duration: 0.2, ease: "power3" });
//   let yCTo = gsap.quickTo(".cursor-outline", "top", { duration: 0.2, ease: "power3" });

//   let xDTo = gsap.quickTo(".cursor-dot", "left", { duration: 0.6, ease: "power3" });
//   let yDTo = gsap.quickTo(".cursor-dot", "top", { duration: 0.6, ease: "power3" });

//   let isVisible = false;

//   document.addEventListener("mousemove", (e) => {

//     if (!isVisible) {
//       gsap.set(".cursor-outline, .cursor-dot", { opacity: 1 });
//       isVisible = true;
//     }

//     xCTo(e.clientX);
//     yCTo(e.clientY);
//     xDTo(e.clientX);
//     yDTo(e.clientY);

//   });

//   /* Hover enlarge effect */
//   const hoverTargets = document.querySelectorAll("a, button, .persona-card, .flow-box");

//   let scaleAnim = gsap.timeline({ paused: true });

//   scaleAnim
//     .to(".cursor-outline", { scale: 1 })
//     .to(".cursor-dot", { scale: 1, duration: 0.35 }, 0);

//   hoverTargets.forEach((el) => {
//     el.addEventListener("mouseenter", () => scaleAnim.play());
//     el.addEventListener("mouseleave", () => scaleAnim.reverse());
//   });

// }

// if (document.querySelector(".brand-logo")) {

//   gsap.to(".brand-logo", {
//     y: 24,                  // di chuyển nhẹ
//     duration: 2,
//     ease: "sine.inOut",
//     repeat: -5,
//     yoyo: true
//   });

// }

let currentSlide = 0;

function goTo(index) {
  const slides = document.querySelectorAll('.img-slider .slide');
  const dots = document.querySelectorAll('.img-slider .dot');
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function slideNext() { goTo(currentSlide + 1); }
function slidePrev() { goTo(currentSlide - 1); }


gsap.to(".strategy-blob", {
  y: -80,           // dịch lên 80px
  duration: 1.5,      // thời gian 1 chiều
  ease: "sine.inOut",
  yoyo: true,       // tự động đảo chiều
  repeat: -1        // lặp vô tận
});

gsap.registerPlugin(ScrollTrigger);


//Reading Indicator: Chỉ báo tiến độ đọc
const readingBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;                          // Vị trí đã cuộn
  const docHeight = document.body.scrollHeight;              // Tổng chiều cao trang
  const winHeight = window.innerHeight;                      // Chiều cao màn hình
  const scrollPercent = scrollTop / (docHeight - winHeight); // Tỉ lệ 0 → 1

  readingBar.style.width = (scrollPercent * 100) + '%';    // Cập nhật thanh
});

// Scrollspy — chỉ theo dõi đúng 5 section
//Thanh Progress
const progressBar = document.getElementById('progress-bar');
const stepBtns = document.querySelectorAll('.step-btn');

const trackedIds = ['introduction', 'research', 'empathize', 'ideate', 'ia'];

// ← Thêm 2 dòng này
let isScrollingByClick = false;
let scrollTimer = null;

function setActive(id) {
  stepBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.step === id);
  });
  if (stepColors[id]) {
    progressBar.style.background = stepColors[id];
  }
}

stepBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = btn.dataset.step;
    const target = document.getElementById(id);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setActive(id);
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';

  // Ẩn/hiện nav khi scroll đến section đầu tiên
  const firstSection = document.getElementById('introduction');
  if (firstSection) {
    const firstTop = firstSection.getBoundingClientRect().top;
    if (firstTop <= 60) {
      document.getElementById('step-nav').classList.add('visible');
    } else {
      document.getElementById('step-nav').classList.remove('visible');
    }
  }

  let current = trackedIds[0];
  trackedIds.forEach(id => {
    const section = document.getElementById(id);
    if (section && section.getBoundingClientRect().top <= 80) {
      current = id;
    }
  });

  setActive(current);
}, { passive: true });
