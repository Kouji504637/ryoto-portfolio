(() => {
  if (!window.gsap || !window.ScrollTrigger || !window.Lenis) return;

  const { gsap, ScrollTrigger, Lenis } = window;
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    anchors: true,
    duration: 1.05,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const intro = document.querySelector('.project-intro');
  if (intro) {
    gsap.from(intro.querySelectorAll('.eyebrow, h1, .project-lead, .project-facts'), {
      y: 14,
      autoAlpha: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all',
    });
  }

  gsap.utils.toArray('#works .card').forEach(card => {
    gsap.fromTo(card,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
