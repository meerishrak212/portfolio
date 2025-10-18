import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import manimg from '../images/man.jpg';

function useOnScreen(options) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, options);
        
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
}

const Stat = memo(function Stat({ label, end, suffix, isVisible }) {
    const [value, setValue] = useState(0);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!isVisible) return;
        
        const duration = 2000;
        const start = performance.now();
        
        const tick = (timestamp) => {
            const elapsed = timestamp - start;
            const progress = Math.min(1, elapsed / duration);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(easedProgress * end));
            
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [end, isVisible]);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={isVisible ? { opacity: 1, y: 0 } : {}} 
            transition={{ duration: 0.5 }} 
            className="flex flex-col justify-center h-full p-3 text-center transition-all duration-300 border bg-white/60 backdrop-blur-sm sm:p-5 rounded-xl border-violet-100 hover:shadow-lg hover:border-violet-200"
        >
            <p className="text-lg font-bold leading-none sm:text-2xl md:text-3xl lg:text-4xl text-violet-800">{value}{suffix}</p>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-2">{label}</p>
        </motion.div>
    );
});

const TypingText = ({ line1, line2, className, spanClassName }) => {
    const line1Letters = Array.from(line1);
    const line2Letters = Array.from(line2);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.2 * i },
        }),
    };

    const child = {
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
        hidden: { opacity: 0, y: 20 },
    };

    return (
        <motion.h1 variants={container} initial="hidden" animate="visible" className={className}>
            <div>
                {line1Letters.map((letter, index) => (
                    <motion.span key={index} variants={child}>
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </div>
            <div className={spanClassName}>
                {line2Letters.map((letter, index) => (
                    <motion.span key={index} variants={child}>
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </div>
        </motion.h1>
    );
};


export default function Hero() {
    const stats = [
        { label: 'Y. Experience', value: 2, suffix: '' },
        { label: 'Projects Completed', value: 50, suffix: '+' },
        { label: 'Happy Clients', value: 28, suffix: '' }
    ];
    const [statsRef, isStatsVisible] = useOnScreen({ threshold: 0.5 });

    const paragraphVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.5, ease: 'easeOut' } },
    };
    
    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 1.8, ease: [0.22, 1, 0.36, 1] } },
    };

    const imageWrapperVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.3, ease: 'easeOut' } },
    };
    
    const imageRevealVariants = {
        hidden: { clipPath: 'inset(0 100% 0 0)' },
        visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, delay: 0.6, ease: [0.4, 0, 0.2, 1] } },
    };

    return (
        <div id="home" className="relative w-full pt-10 font-sans bg-white">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-50 pointer-events-none bg-gradient-to-l from-violet-100/60 via-pink-50/30 to-transparent -z-0 blur-3xl md:opacity-100"></div>
            
            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <main className="flex flex-col items-center gap-12 pt-12 md:pt-20 md:grid md:grid-cols-2 md:gap-6">
                    <div className="w-full text-center md:text-left md:w-auto">
                        <TypingText
                            line1="Hello, How"
                            line2="Can I Help You"
                            className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl md:text-5xl lg:text-6xl"
                            spanClassName="text-violet-600"
                        />
                        <motion.p 
                            variants={paragraphVariants} 
                            initial="hidden" 
                            animate="visible" 
                            className="max-w-xl mx-auto mt-4 text-base text-gray-600 sm:mt-6 md:text-lg md:mx-0"
                        >
                            We are working <span className="font-semibold text-gray-800">UI/UX Designer</span> and <span className="font-semibold text-gray-800">Developement</span> based in worldwide. We strive to build immersive and beautiful web applications through carefully crafted code and user-centric design.
                        </motion.p>
                        <motion.div 
                            variants={buttonVariants} 
                            initial="hidden" 
                            animate="visible" 
                            className="flex justify-center mt-6 sm:mt-8 md:justify-start"
                        >
                            <Link to="/contact" className="px-6 py-3 text-base font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg sm:px-8 sm:py-4 bg-violet-600 sm:text-lg hover:bg-violet-700 hover:scale-105">
                                Say Hello!
                            </Link>
                        </motion.div>
                    </div>
                    <motion.div 
                        variants={imageWrapperVariants} 
                        initial="hidden" 
                        animate="visible" 
                        className="relative w-full max-w-sm md:max-w-none md:w-[480px] lg:w-[640px] flex-shrink-0"
                    >
                        <motion.div 
                            variants={imageRevealVariants} 
                            className="p-3 overflow-hidden bg-white shadow-2xl sm:p-4 rounded-3xl shadow-violet-200/50"
                        >
                            <img 
                                src={manimg} 
                                alt="Professional team ready to help" 
                                className="object-cover w-full h-auto rounded-2xl" 
                                width="640"
                                height="800"
                                fetchPriority="high"
                                decoding="async"
                            />
                        </motion.div>
                    </motion.div>
                </main>
                <section ref={statsRef} className="mt-16 mb-20 md:mt-28">
                    <div className="flex items-stretch gap-3 md:grid md:grid-cols-3">
                        {stats.map((stat, index) => (
                            <motion.div key={stat.label} className="w-1/3 md:w-auto">
                                <Stat label={stat.label} end={stat.value} suffix={stat.suffix} isVisible={isStatsVisible} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}