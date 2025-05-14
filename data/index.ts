import { links } from "@/config";

// Function to handle paths with basePath for GitHub Pages
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/port2' : '';
  return `${basePath}${path}`;
};

export const navItems = [
  { name: "Despre", link: "#about" },
  { name: "Proiecte", link: "#projects" },
  { name: "Recenzii", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "Colaborare strânsă cu clienții și comunicare transparentă",
    description: "", 
    // TODO: lg:min-h-[66vh] unde 66vh este înălțimea cardului
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[64vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Flexibilitate în comunicare, indiferent de fusul orar",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Tehnologii folosite",
    description: "Îmbunătățire continuă a abilităților",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Pasionat de tehnologie și dezvoltare software",
    description: "Dezvoltare web modernă și inovativă",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 group/tech hover:scale-[1.02] transition-transform duration-300",
    imgClassName: "opacity-40 group-hover/tech:opacity-60 transition-opacity duration-300",
    titleClassName: "justify-start z-20",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Dezvolt o bibliotecă de animații JavaScript",
    description: "Află mai multe",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Vrei să începem un proiect împreună?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "MrArmas - Personal Link Collection",
    des: "Un website modern și interactiv pentru un dezvoltator de conținut, prezentând profile sociale și informații de contact într-un design elegant și responsiv.",
    img: getImagePath("/mrarmas-avatar.png"),
    iconLists: [getImagePath("/git.svg"), getImagePath("/three.svg"), getImagePath("/host.svg"), getImagePath("/c.svg"), getImagePath("/arrow.svg")],
    link: "https://alexandruarmas.github.io/links/",
    sourceCode: "https://github.com/alexandruarmas/links",
  },
  {
    id: 2,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: getImagePath("/p4.svg"),
    iconLists: [getImagePath("/next.svg"), getImagePath("/tail.svg"), getImagePath("/ts.svg"), getImagePath("/three.svg"), getImagePath("/gsap.svg")],
    link: "https://alexandruarmas.github.io/appleclone/",
    sourceCode: "https://github.com/alexandruarmas/appleclone",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: getImagePath("/p3.svg"),
    iconLists: [getImagePath("/re.svg"), getImagePath("/tail.svg"), getImagePath("/ts.svg"), getImagePath("/three.svg"), getImagePath("/c.svg")],
    link: "https://ai-imaginify.netlify.app",
    sourceCode: "https://github.com/sanidhyy/imaginify",
  },
  {
    id: 4,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: getImagePath("/p2.svg"),
    iconLists: [getImagePath("/next.svg"), getImagePath("/tail.svg"), getImagePath("/ts.svg"), getImagePath("/stream.svg"), getImagePath("/c.svg")],
    link: "https://clone-yoom.netlify.app",
    sourceCode: "https://github.com/sanidhyy/zoom-clone",
  },
] as const;

export const testimonials = [
  {
    quote: `Colaborarea cu ${links.ownerName} a fost o experiență remarcabilă. Am apreciat în mod deosebit atenția la detalii și capacitatea sa de a transforma conceptele noastre în soluții digitale elegante. Comunicarea a fost excelentă pe tot parcursul proiectului, iar rezultatul final a depășit așteptările noastre.`,
    name: "Elena Popescu",
    title: "Director Marketing, TechRO Solutions",
    profileImg: getImagePath("/profiles/elena.jpg")
  },
  {
    quote: `${links.ownerName} a demonstrat o înțelegere profundă a nevoilor noastre de business și a livrat o soluție tehnică impecabilă. Apreciez în mod special abordarea sa proactivă și sugestiile de îmbunătățire pe care ni le-a oferit pe parcursul dezvoltării proiectului.`,
    name: "Adrian Ionescu",
    title: "CEO, Digital Ventures Group",
    profileImg: getImagePath("/profiles/adrian.jpg")
  },
  {
    quote: `Am fost impresionată de profesionalismul și expertiza tehnică a lui ${links.ownerName}. A reușit să implementeze funcționalități complexe într-un mod elegant și ușor de utilizat. Colaborarea cu el a fost o plăcere, iar rezultatele au avut un impact pozitiv direct asupra afacerii noastre.`,
    name: "Maria Dumitrescu",
    title: "Product Manager, InnovateSoft",
    profileImg: getImagePath("/profiles/maria.jpg")
  },
  {
    quote: `${links.ownerName} a fost partenerul ideal pentru dezvoltarea platformei noastre web. Cunoștințele sale tehnice și atenția la experiența utilizatorului au fost esențiale pentru succesul proiectului. Apreciem în mod deosebit disponibilitatea sa de a explica aspectele tehnice într-un mod accesibil.`,
    name: "Radu Munteanu",
    title: "Fondator, CloudTech Romania",
    profileImg: getImagePath("/profiles/radu.jpg")
  },
  {
    quote: `Colaborarea cu ${links.ownerName} a adus o perspectivă fresh și inovatoare proiectului nostru. Abilitățile sale în dezvoltarea full-stack și designul UI/UX au fost exact ce aveam nevoie. Suntem foarte mulțumiți de rezultate și plănuim să continuăm colaborarea și pentru viitoarele noastre proiecte.`,
    name: "Diana Stanciu",
    title: "CTO, Future Web Systems",
    profileImg: getImagePath("/profiles/diana.jpg")
  }
] as const;

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: getImagePath("/cloud.svg"),
    nameImg: getImagePath("/cloudName.svg"),
  },
  {
    id: 2,
    name: "appwrite",
    img: getImagePath("/app.svg"),
    nameImg: getImagePath("/appName.svg"),
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: getImagePath("/host.svg"),
    nameImg: getImagePath("/hostName.svg"),
  },
  {
    id: 4,
    name: "stream",
    img: getImagePath("/s.svg"),
    nameImg: getImagePath("/streamName.svg"),
  },
  {
    id: 5,
    name: "docker.",
    img: getImagePath("/dock.svg"),
    nameImg: getImagePath("/dockerName.svg"),
  },
] as const;

