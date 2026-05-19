import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] text-[#00e5ff]">
          Daniele Pimentel
        </p>

        <AnimatedTitle
          title="contando hist<b>ó</b>rias <br /> há mais de 20 an<b>o</b>s."
          containerClass="mt-5 !text-white text-center drop-shadow-[0_0_30px_rgba(0,229,255,0.3)] !text-5xl md:!text-[4.5rem]"
        />

        <div className="about-subtext">
          <p className="text-white">Montadora baseada no Rio de Janeiro</p>
          <p className="text-gray-400">
            Com mais de 20 anos de experiência, seus trabalhos transitam entre
            canais como Discovery Channel, Canal Futura e +Globosat, marcas como
            Volkswagen, ONGs como ActionAid, Médicos Sem Fronteiras e Greenpeace,
            e organizações como Fundação Vale, Cidade Aprendiz e Instituto
            Delete. Na ficção, atuou como assistente de montagem em{" "}
            <em>Descontrole</em> (Migdal Filmes) e{" "}
            <em>Se Eu Fosse Você 3</em> (Total Filmes), e assina novelas
            verticais para Reel Short — um dos formatos de maior crescimento no
            audiovisual global. Assina a montagem do curta <em>F.O.M.E</em>,
            de Marton Olympio, ainda em fase de finalização, com estreia
            prevista para este ano.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                height: "100%",
                aspectRatio: "16/9",
                minWidth: "100%",
                transform: "translate(-50%, -50%)",
                objectFit: "cover",
              }}
            >
              <source src="https://res.cloudinary.com/dr3ccbekm/video/upload/v1779128476/about-bg_gxvxjm.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
