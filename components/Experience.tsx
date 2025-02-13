"use client";
import React from 'react';
import { Button } from './ui/MovingBorders';
import { workExperience } from '@/data';

const Experience = () => {
  return (
    <div className="py-20" id="experience">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {workExperience.map((card) => (
          <Button 
            key={card.id}
            duration={Math.floor(Math.random() * 5000) + 5000}
            borderRadius="1.75rem"
            className="flex-1 text-white border-neutral-200 dark:border-slate-800 h-full"
          >
            <div className="flex flex-col p-6 gap-4 h-full">
              <div className="flex items-center justify-center">
                <img 
                  src={card.thumbnail} 
                  alt={card.title} 
                  className="w-24 h-24 object-contain"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-center">
                  {card.title}
                </h2>
                <p className="text-white/80 text-center text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Experience;
