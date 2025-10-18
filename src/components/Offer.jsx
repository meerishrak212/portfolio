import React, { useEffect, useLayoutEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaServer, FaMobileAlt, FaCloudUploadAlt, FaTools } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import { IoRocketOutline, IoShieldCheckmarkOutline, IoCodeSlashOutline } from 'react-icons/io5';

const cardsData = [
    { 
        id: 1, 
        title: 'Dynamic Frontend with React', 
        icon: FaReact, 
        description: 'We build fast, interactive, and component-based user interfaces using React for a seamless user experience.',
        color: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'hover:border-sky-500' }
    },
    { 
        id: 2, 
        title: 'Robust Backend with Node.js & Express', 
        icon: FaServer, 
        description: 'Developing secure, scalable, and powerful RESTful APIs to handle your application\'s core logic and data flow.',
        color: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'hover:border-slate-500' }
    },
    { 
        id: 3, 
        title: 'Scalable NoSQL Database', 
        icon: SiMongodb, 
        description: 'Utilizing MongoDB for flexible, powerful, and scalable data management, perfect for modern, data-intensive applications.',
        color: { bg: 'bg-green-100', text: 'text-green-600', border: 'hover:border-green-500' }
    },
    { 
        id: 4, 
        title: 'Blazing Fast Performance', 
        icon: IoRocketOutline, 
        description: 'Optimizing code, leveraging modern techniques, and ensuring server-side efficiency so your app loads instantly.',
        color: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'hover:border-orange-500' }
    },
    { 
        id: 5, 
        title: 'Mobile-First Responsive Design', 
        icon: FaMobileAlt, 
        description: 'Ensuring your application looks and functions perfectly on all devices, from large desktops to small smartphones.',
        color: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-500' }
    },
    { 
        id: 6, 
        title: 'Top-Tier Security', 
        icon: IoShieldCheckmarkOutline, 
        description: 'Implementing best practices for authentication, data encryption, and threat protection to keep your application secure.',
        color: { bg: 'bg-red-100', text: 'text-red-600', border: 'hover:border-red-500' }
    },
    { 
        id: 7, 
        title: 'Cloud Deployment & DevOps', 
        icon: FaCloudUploadAlt, 
        description: 'Seamlessly deploying your MERN stack application on cloud platforms like AWS, Vercel, or Heroku for high availability.',
        color: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-500' }
    },
    { 
        id: 8, 
        title: '100% Customizable Solutions', 
        icon: IoCodeSlashOutline, 
        description: 'Every project is built from the ground up, tailored specifically to meet your unique business requirements and brand identity.',
        color: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'hover:border-yellow-500' }
    },
    { 
        id: 9, 
        title: 'Ongoing Support & Maintenance', 
        icon: FaTools, 
        description: 'We provide continuous support and regular updates to ensure your application runs smoothly and stays up-to-date.',
        color: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'hover:border-indigo-500' }
    }
];

const FeatureCard = memo(function FeatureCard({ cardData }) {
    const { title, icon: IconComponent, description, color } = cardData;

    return (
        <motion.article
            variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
            }}
            className={`bg-white rounded-xl p-6 shadow-md transition-all duration-300 ease-out h-full flex flex-col text-center items-center border-b-4 border-transparent ${color.border} hover:shadow-xl hover:-translate-y-2`}
        >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 ${color.bg}`}>
                <IconComponent className={`w-10 h-10 ${color.text}`} />
            </div>
            <div className="flex flex-col flex-grow">
                <h3 className="mb-2 text-lg font-bold leading-tight text-gray-800">{title}</h3>
                <p className="flex-grow text-sm text-gray-500">{description}</p>
            </div>
        </motion.article>
    );
});

export default function Offer() {
    const [isLarge, setIsLarge] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const gridRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    useEffect(() => {
        const update = () => setIsLarge(window.matchMedia('(min-width: 1024px)').matches);
        update();
        window.addEventListener('change', update);
        return () => window.removeEventListener('change', update);
    }, []);

    useLayoutEffect(() => {
        if (!gridRef.current) return;
        
        const measure = () => {
            const gridPaddingTop = parseInt(window.getComputedStyle(gridRef.current).paddingTop, 10);
            const firstCard = gridRef.current.querySelector('article');
            if (!firstCard) return;
            const cardHeight = firstCard.getBoundingClientRect().height;
            const gapPx = 32;
            const visibleRows = isLarge ? 2 : 3;
            const collapsedHeight = visibleRows * cardHeight + (visibleRows - 1) * gapPx + gridPaddingTop;
            setMaxHeight(showAll ? `${gridRef.current.scrollHeight}px` : `${collapsedHeight}px`);
        };

        const timeoutId = setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', measure);
        };
    }, [isLarge, showAll]);

    const needsSeeMore = cardsData.length > (isLarge ? 6 : 6); 
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
    const headerVariants = { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };

    return (
        <motion.section
            id="process"
            className="w-full py-16 overflow-hidden md:py-24 bg-slate-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            <div className="w-full px-6 mx-auto max-w-7xl">
                <motion.div variants={headerVariants} className="mb-12 text-center">
                    <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Our Strengths</h2>
                    <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                        Why Choose Our MERN Stack Services?
                    </p>
                    <p className="max-w-3xl mx-auto mt-4 text-base text-gray-600">
                        We deliver complete, high-performance web solutions using the latest technologies. From dynamic frontends to robust backends, we cover every aspect of modern web development.
                    </p>
                </motion.div>
                <motion.div
                    style={{ maxHeight, overflow: 'hidden', transition: 'max-height 600ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                    <motion.div
                        ref={gridRef}
                        className="grid grid-cols-1 gap-8 pt-8 sm:grid-cols-2 lg:grid-cols-3"
                        variants={containerVariants}
                    >
                        {cardsData.map((card) => (
                            <FeatureCard
                                key={card.id}
                                cardData={card}
                            />
                        ))}
                    </motion.div>
                </motion.div>
                {needsSeeMore && (
                    <motion.div
                        className="flex justify-center mt-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            onClick={() => setShowAll(s => !s)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 active:translate-y-0.5 active:scale-95 transition-all transform focus:outline-none focus:ring-4 focus:ring-indigo-200"
                            aria-expanded={showAll}
                        >
                            <span>{showAll ? 'Show Less' : 'Show All Features'}</span>
                            <motion.svg
                                className="w-5 h-5"
                                viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                animate={{ rotate: showAll ? 180 : 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
}