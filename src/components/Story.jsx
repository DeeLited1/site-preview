import gsap from "gsap";
import { useRef, useState, useEffect } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const PROCESSO_PARAGRAFOS = [
  "Trabalho em ficção, documentário, publicidade e TV — e em cada contexto sei calibrar o processo ao que o projeto exige, inclusive quando o prazo aperta e é preciso encontrar estratégias rápidas para entregar sem perder qualidade.",
  "No documentário, meu ponto forte é transformar material bruto em narrativa — não necessariamente linear, mas sempre coesa. O que me interessa é encontrar a forma que melhor serve à história.",
  "Anos de TV e publicidade me deram precisão no corte dentro de tempos rígidos. Sei o que cabe e o que fica de fora.",
  "Em ficção, atuo nas duas frentes: na assistência — importação, sync, organização de timelines e sinalização de takes com base no relatório de continuidade — e na montagem.",
  "Respeito prazos e decisões artísticas.",
];

const ProcessoModal = ({ onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[95vw] max-w-2xl overflow-hidden rounded-xl border border-[#00e5ff]/15 bg-[#0d0d0d] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-start justify-between border-b border-white/[0.06] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00e5ff]/80">
              Como trabalho
            </p>
            <h2 className="mt-0.5 text-[22px] font-bold tracking-wide text-white">
              Meu Processo
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-[#888] transition hover:border-white/20 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 py-7">
          {PROCESSO_PARAGRAFOS.map((p, i) => (
            <p key={i} className="font-circular-web text-sm leading-relaxed text-white/70">
              {p}
            </p>
          ))}
        </div>

        <div className="border-t border-white/[0.04] py-3 text-center">
          <span className="text-[10px] uppercase tracking-[2px] text-white/20">ESC para fechar</span>
        </div>
      </div>
    </div>
  );
};

const FloatingImage = () => {
  const frameRef = useRef(null);
  const [processoOpen, setProcessoOpen] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      {processoOpen && <ProcessoModal onClose={() => setProcessoOpen(false)} />}

      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          a narrativa em movimento
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="cada pr<b>o</b>jeto, <br /> um proc<b>e</b>sso."
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div
                ref={frameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseLeave}
                onMouseEnter={handleMouseLeave}
                className="story-img-content overflow-hidden"
              >
                <div className="pointer-events-none relative w-full h-full overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "200%",
                      height: "200%",
                      transform: "translate(-50%, -50%)",
                      objectFit: "cover",
                    }}
                  >
                    <source src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128193/story_bg_gxs8of.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            <svg className="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <Button
              id="realm-btn"
              title="veja meu processo"
              containerClass="mt-5 cursor-pointer"
              onClick={() => setProcessoOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
