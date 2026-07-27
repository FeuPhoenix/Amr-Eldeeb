"use client";
import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";

const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      <div>
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="-top-40 -left-10 md:-left-20 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight className="top-25 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <div>
        <div className="h-screen w-full dark:bg-black-100 bg-white  dark:bg-grid-white/[0.05] bg-grid-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="flex justify-center items-center relative my-20 z-10">
          <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center">
            <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">Full Stack Developer &middot; Doha, Qatar</h2>
            <TextGenerateEffect
              className="text-center text-[40px] md:text-5xl lg:text-7xl font-bold"
              words="I build software people actually use."
            />
            <p className="text-center md:tracking-wider mb-4 text-sm lg:text-2xl mt-4">
              I&apos;m Amr. I&apos;ve been writing code since 2020 and graduated in
              Computer Science in 2024. Since then I&apos;ve worked on three real
              products &mdash; two live on the internet right now, one of them
              taking payments. Come have a look.
            </p>
            <MagicButton
              className="mt-8 text-white text-lg sm:text-xl md:text-2xl py-4 px-8 sm:py-5 sm:px-10 md:py-6 md:px-12 lg:py-7 lg:px-14"
              href="#projects"
            >
             See what I&apos;ve built
            </MagicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
