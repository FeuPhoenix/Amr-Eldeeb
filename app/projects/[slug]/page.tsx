import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data";
import CaseStudyBackdrop from "@/components/CaseStudyBackdrop";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.tagline}`,
    description: project.des,
  };
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <main className="relative bg-black-100 flex justify-center flex-col mx-auto sm:px-10 px-5 overflow-x-hidden">
      <CaseStudyBackdrop />

      <article className="max-w-3xl w-full mx-auto pt-32 pb-24 relative z-10">
        <Link
          href="/#projects"
          className="text-sm text-white-200 hover:text-purple transition-colors"
        >
          &larr; Back to all projects
        </Link>

        <header className="mt-8">
          <p className="uppercase tracking-widest text-xs text-blue-100">
            {project.year} &middot; {project.role}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mt-4">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-white-200 mt-3">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="py-1 px-3 text-xs rounded-lg bg-[#10132E] text-white-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.link || project.repo) && (
            <div className="flex flex-wrap gap-5 mt-7">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:underline underline-offset-4"
                >
                  Visit the live site &rarr;
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:underline underline-offset-4"
                >
                  View the code &rarr;
                </a>
              )}
            </div>
          )}
        </header>

        {project.img && (
          <div className="mt-12 rounded-2xl overflow-hidden border border-white/[0.1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.img}
              alt={`${project.title} interface`}
              className="w-full"
            />
          </div>
        )}

        <Section title="The problem">
          {caseStudy.problem.map((p, i) => (
            <p key={i} className="text-white-200 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </Section>

        <Section title="How I approached it">
          {caseStudy.approach.map((step) => (
            <div key={step.heading} className="mb-8">
              <h3 className="text-lg font-bold mb-2">{step.heading}</h3>
              <p className="text-white-200 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </Section>

        <Section title="What it's built with">
          <dl className="flex flex-col gap-4">
            {caseStudy.stackDetail.map((row) => (
              <div
                key={row.group}
                className="md:grid md:grid-cols-[9rem_1fr] md:gap-6"
              >
                <dt className="text-purple text-sm font-medium mb-1 md:mb-0">
                  {row.group}
                </dt>
                <dd className="text-white-200 leading-relaxed">{row.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="What I'd do differently">
          <ul className="flex flex-col gap-4">
            {caseStudy.differently.map((item, i) => (
              <li
                key={i}
                className="text-white-200 leading-relaxed pl-5 border-l border-purple/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <div className="mt-20 pt-10 border-t border-white/[0.1] flex flex-wrap gap-x-8 gap-y-3 items-center">
          <Link
            href="/#projects"
            className="text-purple hover:underline underline-offset-4"
          >
            &larr; All projects
          </Link>
          <a
            href="mailto:amr.eldeeb172@gmail.com"
            className="text-white-200 hover:text-purple transition-colors"
          >
            Ask me about this project
          </a>
        </div>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      {children}
    </section>
  );
}
