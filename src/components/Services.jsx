import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "Montagem",
    description:
      "Construção narrativa do corte bruto ao corte fino: ritmo, emoção e coerência de cada cena.",
  },
  {
    number: "02",
    title: "Assistência de Montagem",
    description:
      "Suporte técnico e criativo ao editor — do ingest e organização até a preparação para o corte.",
  },
  {
    number: "03",
    title: "Colorização",
    description:
      "Identidade visual de cor do filme: da correção técnica à paleta que reforça a narrativa.",
  },
  {
    number: "04",
    title: "Finalização",
    description:
      "Entrega do projeto nos formatos exigidos — cinema, TV, streaming ou web.",
  },
];

const SECONDARY = [
  "Direção de produtos documentais",
  "Edição de produto para TV e Web",
];

const Services = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".service-item", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="serviços" className="bg-black py-32 w-screen">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 mb-16">
          <p className="font-general text-sm uppercase tracking-[4px] text-[#00e5ff]">
            o que eu faço
          </p>
          <AnimatedTitle
            title="Ser<b>v</b>iços"
            containerClass="mt-5 !text-white"
          />
        </div>

        <div ref={containerRef} className="px-5">
          {SERVICES.map((service, i) => (
            <div
              key={service.number}
              className={`service-item flex gap-8 py-8 ${
                i < SERVICES.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              <span className="font-zentry text-sm text-[#00e5ff]/60 w-10 shrink-0 pt-1">
                {service.number}
              </span>
              <div>
                <h3 className="font-barlow text-3xl md:text-5xl uppercase text-blue-50 leading-none">
                  {service.title}
                </h3>
                <p className="font-circular-web text-sm md:text-base text-blue-50/50 mt-3 max-w-md">
                  {service.description}
                </p>
              </div>
            </div>
          ))}

<div className="service-item mt-16 flex justify-center">
            <a href="https://wa.me/5521998595665" target="_blank" rel="noopener noreferrer">
              <Button
                title="falar comigo"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-[#00e5ff] text-black flex items-center justify-center gap-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
