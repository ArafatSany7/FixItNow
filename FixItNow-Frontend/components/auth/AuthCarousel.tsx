"use client";

import { useState, useEffect } from "react";

const carouselData = [
  {
    title: "Reliable repairs,",
    highlight: "delivered perfectly.",
    description: "Join thousands of satisfied customers who trust our verified professionals for their home maintenance needs.",
  },
  {
    title: "Expert technicians,",
    highlight: "at your doorstep.",
    description: "Our platform connects you with top-rated local experts to handle any repair, big or small, with guaranteed quality.",
  },
  {
    title: "Secure payments,",
    highlight: "peace of mind.",
    description: "Enjoy hassle-free transparent pricing and secure online payments for all your home service bookings.",
  }
];

export function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-lg relative min-h-[200px]">
      {carouselData.map((slide, index) => (
        <div
          key={index}
          className={`transition-opacity duration-1000 ease-in-out absolute inset-0 flex flex-col justify-start pt-4 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text tracking-tight mb-4">
            {slide.title} <br />
            <span className="text-primary">{slide.highlight}</span>
          </h1>
          <p className="text-lg text-text/70">
            {slide.description}
          </p>
        </div>
      ))}


      <div className="opacity-0 pointer-events-none">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pt-4">
          Line 1 <br /> Line 2
        </h1>
        <p className="text-lg">
          Join thousands of satisfied customers who trust our verified professionals for their home maintenance needs.
        </p>
      </div>

      <div className="flex gap-2 pt-6 relative z-20">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-primary" : "w-4 bg-secondary/30 hover:bg-secondary/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
