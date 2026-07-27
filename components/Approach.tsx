"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

// CanvasRevealEffect is a react-three-fiber canvas and only ever renders on
// hover or focus, so there is no reason for three.js to be in the initial
// bundle. Loading it on demand keeps it off the critical path.
const CanvasRevealEffect = dynamic(
  () =>
    import("@/components/ui/CanvasRevealEffect").then(
      (m) => m.CanvasRevealEffect
    ),
  { ssr: false }
);

const Approach = () => {
  return (
    <section className="w-full py-20" id="approach">
      <h2 className="heading">
        How I <span className="text-purple">work</span>
      </h2>
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center gap-4">
        <Card
          title="Understand it first"
          icon={<AceternityIcon order="01" />}
          description="Before I write anything I want to know who it's for and what happens if it's wrong. Sortak exists because passport photos get rejected over millimetres — the spec was the hard part, not the code."
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-emerald-900"
          />
        </Card>
        <Card title="Build the smallest real version" icon={<AceternityIcon order="02" />}
        description="I'd rather have one path working end to end than five half-finished screens. Body Level started as a single skill tree with XP attached — everything else got added once that felt right to use."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-black"
            colors={[
              [236, 72, 153],
              [232, 121, 249],
            ]}
            dotSize={2}
          />
        </Card>
        <Card title="Ship it, then keep it alive" icon={<AceternityIcon order="03" />}
        description="Deploying is the start, not the finish. Two of my projects are live and public right now, which means fixing the things real usage exposes — and a year on IT support taught me plenty about inheriting systems nobody documented."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [active, setActive] = React.useState(false);

  // The canvas reveal is decoration layered behind text that is always
  // readable. It used to be the other way round: the title and description
  // were opacity-0 until :hover, which hid them entirely on touch devices and
  // from anyone navigating by keyboard.
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      className="border border-black/[0.2] group/canvas-card flex flex-col items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-8 relative lg:h-[35rem] rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
            className="h-full w-full absolute inset-0 rounded-3xl overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center">{icon}</div>
        <h3 className="text-white font-bold text-2xl lg:text-3xl">{title}</h3>
        <p className="text-white-200 text-sm lg:text-base mt-4 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2 font-medium text-white backdrop-blur-3xl text-2xl font-bold">
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default Approach;
