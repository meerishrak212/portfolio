import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Toaster, toast } from 'react-hot-toast';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {

    const email = 'softcodeultra@gmail.com';
    const quickLinks = [ { name: 'Home', path: '#home' }, { name: 'About', path: '#about' }, { name: 'Portfolio', path: '#portfolio' }, { name: 'Contact', path: '#contact' }];
    const services = [ 'Web Design & Development', 'UI/UX Design', 'Frontend Development', 'React Application' ];
    const techStack = [ 'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion' ];
    
    // পরিবর্তন: ক্লিপবোর্ডে কপি করার ফাংশনটি react-hot-toast ব্যবহার করার জন্য আপডেট করা হয়েছে
    const handleCopy = (textToCopy, message) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // সফলভাবে কপি হলে success টোস্ট দেখানো হবে
            toast.success(message, {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }).catch(err => {
            console.error('Copy failed', err);
            // কপি করতে ব্যর্থ হলে error টোস্ট দেখানো হবে
            toast.error('Could not copy!', {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        });
    };

    // অ্যানিমেশন ভ্যারিয়েন্ট অপরিবর্তিত
    const ctaVariant = { hidden: { opacity: 0, scale: 0.85, y: 50 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.8 } } };
    const lineVariant = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut', delay: 0.5 } } };
    const socialIconsVariant = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.8 } } };
    const iconItemVariant = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    const bottomBarVariant = { hidden: { y: '100%' }, visible: { y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 } } };

    return (
        <motion.footer 
            className="overflow-hidden bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <Toaster position="bottom-center" />


            <motion.div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8" variants={ctaVariant}>
                <div className="p-8 border border-gray-100 shadow-sm rounded-2xl bg-gradient-to-tr from-cyan-50 via-white to-blue-50 md:p-12">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="text-center md:text-left">
                            <p className="text-sm font-semibold tracking-wider text-blue-600 uppercase">Portfolio</p>
                            <h2 className="mt-2 text-2xl font-bold text-gray-800 sm:text-3xl">Have Any Project In Mind?</h2>
                            <p className="max-w-xl mt-3 text-gray-600">Let's turn your idea into a reality. I build modern, fast, and responsive websites.</p>
                        </div>
                        <Link to="/contact" className="flex-shrink-0 inline-block px-6 py-3 text-base font-semibold text-white transition-transform duration-200 bg-blue-600 rounded-lg shadow-md hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Hire Me
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center justify-center w-full gap-4">
                        <motion.div className="flex-grow h-px bg-gray-200" style={{ transformOrigin: 'right' }} variants={lineVariant} />
                        <motion.div className="flex items-center justify-center gap-3" variants={socialIconsVariant}>
                            <motion.button variants={iconItemVariant} onClick={() => handleCopy('https://facebook.com/your-profile', 'Facebook URL Copied!')} aria-label="Facebook" className="text-gray-500 transition hover:text-blue-600"><FaFacebook size={20} /></motion.button>
                            <motion.button variants={iconItemVariant} onClick={() => handleCopy('https://twitter.com/your-profile', 'Twitter URL Copied!')} aria-label="Twitter" className="text-gray-500 transition hover:text-sky-500"><FaTwitter size={20} /></motion.button>
                            <motion.button variants={iconItemVariant} onClick={() => handleCopy('https://instagram.com/your-profile', 'Instagram URL Copied!')} aria-label="Instagram" className="text-gray-500 transition hover:text-pink-600"><FaInstagram size={20} /></motion.button>
                            <motion.button variants={iconItemVariant} onClick={() => handleCopy('https://linkedin.com/in/your-profile', 'LinkedIn URL Copied!')} aria-label="LinkedIn" className="text-gray-500 transition hover:text-blue-700"><FaLinkedin size={20} /></motion.button>
                        </motion.div>
                        <motion.div className="flex-grow h-px bg-gray-200" style={{ transformOrigin: 'left' }} variants={lineVariant} />
                    </div>
                    <motion.button onClick={() => handleCopy(email, 'Email Copied to Clipboard!')} className="text-sm text-gray-600 transition hover:text-blue-600" variants={socialIconsVariant}>
                        {email}
                    </motion.button>
                </div>
            </div>

            <motion.div className="bg-blue-600 text-blue-50" variants={bottomBarVariant}>
                <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:text-left">
                        <div className="hidden col-span-2 md:col-span-1 md:block">
                            <h3 className="text-base font-bold tracking-wide uppercase">Softcode Ultra</h3>
                            <p className="mt-4 text-sm font-light opacity-80">Crafting modern web experiences from design to deployment.</p>
                        </div>
                        <div>
                            <h3 className="text-base font-bold tracking-wide uppercase">Quick Links</h3>
                            <ul className="mt-4 space-y-2 text-sm font-light">
                                {quickLinks.map((link) => ( <li key={link.name}> <a href={link.path} className="transition opacity-80 hover:opacity-100">{link.name}</a> </li> ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-base font-bold tracking-wide uppercase">Services</h3>
                            <ul className="mt-4 space-y-2 text-sm font-light">
                                {services.map((service) => ( <li key={service} className="opacity-80">{service}</li> ))}
                            </ul>
                        </div>
                        <div className="hidden md:block">
                            <h3 className="text-base font-bold tracking-wide uppercase">My Tech Stack</h3>
                            <ul className="mt-4 space-y-2 text-sm font-light">
                                {techStack.map((tech) => ( <li key={tech} className="opacity-80">{tech}</li> ))}
                            </ul>
                        </div>
                    </div>
                    <div className="text-sm text-center border-t border-blue-500/30 md:flex md:justify-between md:text-left">
                        <p className="opacity-80">SoftCode Ultra &copy; {new Date().getFullYear()} All Rights Reserved.</p>
                    </div>
                </div>
            </motion.div>
        </motion.footer>
    );
};

export default Footer;