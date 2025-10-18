import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import contatimage from '../images/Untitled design.png';

const PhoneIcon = memo(({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
));

const EnvelopeIcon = memo(({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
));

const CalendarIcon = memo(({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
    </svg>
));

const ContactCard = memo(({ variants, icon: IconComponent, iconClassName, title, description, contactInfo, buttonText, href, buttonClasses }) => {
    const isInternalLink = href.startsWith('/');
    const commonClasses = `w-full text-white font-semibold px-4 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses} focus:ring-gray-400`;

    return (
        <motion.div
            variants={variants}
            className="flex flex-col p-6 text-center transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:-translate-y-2"
        >
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-100 rounded-full">
                <IconComponent className={iconClassName} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-800">{title}</h3>
            <p className="flex-grow mt-1 text-sm text-gray-500">{description}</p>
            <p className="my-3 font-semibold text-gray-900 break-words">{contactInfo}</p>
            
            {isInternalLink ? (
                <Link to={href} className={commonClasses}>
                    {buttonText}
                </Link>
            ) : (
                <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={commonClasses}
                >
                    {buttonText}
                </a>
            )}
        </motion.div>
    );
});

export default function ContactPage() {
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
    };
    const textVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div id="contact" className="overflow-x-hidden font-sans bg-slate-50">
            <motion.div
                className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
                    <div className="flex flex-col gap-6">
                        <motion.div variants={textVariants}>
                            <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Contact Us</h2>
                            <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Have a project in mind? <span className="block text-indigo-600">Let's Talk.</span>
                            </h1>
                        </motion.div>
                        
                        <motion.p variants={textVariants} className="text-lg leading-relaxed text-gray-600">
                            Whether you have a question, a project idea, or just want to discuss the possibilities, we're here to help. Reach out to us, and let's start a conversation about how we can bring your vision to life.
                        </motion.p>

                        <motion.div
                            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                            className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <ContactCard
                                variants={cardVariants}
                                icon={PhoneIcon}
                                iconClassName="w-7 h-7 text-blue-600"
                                title="Give Us a Call"
                                description="Our team is ready to answer your questions."
                                contactInfo="+8801818458143"
                                buttonText="Call Now"
                                href="tel:+8801818458143"
                                buttonClasses="bg-blue-600 hover:bg-blue-700"
                            />
                            <ContactCard
                                variants={cardVariants}
                                icon={EnvelopeIcon}
                                iconClassName="w-7 h-7 text-green-600"
                                title="Send an Email"
                                description="Prefer writing? Send your project details to us."
                                contactInfo="softcodeultra@gmail.com"
                                buttonText="Email Us"
                                href="mailto:softcodeultra@gmail.com"
                                buttonClasses="bg-green-600 hover:bg-green-700"
                            />
                            <ContactCard
                                variants={cardVariants}
                                icon={CalendarIcon}
                                iconClassName="w-7 h-7 text-purple-600"
                                title="Book an Appointment"
                                description="Let's set a time to discuss your project needs."
                                contactInfo="Schedule Online"
                                buttonText="Book Now"
                                href="/contact"
                                buttonClasses="bg-purple-600 hover:bg-purple-700"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        variants={imageVariants}
                        className="flex items-center justify-center mt-12 lg:mt-0"
                    >
                        <div className="w-full max-w-lg lg:max-w-2xl">
                            <img
                                src={contatimage}
                                alt="A team collaborating on a project"
                                className="object-cover w-full h-full shadow-2xl rounded-2xl"
                                loading="lazy"
                                decoding="async"
                                width="672"
                                height="448"
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};