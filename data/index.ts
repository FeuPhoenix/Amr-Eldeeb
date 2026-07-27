export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Approach", link: "#approach" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I build the whole thing — interface, data layer, and the unglamorous parts in between.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full object-top opacity-60",
    titleClassName: "justify-end",
    img: "/amr.webp",
    spareImg: "",
  },
  {
    id: 2,
    title: "Based in Doha. Happy to work with a team anywhere.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "What I reach for first",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Computer Science graduate, software engineering major. Writing code since 2020.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Going deeper on the backend — owning the whole request path, not just the screen.",
    description: "What I'm working on",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Hiring, or just want to talk about a project?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

// The pills shown in the "My tech stack" bento tile — kept to things I actually
// build with day to day rather than everything I've ever touched.
export const techStack = {
  left: ["React", "TypeScript", "Next.js"],
  right: ["Tailwind", "Supabase", "Node.js"],
};

export const projects = [
  {
    id: 1,
    title: "Sortak",
    des: "A live product that turns a phone snapshot into a print-ready passport photo — AI generation, card payments, OTP login and print delivery on a 25-function Supabase backend. I built the camera capture flow and the face-scoring service that grades every generated photo and sends the bad ones back for a retry before anyone sees them.",
    img: "/p-sortak.png",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "FastAPI", "Railway"],
    link: "https://www.sortak.net",
  },
  {
    id: 2,
    title: "Body Level",
    des: "Calisthenics training as an RPG skill tree. Exercises unlock as you earn XP, split across Push, Pull, Legs and Core, so progress feels like levelling up rather than logging sets.",
    img: "/p-bodylevel.png",
    stack: ["React", "TypeScript", "Redux Toolkit", "Framer Motion", "Material-UI"],
    link: "https://body-level.vercel.app",
  },
  {
    id: 3,
    title: "StudyWise",
    des: "An AI learning platform that reshapes study material to fit the student, using NLP over a Flask and Firebase backend. I led a team of four and built the REST layer connecting the backend to the clients.",
    img: "",
    stack: ["Python", "Flask", "Firebase", "NLP", "REST APIs"],
    link: "",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "IT Technician",
    company: "Simex Group",
    period: "Nov 2024 – Sep 2025",
    location: "Doha, Qatar",
    desc: "Supported 100+ users across hardware, software and network issues, and provisioned 30+ workstations with a structured asset database behind them. Spent a lot of time on IoT diagnostics and root-cause analysis — good training for debugging things you didn't build.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 2,
    title: "BSc Computer Science, Software Engineering",
    company: "Misr International University",
    period: "2020 – 2024",
    location: "Cairo, Egypt",
    desc: "Software engineering major. Most of what I know about shipping came from building projects end to end here — including leading a four-person team on StudyWise.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    img: "/git.svg",
    link: "https://github.com/FeuPhoenix",
  },
  {
    id: 2,
    name: "LinkedIn",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/amr-eldeeb-cs/",
  },
  {
    id: 3,
    name: "WhatsApp",
    img: "/wha.svg",
    link: "https://wa.me/97433340276",
  },
];

export const contact = {
  email: "amr.eldeeb172@gmail.com",
  phone: "+974 3334 0276",
  location: "Doha, Qatar",
  cv: "/Amr_Eldeeb_Resume.pdf",
};
