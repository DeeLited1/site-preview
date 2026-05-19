import { FaLinkedin, FaBehance, FaYoutube, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/in/danielepimentel/", icon: <FaLinkedin /> },
  { href: "https://www.behance.net/danielepimentel", icon: <FaBehance /> },
  { href: "https://www.youtube.com/@daniele_pimentel", icon: <FaYoutube /> },
  { href: "https://instagram.com/danpimentel", icon: <FaInstagram /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#0a0a0a] py-4 text-[#00e5ff] border-t border-[#00e5ff]/20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left text-white/60">
          ©Daniele Pimentel 2025. Todos os direitos reservados
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00e5ff] transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-sm font-light text-white/60 hover:text-[#00e5ff] hover:underline md:text-right"
        >
          Política de Privacidade
        </a>
      </div>
    </footer>
  );
};

export default Footer;
