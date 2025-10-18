import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
 const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
 const [touched, setTouched] = useState({});
 const [errors, setErrors] = useState({});
 const [isSubmitting, setIsSubmitting] = useState(false);

 const validate = (values) => {
 const errs = {};
 if (!values.name.trim()) errs.name = "Name is required.";
 else if (values.name.trim().length < 2) errs.name = "Please enter at least 2 characters.";
 if (!values.email.trim()) errs.email = "E-mail is required.";
 else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Enter a valid e-mail address.";
 if (!values.phone.trim()) errs.phone = "Contact number is required.";
 else if (!/^\+?\d{10,14}$/.test(values.phone.replace(/\s+/g, ""))) errs.phone = "Enter a valid phone number (10–14 digits).";
 if (!values.message.trim()) errs.message = "Message is required.";
 else if (values.message.trim().length < 10) errs.message = "Message should be at least 10 characters.";
 return errs;
 };

 useEffect(() => { setErrors(validate(form)); }, [form]);

 const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
 const handleBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));

 const isValid = Object.keys(errors).length === 0;

 const handleSubmit = (e) => {
 e.preventDefault();
 setTouched({ name: true, email: true, phone: true, message: true });
 const currentErrors = validate(form);
 if (Object.keys(currentErrors).length > 0) return setErrors(currentErrors);
 setIsSubmitting(true);
 const whatsappNumber = "8801818458143";
 const message = `Hi! I want to build a website. Here are my details:\n\nName: ${form.name.trim()}\nE-mail: ${form.email.trim()}\nContact Number: ${form.phone.trim()}\nMessage: ${form.message.trim()}\n\nPlease get back to me.`;
 const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
 window.open(url, "_blank", "noopener,noreferrer");
 setTimeout(() => setIsSubmitting(false), 1200);
 };

  // অ্যানিমেশনের জন্য ভ্যারিয়েন্ট
  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // ভেতরের এলিমেন্টগুলো এক এক করে আসবে
        ease: 'easeOut'
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] // একটি স্মুথ এবং ফাস্ট-টু-স্লো ইফেক্ট
      },
    },
  };

 return (
    // পরিবর্তন: এখানে flex, items-center, justify-center ক্লাসগুলো সরিয়ে দেওয়া হয়েছে এবং প্যাডিং যোগ করা হয়েছে।
    <div className="min-h-screen px-6 py-24 bg-gray-50 sm:py-32">
        <motion.form
        onSubmit={handleSubmit}
        // পরিবর্তন: ফর্মটিকে মাঝখানে আনার জন্য mx-auto যোগ করা হয়েছে।
        className="w-full max-w-md p-8 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl"
        noValidate
        variants={formContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        >
        <motion.h2 variants={formItemVariants} className="mb-6 text-2xl font-semibold text-center text-gray-800">Contact Us</motion.h2>

        <motion.div variants={formItemVariants}>
            <label className="block mb-2 text-sm text-gray-700">Name</label>
            <input name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow mb-2 ${touched.name && errors.name ? 'border-red-300' : 'border-gray-200'} ${touched.name && !errors.name ? 'ring-2 ring-green-200 border-green-300' : ''}`} placeholder="Your full name" aria-invalid={!!(touched.name && errors.name)} aria-describedby={touched.name && errors.name ? 'name-error' : undefined} />
            {touched.name && errors.name && <p id="name-error" className="mb-3 text-xs text-red-600">{errors.name}</p>}
        </motion.div>

        <motion.div variants={formItemVariants}>
            <label className="block mb-2 text-sm text-gray-700">E-mail</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow mb-2 ${touched.email && errors.email ? 'border-red-300' : 'border-gray-200'} ${touched.email && !errors.email ? 'ring-2 ring-green-200 border-green-300' : ''}`} placeholder="you@example.com" aria-invalid={!!(touched.email && errors.email)} aria-describedby={touched.email && errors.email ? 'email-error' : undefined} />
            {touched.email && errors.email && <p id="email-error" className="mb-3 text-xs text-red-600">{errors.email}</p>}
        </motion.div>

        <motion.div variants={formItemVariants}>
            <label className="block mb-2 text-sm text-gray-700">Contact Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} onBlur={handleBlur} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow mb-2 ${touched.phone && errors.phone ? 'border-red-300' : 'border-gray-200'} ${touched.phone && !errors.phone ? 'ring-2 ring-green-200 border-green-300' : ''}`} placeholder="e.g. +8801XXXXXXXXX or 01XXXXXXXXX" aria-invalid={!!(touched.phone && errors.phone)} aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined} />
            {touched.phone && errors.phone && <p id="phone-error" className="mb-3 text-xs text-red-600">{errors.phone}</p>}
        </motion.div>

        <motion.div variants={formItemVariants}>
            <label className="block mb-2 text-sm text-gray-700">Message</label>
            <textarea name="message" rows={4} value={form.message} onChange={handleChange} onBlur={handleBlur} className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-shadow mb-4 resize-y min-h-[86px] ${touched.message && errors.message ? 'border-red-300' : 'border-gray-200'} ${touched.message && !errors.message ? 'ring-2 ring-green-200 border-green-300' : ''}`} placeholder="Tell us about your project, goals or requirements" aria-invalid={!!(touched.message && errors.message)} aria-describedby={touched.message && errors.message ? 'message-error' : undefined} />
            {touched.message && errors.message && <p id="message-error" className="mb-3 text-xs text-red-600">{errors.message}</p>}
        </motion.div>

        <motion.div variants={formItemVariants}>
            <button type="submit" disabled={!isValid || isSubmitting} className={`w-full mt-2 py-2 rounded-md text-white font-medium shadow-md transition-transform transform ${!isValid || isSubmitting ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-900 hover:bg-indigo-800 active:translate-y-0.5'} focus:outline-none focus:ring-2 focus:ring-indigo-400`} aria-disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Opening WhatsApp...' : 'Submit'}
            </button>
        </motion.div>

        <motion.p variants={formItemVariants} className="mt-4 text-xs text-center text-gray-500">By clicking Submit you will be redirected to WhatsApp to finish sending your message.</motion.p>
        </motion.form>
    </div>
 );
}
