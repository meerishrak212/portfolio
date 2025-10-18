import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import manimg from '../images/man.jpg';

const tabContent = {
    about: {
        eyebrow: "About Us",
        title: "Meet The Creative Minds",
        gradientClass: "bg-gradient-to-r from-yellow-500 to-orange-500",
        description: [
            "We are a dynamic team of UI/UX designers and developers, passionate about crafting visually stunning and highly functional digital experiences. With a keen eye for detail and a deep understanding of user behavior, we transform complex ideas into intuitive and engaging solutions that drive results."
        ],
        skills: [
            { name: "Node", percentage: 95 }, { name: "React", percentage: 84 },
            { name: "Tailwind", percentage: 78 }, { name: "MongoDB", percentage: 88 },
        ],
    },
    education: {
        eyebrow: "Our Foundation",
        title: "Expertise & Qualifications",
        gradientClass: "bg-gradient-to-r from-blue-500 to-purple-600",
        description: [
            "Our team consists of passionate MERN Stack developers dedicated to mastering the full spectrum of modern web technologies. We believe in continuous growth and stay ahead of the curve by constantly refining our skills.",
            "With a solid foundation built on comprehensive training and hands-on projects, we possess a deep understanding of both fundamental and advanced development concepts, allowing us to tackle challenges with confidence.",
            "As a professional development team, we apply our collective skills to build responsive, scalable, and user-centric web applications that not only meet but exceed client expectations."
        ],
        skills: [
            { name: "Algorithms", percentage: 90 }, { name: "Data Structures", percentage: 85 },
            { name: "UX Research", percentage: 92 },
        ],
    },
    experience: {
        eyebrow: "Our Experience",
        title: "Proven Professional Experience",
        gradientClass: "bg-gradient-to-r from-green-500 to-cyan-500",
        description: [
            "As a skilled MERN Stack development team, we specialize in creating modern, responsive, and high-performance web applications. Fusing a strong grasp of UI/UX design with technical precision, we transform ambitious ideas into visually captivating and user-friendly interfaces.",
            "Our proficiency spans both frontend and backend development, enabling us to implement custom features, fluid animations, and dynamic interactions that create a memorable user experience.",
            "Leveraging strong problem-solving skills and expertise in speed optimization, we are committed to delivering clean, efficient, and scalable solutions tailored to each client’s unique vision and business goals.",
            "Our collective provides comprehensive web development services, ensuring professional-quality results for businesses and individuals worldwide."
        ],
        skills: [
            { name: "Fiverr", percentage: 75 }, { name: "Upwork", percentage: 63 },
            { name: "Marketing", percentage: 83 },
        ],
    },
};

const SkillCircle = memo(({ name, percentage, isVisible }) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = 52;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        if (isVisible) {
            const duration = 1500;
            const startTime = performance.now();
            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentPercentage = Math.floor(easedProgress * percentage);
                setAnimatedValue(currentPercentage);
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
    }, [isVisible, percentage]);

    return (
        <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative flex items-center justify-center w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                    <motion.circle
                        className="text-yellow-400"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="60"
                        cy="60"
                        initial={{ strokeDashoffset: circumference }}
                        animate={isVisible ? { strokeDashoffset: circumference - (percentage / 100) * circumference } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">{animatedValue}%</span>
            </div>
            <p className="font-semibold text-gray-700">{name}</p>
        </div>
    );
});

export default function About() {
    const [activeTab, setActiveTab] = useState("about");
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        
        const currentSectionRef = sectionRef.current;
        if (currentSectionRef) observer.observe(currentSectionRef);
        
        return () => { if (currentSectionRef) observer.unobserve(currentSectionRef); };
    }, []);

    const currentContent = tabContent[activeTab];
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
    const imageVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } };

    return (
        <motion.section
            id="about"
            ref={sectionRef}
            className="px-4 py-20 bg-white sm:px-6 lg:px-8 scroll-target"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="grid items-center w-full max-w-6xl grid-cols-1 gap-16 mx-auto md:grid-cols-2">
                <motion.div className="relative hidden w-full max-w-sm mx-auto md:block md:mx-0 h-[480px]" variants={imageVariants}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path fill="#FFD700" d="M48.2,-64.9C62.1,-55.1,72.9,-41.2,78.2,-25.5C83.5,-9.8,83.4,7.8,77.5,23.1C71.6,38.5,60,51.7,46.1,61.9C32.3,72.2,16.1,79.5,-1.3,80.9C-18.7,82.3,-37.4,77.8,-51.2,67.6C-65,57.4,-73.9,41.6,-77,24.8C-80.1,8,-77.4,-9.9,-69.5,-24.1C-61.6,-38.3,-48.5,-48.9,-35.1,-58.5C-21.7,-68.1,-8.1,-76.8,6.8,-79.2C21.7,-81.7,43.3,-78.2,48.2,-64.9Z" transform="translate(100 100) scale(1.1)" />
                        </svg>
                    </div>
                    <div className="absolute inset-0 z-10 p-4">
                        <img 
                            src={manimg} 
                            alt="A creative professional from the team" 
                            className="object-cover w-full h-full" 
                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 75%)' }} 
                            loading="lazy"
                            decoding="async"
                            width="384"
                            height="480"
                        />
                    </div>
                    <a href="/path-to-your-company-profile.pdf" download className="absolute z-20 px-6 py-3 font-semibold text-gray-800 transition-all duration-300 transform -translate-x-1/2 bg-white border border-gray-200 rounded-md shadow-lg -bottom-5 left-1/2 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        Download Our Profile
                    </a>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-8 text-center md:text-left">
                    <h2 className="mb-0 text-3xl font-bold text-gray-900 md:hidden">About Us</h2>
                    <div className="flex justify-center gap-3 pb-2 border-b border-gray-200 md:justify-start">
                        {Object.keys(tabContent).map((tabId) => (
                            <button key={tabId} onClick={() => setActiveTab(tabId)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 focus:outline-none border ${activeTab === tabId ? "bg-yellow-400 text-black border-yellow-400 shadow" : "text-gray-600 border-transparent hover:bg-yellow-100 hover:border-yellow-200"}`}>
                                {tabId.charAt(0).toUpperCase() + tabId.slice(1)}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <p className="font-semibold text-yellow-500">{currentContent.eyebrow}</p>
                            <h2 className={`text-3xl sm:text-4xl font-bold bg-clip-text text-transparent inline-block ${currentContent.gradientClass}`}>
                                {currentContent.title}
                            </h2>
                            <div className="space-y-4">
                                {currentContent.description.map((paragraph, index) => (
                                    <p key={index} className="leading-relaxed text-gray-600">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="animate-fade-in">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">Our Core Skills</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10">
                            {currentContent.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                                >
                                    <SkillCircle name={skill.name} percentage={skill.percentage} isVisible={isVisible} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}