export const workExperience = [
  {
    id: 1,
    title: "Inginer Fullstack Intern",
    desc: "Am contribuit la dezvoltarea unei platforme web complete, colaborând cu echipa pentru a livra soluții eficiente care au optimizat procesele interne și au îmbunătățit experiența utilizatorilor.",
    className: "md:col-span-2",
    thumbnail: getImagePath("/exp1.svg"),
  },
  {
    id: 2,
    title: "Dezvoltator Aplicații Mobile - JSM Tech",
    desc: "Am proiectat și implementat aplicații mobile pentru iOS și Android, optimizând fluxurile de lucru și facilitând comunicarea rapidă între clienți și companie.",
    className: "md:col-span-2",
    thumbnail: getImagePath("/exp2.svg"),
  },
  {
    id: 3,
    title: "Proiect Freelance - Dezvoltare Aplicații",
    desc: "Am coordonat dezvoltarea unei aplicații mobile, de la concept la lansare, asigurându-mă că soluția răspunde nevoilor de business ale clientului și crește eficiența operațională.",
    className: "md:col-span-2",
    thumbnail: getImagePath("/exp3.svg"),
  },
  {
    id: 4,
    title: "Dezvoltator Fullstack Senior",
    desc: "Am dezvoltat și optimizat aplicații web, gestionând atât interfața utilizatorului cât și logica de server, cu focus pe scalabilitate și creșterea performanței afacerii.",
    className: "md:col-span-2",
    thumbnail: getImagePath("/exp4.svg"),
  },
] as const;

export const socialMedia = [
  {
    name: "GitHub",
    img: getImagePath("/git.svg"),
    link: "https://github.com/sanidhyy",
  },
  {
    name: "Twitter",
    img: getImagePath("/twit.svg"),
    link: "https://twitter.com/TechnicalShubam",
  },
  {
    name: "LinkedIn",
    img: getImagePath("/link.svg"),
    link: "https://www.linkedin.com/in/sanidhyy",
  },
] as const;

export const techStack = {
  stack1: ["React.js", "Next.js", "Typescript"],
  stack2: ["Vue.js", "AWS", "MongoDB"],
} as const;
