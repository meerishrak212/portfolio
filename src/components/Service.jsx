import React, { useState, useEffect, useRef, memo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceModal = lazy(() => import('./ServiceModal'));

const ShoppingCartIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
const BriefcaseIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const LayersIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const CalendarIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const GlobeIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const SchoolIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 22v-4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"/><path d="M18 10a6 6 0 0 1-12 0"/><path d="m22 10-3-4-3 4"/><path d="m2 10 3-4 3 4"/></svg>;
const ChevronDownIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;

const servicesData = [
    { id: 'ecommerce', icon: ShoppingCartIcon, title: "E-Commerce Websites", fullDescription: `We design and develop custom e-commerce platforms that accelerate your business growth. Our solutions combine clean, mobile-first user interfaces with rigorous performance optimization and SEO best practices, so customers enjoy lightning-fast page loads and seamless shopping on any device.`, colors: { iconBg: 'bg-green-100', iconColor: 'text-green-600', buttonClasses: 'text-green-700 bg-green-100 hover:bg-green-200' } },
    { id: 'portfolio', icon: BriefcaseIcon, title: "Portfolio Websites", fullDescription: `We craft clean, well-organized portfolio websites that give visitors a professional first impression the moment they land on your page. A great portfolio doesn’t just look pretty — it sells. We design UI to present your skills and projects clearly, and guide clients to take action.`, colors: { iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', buttonClasses: 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200' } },
    { id: 'custom', icon: LayersIcon, title: "Custom Web Apps", fullDescription: `We are dedicated to crafting exceptional websites that drive business growth. We also breathe new life into outdated websites by completely recreating them or integrating modern features to enhance their performance. Let us build a transparent, beautiful, and highly functional website that sets you apart.`, colors: { iconBg: 'bg-slate-100', iconColor: 'text-slate-600', buttonClasses: 'text-slate-700 bg-slate-100 hover:bg-slate-200' } },
    { id: 'event', icon: CalendarIcon, title: "Event Management", fullDescription: `We build sleek, conversion-focused websites for event planners and management companies. From eye-catching portfolios to automated order confirmation, secure payment gateways (SSL), and performance optimization — we handle the tech so you can focus on creating unforgettable events.`, colors: { iconBg: 'bg-red-100', iconColor: 'text-red-600', buttonClasses: 'text-red-700 bg-red-100 hover:bg-red-200' } },
    { id: 'travel', icon: GlobeIcon, title: "Travel Agency Sites", fullDescription: `We create immersive websites for travel agencies that capture the magic of travel. Showcase breathtaking destinations with stunning galleries, manage complex tour packages effortlessly, and empower customers to book their dream vacations with an intuitive and secure booking engine.`, colors: { iconBg: 'bg-sky-100', iconColor: 'text-sky-600', buttonClasses: 'text-sky-700 bg-sky-100 hover:bg-sky-200' } },
    { id: 'school', icon: SchoolIcon, title: "School Management", fullDescription: `Our comprehensive school management systems are designed to streamline administrative tasks and enhance communication. We offer features like a secure online admissions portal, dedicated student and parent dashboards for tracking academic progress, and seamless communication channels.`, colors: { iconBg: 'bg-amber-100', iconColor: 'text-amber-600', buttonClasses: 'text-amber-700 bg-amber-100 hover:bg-amber-200' } }
];

const ServiceCard = memo(({ service, onDetailsClick }) => {
    const IconComponent = service.icon;
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <motion.div
            variants={cardVariants}
            className="flex flex-col items-center h-full p-6 text-center transition-all duration-300 border border-gray-100 shadow-lg group bg-white/70 backdrop-blur-xl rounded-2xl hover:shadow-2xl hover:-translate-y-2"
        >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${service.colors.iconBg} transition-all duration-300 group-hover:scale-110`}>
                <IconComponent className={`w-10 h-10 ${service.colors.iconColor}`} />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">{service.title}</h3>
            <div className="flex-grow"></div>
            <button onClick={onDetailsClick} className={`mt-6 w-full px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 text-sm ${service.colors.buttonClasses}`}>
                Details
            </button>
        </motion.div>
    );
});

export default function MyServices() {
    const [selectedService, setSelectedService] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const servicesToShow = isMobile && !showAll ? servicesData.slice(0, 4) : servicesData;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    return (
        <>
            <motion.section
                ref={sectionRef}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="w-full px-4 py-20 bg-gradient-to-b from-cyan-50/20 via-white to-white sm:px-6 lg:px-8"
            >
                <div id='services' className="mx-auto max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mb-16 text-center"
                    >
                        <h2 className="inline-block text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text">
                            Our Services
                        </h2>
                        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
                            We provide a wide range of custom web solutions to help your business grow and succeed in the digital world.
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-2 gap-8 lg:grid-cols-3"
                        variants={containerVariants}
                    >
                        {servicesToShow.map((service) => (
                            <ServiceCard key={service.id} service={service} onDetailsClick={() => setSelectedService(service)} />
                        ))}
                    </motion.div>
                    {isMobile && !showAll && servicesData.length > 4 && (
                        <div className="mt-12 text-center">
                            <motion.button
                                onClick={() => setShowAll(true)}
                                className="flex items-center justify-center gap-2 px-8 py-3 mx-auto font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-xl hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>See More Services</span>
                                <ChevronDownIcon className="w-5 h-5 animate-bounce" />
                            </motion.button>
                        </div>
                    )}
                </div>
            </motion.section>
            <Suspense fallback={null}>
                <AnimatePresence>
                    {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
                </AnimatePresence>
            </Suspense>
            <style jsx global>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-bounce { animation: bounce 1.5s ease-in-out infinite; }
            `}</style>
        </>
    );
}