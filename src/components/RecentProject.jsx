import { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photo1 from '../images/photo1.png';
import photo2 from '../images/photo2.png';
import photo3 from '../images/photo3.png';
import photo4 from '../images/photo4.png';
import photo5 from '../images/photo5.png';

const IMAGES = [
    { id: 1, category: "E‑commerce", title: "SportsBuzzs", src: photo1, link: "https://www.sportsbuzzs.com/" },
    { id: 2, category: "Club / Community", title: "Smira Club", src: photo2, link: "https://smira.club/" },
    { id: 3, category: "Marketplace", title: "ShaplaMart", src: photo3, link: "https://shaplamart.vercel.app/" },
    { id: 4, category: "Healthcare", title: "Vision Care", src: photo4, link: "https://vision-care.vercel.app/" },
    { id: 5, category: "Blog / Portfolio", title: "WriterFair", src: photo5, link: "https://writerfair.com/" },
];

const LARGE_SCREEN_LIMIT = 6;
const SMALL_SCREEN_LIMIT = 4;

const sectionVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } } };
const modalOverlay = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalContent = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const sampleDetails = [
    "A clean responsive layout with attention to micro-interactions and accessibility.",
    "Built with performance in mind — optimized images, lazy loading & semantic HTML.",
    "Includes a reusable card system, easy to adapt for other projects or sections.",
    "Focus on legible typography, consistent spacing and a polished CTA experience.",
    "Demo includes placeholder content for quick swapping — replace with real data easily.",
];

const ProjectCard = memo(({ img, idx, onDetailsClick }) => {
    return (
        <motion.article
            key={img.id}
            variants={cardVariants}
            className="relative flex flex-col overflow-hidden transition-shadow duration-300 bg-white shadow-sm group rounded-2xl hover:shadow-lg"
        >
            <div className="relative w-full bg-gray-100 h-44 sm:h-52 lg:h-56">
                <img
                    src={img.src}
                    alt={img.title}
                    loading="lazy"
                    decoding="async"
                    width="398"
                    height="224"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute text-white left-4 bottom-4">
                    <p className="text-xs font-semibold tracking-wide">{img.category}</p>
                    <h3 className="text-sm font-bold leading-tight sm:text-base">{img.title}</h3>
                </div>
                <div className="absolute flex gap-2 transition-opacity opacity-0 right-3 top-3 group-hover:opacity-100">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/40 backdrop-blur-sm">Demo</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/40 backdrop-blur-sm">Details</span>
                </div>
            </div>
            <div className="flex flex-col justify-between flex-1 p-4">
                <p className="text-sm text-gray-600">A polished homepage card — hover to preview image zoom, click to open the demo.</p>
                <div className="flex items-center gap-3 mt-4">
                    <button type="button" onClick={() => window.open(img.link, "_blank")} className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 active:scale-95">
                        Live Demo
                    </button>
                    <button type="button" onClick={() => onDetailsClick(img)} className="inline-flex items-center px-3 py-2 text-sm font-medium border border-gray-200 rounded-full hover:bg-gray-50 focus:outline-none active:scale-95">
                        Details
                    </button>
                    <div className="ml-auto text-xs text-gray-400">#{idx + 1}</div>
                </div>
            </div>
        </motion.article>
    );
});

