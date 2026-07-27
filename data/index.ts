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

export type Project = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  des: string;
  img: string;
  stack: string[];
  link: string;
  repo: string;
  /** Shipped commercial work whose source isn't public. */
  repoPrivate?: boolean;
  year: string;
  role: string;
  caseStudy: {
    problem: string[];
    approach: { heading: string; body: string }[];
    stackDetail: { group: string; items: string }[];
    differently: string[];
  };
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "sortak",
    title: "Sortak",
    tagline: "AI passport photos that actually pass",
    des: "A live product that turns a phone snapshot into a print-ready passport photo — AI generation, card payments, OTP login and print delivery on a 25-function Supabase backend. I built the camera capture flow and the face-scoring service that grades every generated photo and sends the bad ones back for a retry before anyone sees them.",
    img: "/p-sortak.png",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "FastAPI", "Railway"],
    link: "https://www.sortak.net",
    repo: "",
    repoPrivate: true,
    year: "2025 – present",
    role: "Capture flow and generation quality gate",
    caseStudy: {
      problem: [
        "Passport and ID photos get rejected over millimetres. Head height, eye line, background, expression, shadows — every authority publishes its own spec, and a photo that passes in one country fails in the next. The usual fix is to walk into a studio and pay for it.",
        "Sortak lets someone take the photo on their phone and get back something print-ready. That moves the hard problem from photography into software: the app now has to guarantee a result it cannot see, because generative models do not produce the same output twice.",
        "The failure mode that matters is not an ugly photo. It is a photo that looks fine but is no longer the person who uploaded it — a generative model quietly drifting the face until identity is lost. That gets an application rejected, and the user has no way to tell by looking.",
      ],
      approach: [
        {
          heading: "Fix the capture before fixing the output",
          body: "The quality of everything downstream is set at capture. I built the camera flow with a face guide overlay that positions the subject correctly before the shutter is available, so the model receives a usable frame instead of compensating for a bad one. A lot of that work was unglamorous geometry — one commit exists purely because the guide oval was anchored with a fixed padding-top and sat too high on short viewports.",
        },
        {
          heading: "Score every generated photo, deterministically",
          body: "I built face-scorer, a Python FastAPI service that compares each generated photo against the user's original. Identity is an ArcFace embedding cosine similarity from InsightFace's buffalo_l model, calibrated to a 0–100 score. Geometry comes from MediaPipe FaceMesh — inter-eye distance, jaw width, lip width — normalised into ratios so they survive changes in scale and crop.",
        },
        {
          heading: "Turn a score into a correction, not just a verdict",
          body: "A number that says 'this is wrong' is not useful on its own. Deviations beyond tolerance become critique strings carrying corrective prompt fragments, which feed a retry. The gate does not merely reject a bad generation — it tells the next attempt what to fix. Skin tone only critiques the warm/cool chroma axis; lightness is recorded but never critiqued, because it is dominated by ambient lighting and relighting a dim capture is intended behaviour, not a defect.",
        },
        {
          heading: "Make it deterministic and fail open",
          body: "The same two images always produce the same score, which means a disputed result can be reproduced instead of argued about. The service is authenticated with a shared secret and returns a structured 422 when it cannot find a face — and the calling edge function fails open rather than blocking a user behind a service that might be down.",
        },
      ],
      stackDetail: [
        { group: "Frontend", items: "React, TypeScript, Vite, Tailwind CSS, shadcn-ui, TanStack Query, React Hook Form + Zod" },
        { group: "Backend", items: "Supabase — Postgres, auth, storage, and 25 edge functions covering OTP login, signed uploads, a batch pipeline and operator tooling" },
        { group: "Quality gate", items: "Python, FastAPI, InsightFace (ArcFace), MediaPipe FaceMesh, ONNX Runtime, OpenCV — containerised and deployed separately" },
        { group: "Payments & infra", items: "Paymob card payments with webhook verification, device fingerprinting for abuse prevention, Docker, Railway" },
      ],
      differently: [
        "The scoring thresholds were tuned by hand against a small set of examples. That was fast to get moving and is the part I trust least — a labelled evaluation set would have told me whether the calibration generalises, rather than whether it satisfies the faces I happened to test with.",
        "The quality gate arrived after generation was already working. Building it alongside would have made the retry loop part of the design instead of something fitted around an existing pipeline.",
        "Loading ArcFace and FaceMesh makes the service heavy to cold-start. For a request path a user waits on, I would look at keeping it warm or splitting identity scoring from geometry critique so the cheaper check can answer first.",
      ],
    },
  },
  {
    id: 2,
    slug: "body-level",
    title: "Body Level",
    tagline: "Calisthenics progression as a skill tree",
    des: "Calisthenics training as an RPG skill tree. Exercises unlock as you earn XP, split across Push, Pull, Legs and Core, so progress feels like levelling up rather than logging sets. Built end to end — React and Redux on the front, an Express and MySQL API behind it.",
    img: "/p-bodylevel.png",
    stack: ["React", "TypeScript", "Redux Toolkit", "Express", "MySQL", "JWT"],
    link: "https://body-level.vercel.app",
    repo: "https://github.com/FeuPhoenix/BodyLevel",
    year: "2025",
    role: "Everything — design, frontend, API, schema",
    caseStudy: {
      problem: [
        "Calisthenics is one of the few kinds of training where progression is genuinely structured: you cannot do a one-arm push-up until you can do a normal one, and a pull-up sits on top of a row. The dependencies are real, not motivational.",
        "Every app I looked at flattened that into a checklist. A list of exercises tells you what exists; it does not tell you what you have earned or what is next. The structure that makes calisthenics legible was the exact thing the tooling threw away.",
        "So the question was whether the dependency graph could be the interface rather than something buried in an article — and whether unlocking the next movement could feel like the reward it actually is.",
      ],
      approach: [
        {
          heading: "Model the prerequisites as data, not as copy",
          body: "The schema has a dedicated skill_prerequisites table alongside skills and user_skill_progress. Prerequisites are edges in a graph, which means the tree is generated from the database rather than hardcoded in the UI, and adding a movement is a row rather than a component. Six tables in total, covering users, profiles, sessions, skills, prerequisites and per-user progress.",
        },
        {
          heading: "Let progress drive what the UI reveals",
          body: "A skill's state is derived from whether its prerequisites are satisfied for that user, so locked, available and completed are computed rather than stored as flags that can drift. Redux Toolkit holds the tree state; category filters across Push, Pull, Legs and Core narrow the graph without refetching.",
        },
        {
          heading: "Build the smallest real version first",
          body: "It started as a single skill tree with XP attached and nothing else — no auth, no profiles, no achievements. Getting one path working end to end told me whether the core idea was actually satisfying to use before I spent time on the surrounding product. Everything else got added once that felt right.",
        },
        {
          heading: "Own the backend rather than reaching for a BaaS",
          body: "I wrote the API in Express with TypeScript against MySQL, with JWT sessions, bcrypt password hashing and cookie-based auth. Using a hosted backend would have been faster, but I wanted to write the schema, the queries and the auth myself — the point of the project was partly to stop treating the server as someone else's problem.",
        },
      ],
      stackDetail: [
        { group: "Frontend", items: "React, TypeScript, Redux Toolkit, React Router, Material-UI, Emotion, Framer Motion" },
        { group: "Backend", items: "Express, TypeScript, MySQL (mysql2), with a separate server tsconfig and build step" },
        { group: "Auth", items: "JSON Web Tokens, bcryptjs password hashing, cookie-parser, CORS" },
        { group: "Data", items: "Six-table MySQL schema — users, user_profiles, user_sessions, skills, skill_prerequisites, user_skill_progress" },
      ],
      differently: [
        "The API and the client live in one repository with separate TypeScript configs, and the deployed build does not run the Express server. The hosting story should have been decided before I wrote the backend, not after.",
        "A .env file went into the repository. Nothing in it is live — local host, empty password, placeholder secret — but it should never have been committed, and .gitignore should have covered it from the first commit.",
        "There are no tests around the prerequisite logic, which is the one piece where a bug is invisible: a wrong edge does not crash anything, it just quietly unlocks something too early.",
      ],
    },
  },
  {
    id: 3,
    slug: "studywise",
    title: "StudyWise",
    tagline: "Study material that adapts to the student",
    des: "A final-year AI study platform: upload a PDF or a lecture recording and get back flashcards, multiple-choice questions and a tutor you can ask about the material. I built the question generation and the difficulty model that adapts to how the student is actually performing.",
    img: "",
    stack: ["Python", "Flask", "Firebase", "NLP", "Jinja"],
    link: "",
    repo: "",
    year: "2024",
    role: "Question generation and adaptive difficulty",
    caseStudy: {
      problem: [
        "Students are handed the same material regardless of what they already understand. Turning a set of lecture notes into something a particular person can learn from is work nobody does, because doing it by hand does not scale.",
        "StudyWise was a final-year project aimed at that gap — take the material a student already has and reshape it into practice rather than expecting them to adapt to it.",
        "The hard part is not generating a question. It is generating the right one. A quiz that stays easy teaches nothing and a quiz that jumps straight to hard is abandoned, so the system has to read how someone is doing and move with them.",
      ],
      approach: [
        {
          heading: "Generate questions, then personalise them",
          body: "I built the multiple-choice generation and tied it to the student's own performance, so the material adapts as they work through it rather than serving a fixed set. The difficulty algorithm went through several passes — getting a model that responds to a run of correct answers without whiplashing on a single mistake took more iterations than the generation itself.",
        },
        {
          heading: "Take input in whatever form the student already has it",
          body: "Study material does not arrive as clean text. I worked on the PDF path, including asking questions against a document directly, and on an audio pre-processor so a recorded lecture could be fed in as a source instead of only written notes.",
        },
        {
          heading: "Close the loop with feedback",
          body: "I added the statistics output so a student can see where they are weak rather than just receiving a score, plus flashcard generation as a lighter-weight way through the same material. Some of the work was defensive too — rate-limiting question requests so the generator could not be spammed.",
        },
        {
          heading: "Work as part of a four-person team",
          body: "This was a team project across four people, with the work split so pieces could progress in parallel and still fit together. It was the first project where I had to care about somebody else's interfaces as much as my own.",
        },
      ],
      stackDetail: [
        { group: "Backend", items: "Python, Flask, server-rendered Jinja templates" },
        { group: "Data", items: "Firebase" },
        { group: "Processing", items: "NLP for question and flashcard generation, PDF parsing, audio pre-processing" },
      ],
      differently: [
        "A Firebase service account key was committed to the repository. It is a university project that is no longer running, but a credential should never have been in version control — and the fix is to keep secrets in the environment from the first commit, not to remember to remove them later.",
        "It was never deployed anywhere public, so it exists as a repository and a report rather than something anyone can use. Shipping even a rough hosted version would have been worth more than the last few features we added instead.",
        "The difficulty model was tuned by feel against our own testing. It needed real students and a way to measure whether the adaptation actually helped anyone learn faster.",
      ],
    },
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
