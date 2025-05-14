'use client';

import { FaGithub, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export const Contact = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+40726018217";
    const message = "Buna ziua,am nevoie de";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="h-6 w-6" />,
      link: "https://www.linkedin.com/in/alexandruarmas/",
      bgColor: "bg-[#0A66C2]",
      hoverEffect: "hover:bg-[#0A66C2]/80 hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/50"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="h-6 w-6" />,
      link: "https://github.com/mrarmas02",
      bgColor: "bg-[#24292F]",
      hoverEffect: "hover:bg-[#24292F]/80 hover:scale-110 hover:shadow-lg hover:shadow-[#24292F]/50"
    },
    {
      name: "Twitter",
      icon: <FaXTwitter className="h-6 w-6" />,
      link: "http://www.x.com/mrarmas02",
      bgColor: "bg-black",
      hoverEffect: "hover:bg-black/80 hover:scale-110 hover:shadow-lg hover:shadow-black/50"
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="h-6 w-6" />,
      link: "https://tiktok.com/@mrarmas02",
      bgColor: "bg-[#000000]",
      hoverEffect: "hover:bg-[#000000]/80 hover:scale-110 hover:shadow-lg hover:shadow-[#000000]/50"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="h-6 w-6" />,
      onClick: handleWhatsAppClick,
      bgColor: "bg-[#25D366]",
      hoverEffect: "hover:bg-[#25D366]/80 hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/50"
    }
  ];

  return (
    <section id="contact" className="w-full section-spacing">
      <h1 className="heading-rye group cursor-default">
        Hai să{" "}
        <span className="text-purple transition-all duration-300 group-hover:text-purple/80 group-hover:scale-110">
          colaborăm
        </span>
      </h1>

      <div className="element-spacing flex flex-wrap items-center justify-center gap-4">
        {socialLinks.map((social, index) => (
          social.onClick ? (
            <button
              key={index}
              onClick={social.onClick}
              className={`inline-flex items-center justify-center gap-2 rounded-full p-4 text-white transition-all duration-300 ${social.bgColor} ${social.hoverEffect}`}
              aria-label={social.name}
            >
              {social.icon}
            </button>
          ) : (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full p-4 text-white transition-all duration-300 ${social.bgColor} ${social.hoverEffect}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          )
        ))}
      </div>
    </section>
  );
}; 