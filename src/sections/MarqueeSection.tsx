import { useEffect, useRef, useState } from 'react';
import { marqueeImages } from '../content';

const row1 = marqueeImages.slice(0, 11);
const row2 = marqueeImages.slice(11);

function Row({ images, transform, show }: { images: string[]; transform: string; show: boolean }) {
  const tripled = [...images, ...images, ...images];
  return (
    <div className="flex gap-3" style={{ transform, willChange: 'transform' }}>
      {tripled.map((src, i) => (
        <div key={i} className="h-[270px] w-[420px] shrink-0 overflow-hidden rounded-2xl bg-[#16161a]">
          {show && <img src={src} alt="" loading="lazy" decoding="async" width={420} height={270} className="h-full w-full object-cover" />}
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  // GIFs are heavy: only start downloading them when the section is close to the screen
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { rootMargin: '400px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={ref} className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <Row images={row1} show={show} transform={`translateX(${offset - 200}px)`} />
      <Row images={row2} show={show} transform={`translateX(${-(offset - 200)}px)`} />
    </section>
  );
}
