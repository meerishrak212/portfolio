import React, { Suspense, lazy, useEffect } from 'react'; // পরিবর্তন: Suspense এবং lazy যোগ করা হয়েছে
import { Routes, Route, useLocation } from 'react-router-dom';

// --- স্পিড অপটিমাইজেশন: Code-Splitting ---
// প্রতিটি কম্পোনেন্টকে lazy() ফাংশনের ভেতরে ডায়নামিক import() ব্যবহার করে লোড করা হচ্ছে।
// এর ফলে, এই কম্পোনেন্টগুলো ডিমান্ড অনুযায়ী লোড হবে, একসাথে নয়।
const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Service'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const Offer = lazy(() => import('./components/Offer'));
const RecentProject = lazy(() => import('./components/RecentProject'));
const Testimonial = lazy(() => import('./components/Testimoinal'));
const ContactForm = lazy(() => import('./components/Contactform'));
const NotFoundPage = lazy(() => import('./components/NotFound'));

// একটি সাধারণ লোডিং ইন্ডিকেটর যা কম্পোনেন্ট লোড হওয়ার সময় দেখানো হবে
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{
            border: '5px solid #e5e7eb',
            borderTop: '5px solid #6366f1',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1.2s linear infinite'
        }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
);

// এই লেআউট কম্পোনেন্টটি হেডার এবং ফুটারকে সব পেজের জন্য কমন রাখবে
const MainLayout = ({ children }) => {
    // যখনই কোনো নতুন পেইজে ভিজিট করা হবে, তখন এই কোডটি পেইজকে স্ক্রল করে উপরে নিয়ে যাবে।
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

// হোম পেজের কন্টেন্টগুলো এখানে থাকবে
const HomePageContent = () => {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <ContactPage />
            <Offer />
            <RecentProject />
            <Testimonial />
        </>
    );
};

const App = () => {
    return (
        // পরিবর্তন: Suspense কম্পোনেন্ট দিয়ে পুরো অ্যাপটি মোড়ানো হয়েছে।
        // fallback prop-এর মাধ্যমে আমরা বলে দিচ্ছি যে lazy-loaded কম্পোনেন্টগুলো লোড হওয়ার সময় কী দেখানো হবে।
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* হোম পেজের জন্য MainLayout ব্যবহার করা হচ্ছে */}
                <Route path="/" element={
                    <MainLayout>
                        <HomePageContent />
                    </MainLayout>
                } />

                {/* কন্টাক্ট পেজের জন্যও MainLayout ব্যবহার করা হচ্ছে */}
                <Route path="/contact" element={
                    <MainLayout>
                        <ContactForm />
                    </MainLayout>
                } />

                {/* 404 পেজে হেডার-ফুটার থাকবে না */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default App;

