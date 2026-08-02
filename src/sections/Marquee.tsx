import { useEffect, useRef } from 'react';

export function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const marqueeImages = [
    '/images/n8n_ai_workflow_nodes_1785590605971.png',
    '/images/predictive_analytics_ui_1785590645761.png',
    '/images/forex_trading_terminal_1785590664198.png',
    '/images/n8n_automation_flow_1785590627093.png',
    '/images/crypto_analytics_heatmap_1785590681924.png',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
  ];

  const reversedImages = [...marqueeImages].reverse();

  useEffect(() => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

    let rafId = 0;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) * 0.15;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 150}px)`;
      }

      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-offset + 150}px)`;
      }
    };

    const animationFrame = () => {
      handleScroll();
      rafId = requestAnimationFrame(animationFrame);
    };

    rafId = requestAnimationFrame(animationFrame);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="marquee"
      className="py-16 overflow-hidden relative"
    >
      {/* Row 1 - moving right */}
      <div ref={row1Ref} className="flex gap-6 whitespace-nowrap will-change-transform">
        {[...marqueeImages, ...marqueeImages, ...marqueeImages].map((src, index) => (
          <div key={`row1-${index}`} className="flex-shrink-0 w-52 h-36 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-slate-900/60 backdrop-blur-md">
            <img
              src={src}
              alt="Portfolio highlight"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Row 2 - moving left */}
      <div ref={row2Ref} className="flex gap-6 whitespace-nowrap mt-6 will-change-transform">
        {[...reversedImages, ...reversedImages, ...reversedImages].map((src, index) => (
          <div key={`row2-${index}`} className="flex-shrink-0 w-52 h-36 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-slate-900/60 backdrop-blur-md">
            <img
              src={src}
              alt="Portfolio highlight"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}