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
    const eyebrow = intro.querySelector('.eyebrow');
    const title = intro.querySelector('h1');
    const lead = intro.querySelector('.project-lead');
    const facts = intro.querySelectorAll('.project-facts > div');
    const hero = gsap.timeline({ defaults: { ease: 'power2.out' } });

    if (eyebrow) hero.from(eyebrow, { y: 10, autoAlpha: 0, duration: 0.45 });
    if (title) {
      hero.from(title, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.9,
        ease: 'power3.inOut',
      }, '-=0.08');
      hero.to(title, { '--hero-rule': 1, duration: 0.55, ease: 'power2.out' }, '-=0.32');
    }
    if (lead) hero.from(lead, { y: 14, autoAlpha: 0, duration: 0.55 }, '-=0.2');
    if (facts.length) hero.from(facts, {
      y: 12,
      autoAlpha: 0,
      duration: 0.4,
      stagger: 0.08,
    }, '-=0.18');
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
