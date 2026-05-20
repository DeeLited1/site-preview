import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Sobre", "Serviços", "Contato"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const scWidgetRef = useRef(null);
  const navContainerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.onload = () => {
      const widget = window.SC.Widget(document.getElementById("sc-widget"));
      scWidgetRef.current = widget;
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (scWidgetRef.current) scWidgetRef.current.pause();
      setIsAudioPlaying(false);
      setIsIndicatorActive(false);
    };
    window.addEventListener("pauseMusic", handler);
    return () => window.removeEventListener("pauseMusic", handler);
  }, []);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    if (scWidgetRef.current) {
      if (isAudioPlaying) {
        scWidgetRef.current.pause();
      } else {
        scWidgetRef.current.play();
      }
    }
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <div
              className="relative overflow-hidden cursor-default transition-all duration-500 ease-in-out"
              style={{ width: logoHovered ? '13rem' : '2.4rem' }}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <span className={`absolute top-0 left-0 font-zentry text-xl font-bold tracking-widest text-blue-50 transition-opacity duration-300 ${logoHovered ? 'opacity-0' : 'opacity-100'}`}>
                DP
              </span>
              <span className={`whitespace-nowrap font-zentry text-xl font-bold tracking-widest text-blue-50 transition-opacity duration-300 ${logoHovered ? 'opacity-100' : 'opacity-0'}`}>
                Daniele Pimentel
              </span>
            </div>

            <a href="#projetos">
              <Button
                id="product-button"
                title="Portfólio"
                rightIcon={<TiLocationArrow />}
                containerClass="!bg-[#00e5ff] md:flex hidden items-center justify-center gap-1"
              />
            </a>
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item === "Projetos" ? "projetos" : item === "Sobre" ? "about" : item === "Contato" ? "contact" : item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <iframe
                id="sc-widget"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/danielepimentel/sets/daniele-pimentel-site&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false"
                className="hidden"
                allow="autoplay"
                title="soundcloud player"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
