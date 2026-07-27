"use client";
import { projects } from "@/data";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { PinContainer } from "./ui/3d-pin";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h2 className="heading">
        Things I&apos;ve {' '}
        <span className="text-purple">built</span>
      </h2>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map(({id, slug, title, des, img, stack}) => (
          <div key={id} className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-[570px] w-[80vw]">
            <PinContainer title={title} href={`/projects/${slug}`} internal>
              <div className="relative flex items-center justify-center sm:w-[570px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10">
                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl bg-[#13162d]">
                  <img src="/bg.png" alt="" aria-hidden="true" />
                </div>
                {img ? (
                  <img src={img} alt={`${title} screenshot`} className="z-10 absolute bottom-0"/>
                ) : (
                  <span className="z-10 absolute inset-0 flex items-center justify-center text-5xl font-bold text-white/20">
                    {title}
                  </span>
                )}
              </div>
              <h3 className="lg:text-2xl font-bold md:text-xl text-base line-clamp-1">
                {title}
              </h3>
              <p className="lg:text-xl lg:font-normal font-light text-sm text-gray-400 line-clamp-2">
                {des}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="py-1 px-3 text-xs rounded-lg bg-[#10132E] text-white-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-end items-center mt-5 mb-3">
                <p className="flex lg:text-lg md:text-xs text-sm text-purple">Read the case study</p>
                <FaLocationArrow className="ms-3" color="#CBACF9" />
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentProjects;