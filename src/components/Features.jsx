import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";

const DOCS_VIDEOS = [
  { id: "44b7xISs824", title: "Territórios em Rede - Minas Gerais", year: "", duration: "" },
  { id: "hhadwLWvgQ8", title: "Amazonie", year: "", duration: "" },
];

const FICCAO_VIDEOS = [
  { id: "CHENTiA2qO8", title: "(Des)controle", year: "", duration: "" },
  { id: "Cmq9gsha7dU", title: "Se Eu Fosse Você 3", year: "", duration: "" },
];

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, youtubeId, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {youtubeId ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: "100%",
              aspectRatio: "16/9",
              minWidth: "100%",
              transform: "translate(-50%, -50%)",
              border: "none",
            }}
            allow="autoplay; encrypted-media"
            title={typeof title === "string" ? title : "background video"}
          />
        </div>
      ) : src ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : null}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DocsModal = ({ onClose }) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-[95vw] max-w-5xl overflow-hidden rounded-xl border border-[#00e5ff]/15 bg-[#0d0d0d] shadow-[0_0_60px_rgba(0,0,0,0.8)]">

        <div className="flex items-start justify-between border-b border-white/[0.06] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00e5ff]/80">
              Documentários
            </p>
            <h2 className="mt-0.5 text-[22px] font-bold tracking-wide text-white">
              DOCs
            </h2>
          </div>
          <button
            onClick={activeId ? () => setActiveId(null) : onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-[#888] transition hover:border-white/20 hover:text-white"
          >
            {activeId ? "←" : "✕"}
          </button>
        </div>

        {activeId ? (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black">
            <button
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm text-white backdrop-blur-sm transition hover:border-white/40 hover:text-white"
            >
              ←
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1`}
              className="h-full w-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title="documentário"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
              {DOCS_VIDEOS.map((film, i) => (
                <button
                  key={film.id}
                  onClick={() => setActiveId(film.id)}
                  className="group relative overflow-hidden text-left"
                >
                  <img
                    src={`https://img.youtube.com/vi/${film.id}/maxresdefault.jpg`}
                    alt={film.title}
                    className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#00e5ff] bg-[#00e5ff]/15 backdrop-blur-sm">
                      <TiLocationArrow className="rotate-45 text-2xl text-[#00e5ff]" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[18px] font-bold leading-tight tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {film.title}
                    </p>
                    {(film.year || film.duration) && (
                      <p className="mt-1 text-[10px] tracking-wide text-white/45">
                        {[film.year, film.duration].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-white/[0.04] py-3 text-center">
              <span className="text-[10px] uppercase tracking-[2px] text-white/20">
                ESC para fechar
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const FiccaoModal = ({ onClose }) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-[95vw] max-w-5xl overflow-hidden rounded-xl border border-[#00e5ff]/15 bg-[#0d0d0d] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-start justify-between border-b border-white/[0.06] px-6 py-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[4px] text-[#00e5ff]/80">
              Ficção
            </p>
            <h2 className="mt-0.5 text-[22px] font-bold tracking-wide text-white">
              Filmes
            </h2>
          </div>
          <button
            onClick={activeId ? () => setActiveId(null) : onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-[#888] transition hover:border-white/20 hover:text-white"
          >
            {activeId ? "←" : "✕"}
          </button>
        </div>

        {activeId ? (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black">
            <button
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm text-white backdrop-blur-sm transition hover:border-white/40 hover:text-white"
            >
              ←
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1`}
              className="h-full w-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title="ficção"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-px bg-white/[0.04]">
              {FICCAO_VIDEOS.map((film) => (
                <button
                  key={film.id}
                  onClick={() => setActiveId(film.id)}
                  className="group relative overflow-hidden text-left"
                >
                  <img
                    src={`https://img.youtube.com/vi/${film.id}/maxresdefault.jpg`}
                    alt={film.title}
                    className="aspect-video w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#00e5ff] bg-[#00e5ff]/15 backdrop-blur-sm">
                      <TiLocationArrow className="rotate-45 text-2xl text-[#00e5ff]" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[18px] font-bold leading-tight tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {film.title}
                    </p>
                    {(film.year || film.duration) && (
                      <p className="mt-1 text-[10px] tracking-wide text-white/45">
                        {[film.year, film.duration].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-white/[0.04] py-3 text-center">
              <span className="text-[10px] uppercase tracking-[2px] text-white/20">
                ESC para fechar
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SingleVideoModal = ({ id, title, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-sm text-white backdrop-blur-sm transition hover:border-white/40 hover:text-white"
      >
        ✕
      </button>
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
        className="h-full w-full"
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        title={title}
      />
    </div>
  );
};

const Features = () => {
  const [docsOpen, setDocsOpen] = useState(false);
  const [ficcaoOpen, setFiccaoOpen] = useState(false);
  const [novelasOpen, setNovelasOpen] = useState(false);
  const [clipesOpen, setClipesOpen] = useState(false);

  return (
    <section id="projetos" className="bg-black pb-52">
      {docsOpen && <DocsModal onClose={() => setDocsOpen(false)} />}
      {ficcaoOpen && <FiccaoModal onClose={() => setFiccaoOpen(false)} />}
      {novelasOpen && <SingleVideoModal id="ct9YWB6uIzU" title="Novelas" onClose={() => setNovelasOpen(false)} />}
      {clipesOpen && <SingleVideoModal id="-8cbJBPNtPI" title="Clipes" onClose={() => setClipesOpen(false)} />}

      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-general text-sm uppercase tracking-[4px] text-[#00e5ff]">
            meus trabalhos
          </p>
          <AnimatedTitle
            title="P<b>o</b>rtfólio"
            containerClass="mt-5 !text-white"
          />
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <button
            onClick={() => setDocsOpen(true)}
            className="group relative size-full text-left"
          >
            <img
              src={`https://img.youtube.com/vi/${DOCS_VIDEOS[0].id}/maxresdefault.jpg`}
              alt="DOCs"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/40" />

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
              <div>
                <h1 className="bento-title special-font">
                  D<b>O</b>Cs
                </h1>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00e5ff]">
                <span className="opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                  {DOCS_VIDEOS.length} filmes · clique para explorar
                </span>
                <TiLocationArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </button>
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <button
              onClick={() => setFiccaoOpen(true)}
              className="group relative size-full text-left"
            >
              <img
                src={`https://img.youtube.com/vi/${FICCAO_VIDEOS[0].id}/maxresdefault.jpg`}
                alt="Ficção"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/40" />
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                  <h1 className="bento-title special-font">fic<b>ç</b>ão</h1>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00e5ff]">
                  <span className="opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                    {FICCAO_VIDEOS.length} filmes · clique para explorar
                  </span>
                  <TiLocationArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <button
              onClick={() => setNovelasOpen(true)}
              className="group relative size-full text-left"
            >
              <img
                src="https://img.youtube.com/vi/ct9YWB6uIzU/maxresdefault.jpg"
                alt="Novelas"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/40" />
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                  <h1 className="bento-title special-font">nov<b>e</b>las v<b>e</b>rticais</h1>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00e5ff]">
                  <span className="opacity-60 transition-opacity duration-300 group-hover:opacity-100">clique para assistir</span>
                  <TiLocationArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <button
              onClick={() => setClipesOpen(true)}
              className="group relative size-full text-left"
            >
              <img
                src="https://img.youtube.com/vi/-8cbJBPNtPI/maxresdefault.jpg"
                alt="Clipes"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/50 transition-colors duration-500 group-hover:bg-black/40" />
              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                  <h1 className="bento-title special-font">cli<b>p</b>es</h1>
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#00e5ff]">
                  <span className="opacity-60 transition-opacity duration-300 group-hover:opacity-100">clique para assistir</span>
                  <TiLocationArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h1 className="bento-title special-font max-w-64 text-black">
                sér<b>i</b>es & <b>w</b>eb
              </h1>
              <TiLocationArrow className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <BentoCard src="videos/feature-5.mp4" />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