const ProjectModal = memo(({ modalData, onClose }) => {
    if (!modalData) return null;

    return (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" variants={modalOverlay} initial="hidden" animate="visible" exit="hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
            <motion.div className="relative z-10 w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl" variants={modalContent}>
                <div className="flex items-start gap-4 p-4">
                    <img src={modalData.src} alt={modalData.title} className="flex-shrink-0 object-cover h-20 rounded-md w-28" loading="lazy" decoding="async" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{modalData.title}</h3>
                        <p className="text-xs text-gray-500">{modalData.category} • {modalData.date}</p>
                    </div>
                    <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-700">Close</button>
                </div>
                <div className="p-4 border-t">
                    <p className="text-sm text-gray-700">{modalData.details}</p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="p-3 rounded bg-gray-50">
                            <p className="text-xs text-gray-500">Tech stack</p>
                            <p className="text-sm font-medium">React • Tailwind • Vite</p>
                        </div>
                        <div className="p-3 rounded bg-gray-50">
                            <p className="text-xs text-gray-500">Role</p>
                            <p className="text-sm font-medium">UI & Frontend</p>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => window.open(modalData.link, '_blank')} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Open Live Demo</button>
                        <button onClick={() => navigator.clipboard?.writeText(modalData.link)} className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md">Copy Link</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

export default function RecentProject() {
    const containerRef = useRef(null);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [maxHeight, setMaxHeight] = useState("none");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e) => setIsLargeScreen(e.matches);
        setIsLargeScreen(mq.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!containerRef.current) return;
            const limit = isLargeScreen ? LARGE_SCREEN_LIMIT : SMALL_SCREEN_LIMIT;
            const columns = isLargeScreen ? 3 : 2;
            if (IMAGES.length <= limit) {
                setMaxHeight("none");
                return;
            }
            if (expanded) {
                const fullHeight = containerRef.current.scrollHeight;
                setMaxHeight(`${fullHeight}px`);
                return;
            }
            const children = Array.from(containerRef.current.children);
            if (children.length === 0) return;
            const visibleItems = children.slice(0, limit);
            const rows = Math.ceil(limit / columns);
            const rowHeights = new Array(rows).fill(0);
            visibleItems.forEach((child, index) => {
                const rowIndex = Math.floor(index / columns);
                const childHeight = child.getBoundingClientRect().height;
                if (childHeight > rowHeights[rowIndex]) rowHeights[rowIndex] = childHeight;
            });
            const calculatedHeight = rowHeights.reduce((acc, h) => acc + h, 0);
            const gap = parseFloat(getComputedStyle(containerRef.current).rowGap.replace("px", "") || 0);
            const totalGap = (rows - 1) * gap;
            setMaxHeight(`${calculatedHeight + totalGap}px`);
        }, 60);
        return () => clearTimeout(timer);
    }, [isLargeScreen, expanded]);

    const limit = isLargeScreen ? LARGE_SCREEN_LIMIT : SMALL_SCREEN_LIMIT;
    const shouldShowButton = IMAGES.length > limit;

    const openDetails = (img) => {
        const rnd = sampleDetails[Math.floor(Math.random() * sampleDetails.length)];
        setModalData({ ...img, details: rnd, date: new Date().toLocaleDateString() });
        setModalOpen(true);
    };

    const closeDetails = () => setModalOpen(false);

    return (
        <motion.section
            id="portfolio"
            className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
        >
            <div className="mb-8 text-center">
                <motion.h2 className="text-3xl font-extrabold text-gray-900 lg:text-4xl" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                    Recent Projects
                </motion.h2>
                <p className="mt-2 text-base text-gray-500">Showcase: E‑commerce, Community & Portfolio UIs</p>
            </div>
            <div style={{ maxHeight, transition: "max-height 700ms cubic-bezier(0.4, 0, 0.2, 1)", overflow: "hidden" }}>
                <motion.div ref={containerRef} className="grid items-start grid-cols-2 gap-6 lg:grid-cols-3" variants={sectionVariants}>
                    {IMAGES.map((img, idx) => (
                        <ProjectCard key={img.id} img={img} idx={idx} onDetailsClick={openDetails} />
                    ))}
                </motion.div>
            </div>
            {shouldShowButton && (
                <motion.div className="flex justify-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <button onClick={() => setExpanded((s) => !s)} aria-expanded={expanded} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 active:scale-95">
                        {expanded ? "Show less" : "See more"}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </motion.div>
            )}
            <AnimatePresence>
                {modalOpen && <ProjectModal modalData={modalData} onClose={closeDetails} />}
            </AnimatePresence>
        </motion.section>
    );
}