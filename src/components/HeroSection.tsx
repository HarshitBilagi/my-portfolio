'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code } from 'lucide-react';

const GridHero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    };

    return (
        <section className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-[#0A0A0A] p-4 sm:p-8">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,223,216,.15),rgba(255,255,255,0))]"></div>
            </div>
            
            <motion.div 
                className="relative z-10 grid w-full max-w-6xl grid-cols-4 grid-rows-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="col-span-4 md:col-span-2 row-span-2 p-6 rounded-2xl glass-card flex flex-col justify-end">
                    <h1 className="font-futurism text-4xl md:text-5xl font-bold text-white tracking-tighter">
                        Your Name
                    </h1>
                    <p className="mt-2 text-lg text-gray-300">
                        Creative Developer architecting immersive web experiences.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="col-span-4 md:col-span-2 p-6 rounded-2xl glass-card flex flex-col justify-center items-center">
                    <p className="text-gray-300 text-center">
                        It's 11:39 AM on a Friday here in Bengaluru, India. <br/> Currently focused on building the future of the web.
                    </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 p-6 rounded-2xl glass-card flex flex-col justify-center items-center gap-2">
                    <MapPin className="text-cyan-400" size={24}/>
                    <p className="font-semibold text-white">Bengaluru, IN</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 p-6 rounded-2xl glass-card flex flex-col justify-center items-center gap-2">
                    <Briefcase className="text-pink-500" size={24}/>
                    <p className="font-semibold text-white">Available for Work</p>
                </motion.div>

                <motion.div variants={itemVariants} className="col-span-4 md:col-span-2 p-6 rounded-2xl glass-card flex flex-col justify-center items-start">
                    <div className="flex items-center gap-2">
                        <Code className="text-gray-400" size={20}/>
                        <p className="text-gray-300">Core Stack:</p>
                    </div>
                    <p className="font-semibold text-white mt-1">Next.js, TypeScript, Framer Motion</p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default GridHero;
