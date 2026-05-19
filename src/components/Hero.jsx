import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.65;
    } else {
      videoRef.current.muted = true;
    }
    setIsMuted((prev) => !prev);
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading */}
      {!isReady && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-black">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black"
      >
        {/* Local video background — loop nativo sem end screen */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setIsReady(true)}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100vw",
              height: "56.25vw",
              minHeight: "100vh",
              minWidth: "177.78vh",
              transform: "translate(-50%, -50%)",
              objectFit: "cover",
            }}
          >
            <source src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128409/hero_bg_vco8hb.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark overlay — also blocks pointer events from reaching the YouTube iframe */}
        <div className="absolute inset-0 z-10 bg-black/45" />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 glitch-hero">
          trab<b>a</b>lhar?
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 glitch-hero">
              b<b>o</b>ra
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Da ideia à tela <br /> cada frame, uma história
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleMute}
                className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-general text-xs uppercase text-white/70 transition-all hover:border-[#00e5ff] hover:text-[#00e5ff]"
              >
                {isMuted ? (
                  <>
                    <span>🔇</span> som
                  </>
                ) : (
                  <>
                    <span>🔊</span> mudo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black glitch-hero">
        trab<b>a</b>lhar?
      </h1>
    </div>
  );
};

export default Hero;
