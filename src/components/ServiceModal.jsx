import React, { memo } from 'react';
import { motion } from 'framer-motion';

const XIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ServiceModal = memo(({ service, onClose }) => {
    const IconComponent = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl p-8 overflow-y-auto bg-white shadow-xl rounded-2xl md:p-12 max-h-[90vh]"
            >
                <button onClick={onClose} className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-800">
                    <XIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center ${service.colors.iconBg}`}>
                        <IconComponent className={`w-8 h-8 ${service.colors.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">{service.title}</h3>
                </div>
                <div className="mt-6 leading-relaxed text-gray-600 whitespace-pre-wrap">
                    {service.fullDescription}
                </div>
            </motion.div>
        </motion.div>
    );
});

export default ServiceModal;