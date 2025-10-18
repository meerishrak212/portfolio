import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';
import image6 from '../images/6.jpg';
import image7 from '../images/7.jpg';
import image8 from '../images/8.jpg';

const testimonials = [
    { id: 1, name: 'Donna Ford', text: 'Over the years, The Creative have worked with us on everything from brand design, video, photography, copy, online and print.', image: image1, rating: 5 },
    { id: 2, name: 'Mary Pickford', text: 'The Creative helped us to create this by understanding what we wanted to achieve. Our branding that we achieved is exactly what we set out to achieve.', image: image2, rating: 5 },
    { id: 3, name: 'James Hayes', text: 'The team listened to the brief and came up with some great ideas, one of which we liked and picked. He also helped us arrange a videographer.', image: image3, rating: 5 },
    { id: 4, name: 'Aisha Khan', text: 'Fast, professional and creative — delivered above and beyond. Great communication and attention to detail.', image: image4, rating: 5 },
    { id: 5, name: 'Carlos Mendez', text: 'Excellent work. The designs were on point and the handoff was smooth. Will work again for sure.', image: image5, rating: 5 },
    { id: 6, name: 'Sarah Chen', text: "A truly collaborative partner. They took our initial concept and elevated it to something we couldn't have imagined on our own.", image: image6, rating: 5 },
    { id: 7, name: 'David Lee', text: 'Their process is transparent and efficient. We were kept in the loop at every stage and the final result exceeded our expectations.', image: image7, rating: 5 },
    { id: 8, name: 'Maria Garcia', text: 'I was impressed by their dedication to our project. It felt like they were a true extension of our own team.', image: image8, rating: 5 },
];

const Star = memo(({ filled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${filled ? 'text-teal-500' : 'text-gray-300'}`}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.215-.662 1.536 0l1.681 3.462a1 1 0 00.951.692h3.632c.713 0 1.006.916.485 1.391l-2.938 2.14a1 1 0 00-.364 1.118l1.681 3.462c.321.662-.533 1.28-1.12 1.28-.18 0-.356-.054-.512-.158L10 13.414l-2.938 2.14a1.001 1.001 0 01-1.12-1.28l1.681-3.462a1 1 0 00-.364-1.118L2.232 8.43c-.521-.475-.228-1.391.485-1.391h3.632a1 1 0 00.951-.692l1.681-3.462z" clipRule="evenodd" />
    </svg>
));

const cardVariants = { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } } };

const TestimonialCard = memo(({ testimonial }) => (
    <motion.article
        className="flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[calc(20%-1.2rem)] bg-white rounded-xl shadow-lg p-6 relative flex flex-col"
        variants={cardVariants}
    >
        <div className="absolute -translate-x-1/2 -top-14 left-1/2">
            <div className="w-28 h-28 rounded-md overflow-hidden border-4 border-[#c7d2fe] bg-white">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                    loading="lazy"
                    decoding="async"
                    width="112"
                    height="112"
                />
            </div>
        </div>
        <div className="flex flex-col flex-grow pt-16 text-center">
            <p className="flex-grow mb-6 text-base leading-relaxed text-gray-600">"{testimonial.text}"</p>
            <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < testimonial.rating} />
                ))}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{testimonial.name}</h3>
        </div>
    </motion.article>
));

export default function Testimonial() {
    const scrollContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const clonedTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { threshold: 0.1 });
        const currentSection = sectionRef.current;
        if (currentSection) observer.observe(currentSection);
        return () => {
            if (currentSection) observer.unobserve(currentSection);
        };
    }, []);

    useEffect(() => {
        if (isPaused || !isInView) return;
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, 2500);
        return () => clearInterval(timer);
    }, [isPaused, isInView]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const targetNode = container.children[currentIndex];
        if (targetNode) {
            container.scrollTo({ left: targetNode.offsetLeft, behavior: 'smooth' });
        }

        if (currentIndex >= testimonials.length) {
            const jumpTimeout = setTimeout(() => {
                const currentContainer = scrollContainerRef.current;
                if (currentContainer) {
                    currentContainer.style.scrollBehavior = 'auto';
                    currentContainer.scrollLeft = 0;
                    setCurrentIndex(0);
                    setTimeout(() => {
                        if (currentContainer) {
                            currentContainer.style.scrollBehavior = 'smooth';
                        }
                    }, 50);
                }
            }, 700);
            return () => clearTimeout(jumpTimeout);
        }
    }, [currentIndex, testimonials.length]);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
    const headerVariants = { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
    
    return (
        <motion.section
            ref={sectionRef}
            className="w-full py-20 overflow-x-hidden bg-gray-50"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
                <motion.div className="mb-12" variants={headerVariants}>
                    <div className="inline-block bg-[#2d3748] text-white px-5 py-2 rounded-md font-semibold">
                        Know oneself. Know the customer. Innovate.
                    </div>
                </motion.div>
                <motion.div
                    ref={scrollContainerRef}
                    className="flex gap-6 pt-16 pb-8 overflow-x-auto scrollbar-hide"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    style={{ scrollBehavior: 'smooth' }}
                    variants={containerVariants}
                >
                    {clonedTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                    ))}
                </motion.div>
            </div>
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </motion.section>
    );
}