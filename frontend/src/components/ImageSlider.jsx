// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router";

// function ImageSlider() {
//   const images = [
//     "/images/img1.jpeg",
//     "/images/img2.jpeg",
//     "/images/img3.jpeg",
//   ];

//   const extendedImages = [
//     images[images.length - 1],
//     ...images,
//     images[0],
//   ];

//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [isTransition, setIsTransition] = useState(true);
//   const isMoving = useRef(false);
//   const timerRef = useRef(null);

//   function startAuto() {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       safeNext();
//     }, 4000);
//   }

//   useEffect(() => {
//     startAuto();
//     return () => clearInterval(timerRef.current);
//   }, []);

//   function safeNext() {
//     if (isMoving.current) return;
//     isMoving.current = true;
//     setIsTransition(true);
//     setCurrentIndex((prev) => prev + 1);
//   }

//   function safePrev() {
//     if (isMoving.current) return;
//     isMoving.current = true;
//     setIsTransition(true);
//     setCurrentIndex((prev) => prev - 1);
//   }

//   function handleTransitionEnd() {
//     isMoving.current = false;

//     if (currentIndex === extendedImages.length - 1) {
//       setIsTransition(false);
//       setCurrentIndex(1);
//     }

//     if (currentIndex === 0) {
//       setIsTransition(false);
//       setCurrentIndex(extendedImages.length - 2);
//     }
//   }

//   return (
//     <div className="relative w-full h-[650px] overflow-hidden">
//       <div
//         onTransitionEnd={handleTransitionEnd}
//         className={`flex h-full ${
//           isTransition ? "transition-transform duration-700" : ""
//         }`}
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {extendedImages.map((img, i) => (
//           <img
//             key={i}
//             src={img}
//             className="w-full h-full object-cover flex-shrink-0"
//             alt="slide"
//           />
//         ))}
//       </div>
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
//         <h1 className="text-4xl font-bold">
//           Log in to personalize your learning journey
//         </h1>
//         <Link to="/login" className="mt-4 bg-slate-400 py-2 px-8 rounded-lg font-semibold text-lg" >Get Started</Link>
//       </div>

//       {/* Left */}
//       <button onClick={safePrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-3 rounded-full">◀</button>

//       {/* Right */}
//       <button onClick={safeNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-3 rounded-full"> ▶</button>
//     </div>
//   );
// }
// export default ImageSlider;


import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/img1.jpeg"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold leading-tight max-w-3xl"
        >
          Learn Smarter with AI Powered Education
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-4 text-lg text-gray-200 max-w-xl"
        >
          Personalized courses, real-time progress tracking, and smarter learning — all in one place.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex gap-4"
        >
          <button className="px-6 py-3 bg-white text-black rounded-2xl font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-white rounded-2xl hover:bg-white hover:text-black transition">
            Explore Courses
          </button>
        </motion.div>
      </div>
    </div>
  );
}
