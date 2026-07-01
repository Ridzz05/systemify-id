import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Heart, 
    ChatCircle, 
    PaperPlaneRight, 
    Bookmark, 
    Sparkle, 
    ArrowRight, 
    Code, 
    TrendUp, 
    Stack, 
    Check, 
    CursorClick, 
    Plus, 
    Gear, 
    CheckCircle 
} from '@phosphor-icons/react';

// Reusable Instagram-style card component with micro-interactions
function InstagramCard({ 
    variant = 'blue', 
    profileName = 'systemify.id', 
    profileSub = 'Sponsored', 
    badges = [], 
    title = '', 
    description = '', 
    children, 
    initialLikes = 120 
}) {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [commentsCount, setCommentsCount] = useState(12);
    const [isCommented, setIsCommented] = useState(false);

    const handleLike = (e) => {
        if (e) e.stopPropagation();
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleBookmark = (e) => {
        if (e) e.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };

    const handleComment = (e) => {
        if (e) e.stopPropagation();
        if (!isCommented) {
            setCommentsCount(commentsCount + 1);
        } else {
            setCommentsCount(commentsCount - 1);
        }
        setIsCommented(!isCommented);
    };

    const isBlue = variant === 'blue';
    const cardBg = isBlue ? 'bg-brand-blue text-white' : 'bg-brand-lime text-brand-dark';
    const borderColor = isBlue ? 'border-white/10' : 'border-brand-dark/5';
    const profileCircleBg = isBlue ? 'bg-white/20' : 'bg-brand-dark/10';
    const profileInnerBg = isBlue ? 'bg-white/40' : 'bg-brand-dark/30';
    const textSub = isBlue ? 'text-white/60' : 'text-brand-dark/60';
    const textBody = isBlue ? 'text-white/80' : 'text-brand-dark/80';
    const borderDivider = isBlue ? 'border-white/10' : 'border-brand-dark/10';
    
    const iconHoverColor = isBlue ? 'hover:text-brand-lime' : 'hover:text-brand-blue';

    return (
        <div 
            className={`w-full max-w-[360px] aspect-[4/5] rounded-[24px] p-6 shadow-2xl border ${borderColor} flex flex-col justify-between relative overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out ${cardBg}`}
        >
            {/* Background Accent Gradients */}
            <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-2xl ${isBlue ? 'bg-brand-lime/20' : 'bg-brand-blue/20'}`} />
            
            {/* Card Header (Instagram Profile Style) */}
            <div className={`flex items-center gap-3 border-b ${borderDivider} pb-4 z-10`}>
                <div className={`w-10 h-10 rounded-full ${profileCircleBg} border ${borderColor} flex items-center justify-center`}>
                    <div className={`w-6 h-6 rounded-full ${profileInnerBg} flex items-center justify-center font-bold text-xs`}>
                        {profileName.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="font-extrabold text-sm tracking-tight leading-none mb-1">{profileName}</span>
                    <span className={`text-[10px] ${textSub} leading-none`}>{profileSub}</span>
                </div>
                <div className="ml-auto flex gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-white/40' : 'bg-brand-dark/40'}`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-white/40' : 'bg-brand-dark/40'}`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-white/40' : 'bg-brand-dark/40'}`}></div>
                </div>
            </div>

            {/* Card Content Area */}
            <div className="my-auto flex flex-col gap-4 py-2 z-10">
                {title && (
                    <h3 className="text-xl md:text-2xl font-black tracking-tight leading-tight">
                        {title}
                    </h3>
                )}
                
                {description && (
                    <p className={`text-sm leading-relaxed ${textBody}`}>
                        {description}
                    </p>
                )}

                {/* Badges Container */}
                {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                        <AnimatePresence>
                            {badges.map((badge, idx) => {
                                const isOdd = idx % 2 === 1;
                                let badgeStyle = '';
                                
                                if (isBlue) {
                                    badgeStyle = isOdd 
                                        ? 'bg-brand-lime text-brand-dark' 
                                        : 'bg-white text-brand-dark';
                                } else {
                                    badgeStyle = isOdd 
                                        ? 'bg-brand-blue text-white' 
                                        : 'bg-white text-brand-dark border border-brand-dark/15';
                                }

                                return (
                                    <motion.span 
                                        key={badge}
                                        initial={{ opacity: 0, scale: 0.85, y: 5 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.85, y: -5 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        layout
                                        className={`inline-flex items-center gap-1 bg-white font-bold px-3 py-1.5 rounded-full text-xs shadow-sm hover:-translate-y-0.5 hover:rotate-1 transition-all duration-200 cursor-default ${badgeStyle}`}
                                    >
                                        {isOdd ? <Sparkle className="w-3.5 h-3.5" weight="bold" /> : <Check className="w-3.5 h-3.5" weight="bold" />}
                                        {badge}
                                    </motion.span>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}

                {children}
            </div>

            {/* Card Footer (Engagement Bar) */}
            <div className={`pt-4 border-t ${borderDivider} mt-auto z-10 flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <button 
                            onClick={handleLike}
                            className={`transition-all duration-200 hover:scale-110 active:scale-95 ${isLiked ? 'text-red-500' : ''}`}
                        >
                            <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500' : (isBlue ? 'text-white' : 'text-brand-dark')}`} weight={isLiked ? "fill" : "bold"} />
                        </button>
                        <button 
                            onClick={handleComment}
                            className={`transition-all duration-200 hover:scale-110 active:scale-95 ${iconHoverColor}`}
                        >
                            <ChatCircle className={`w-6 h-6 ${isBlue ? 'text-white' : 'text-brand-dark'}`} weight={isCommented ? "fill" : "bold"} />
                        </button>
                        <button 
                            onClick={(e) => e.stopPropagation()}
                            className={`transition-all duration-200 hover:scale-110 active:scale-95 ${iconHoverColor}`}
                        >
                            <PaperPlaneRight className="w-6 h-6" weight="bold" />
                        </button>
                    </div>
                    <button 
                        onClick={handleBookmark}
                        className={`transition-all duration-200 hover:scale-110 active:scale-95 ${isBookmarked ? 'text-brand-lime' : ''}`}
                    >
                        <Bookmark className={`w-6 h-6 ${isBookmarked ? (isBlue ? 'text-brand-lime' : 'text-brand-blue') : (isBlue ? 'text-white' : 'text-brand-dark')}`} weight={isBookmarked ? "fill" : "bold"} />
                    </button>
                </div>
                <div className="flex justify-between items-center text-xs font-bold px-0.5">
                    <span>{likes.toLocaleString()} likes</span>
                    <span>{commentsCount} comments</span>
                </div>
            </div>
        </div>
    );
}

export default function Welcome() {
    // Card Builder Playground State
    const [playgroundVariant, setPlaygroundVariant] = useState('blue');
    const [playgroundTitle, setPlaygroundTitle] = useState('Build Your Own Vision');
    const [playgroundDesc, setPlaygroundDesc] = useState('Customize this card in real-time. Toggle style, rewrite text, and test micro-interactions!');
    const [playgroundBadges, setPlaygroundBadges] = useState(['Custom Code', 'Tailwind v4', 'React 19']);
    const [badgeInput, setBadgeInput] = useState('');
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const { data: formData, setData: setFormData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    // Card stack shuffling states for Hero section
    const [heroActiveCard, setHeroActiveCard] = useState('blue'); // 'blue' or 'lime'
    const [isHeroShuffling, setIsHeroShuffling] = useState(false);

    const handleHeroShuffle = () => {
        if (isHeroShuffling) return;
        setIsHeroShuffling(true);
        setTimeout(() => {
            setHeroActiveCard(prev => (prev === 'blue' ? 'lime' : 'blue'));
            setIsHeroShuffling(false);
        }, 300);
    };

    const handleAddBadge = (e) => {
        e.preventDefault();
        if (badgeInput.trim() && playgroundBadges.length < 4) {
            setPlaygroundBadges([...playgroundBadges, badgeInput.trim()]);
            setBadgeInput('');
        }
    };

    const handleRemoveBadge = (idx) => {
        setPlaygroundBadges(playgroundBadges.filter((_, i) => i !== idx));
    };

    const handleContactSubmit = (e) => {
        e.preventDefault();
        post(route('briefs.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setContactSubmitted(true);
                reset();
            }
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    return (
        <AppLayout 
            title="Welcome" 
            containerClassName="w-full relative" // override to let child page control internal container styling
        >
            {/* Hero Section */}
            {/* Masalah 4 fix: pb-[280px] diganti dengan min-h-screen agar seimbang dalam scroll snap */}
            <section className="snap-section brand-section brand-section-transparent max-w-7xl mx-auto px-6 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-7 flex flex-col items-start text-left gap-6"
                >
                    {/* Tagline Badge */}
                    <motion.div 
                        variants={itemVariants} 
                        className="inline-flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5 hover:bg-white/[0.08] hover:border-brand-blue/30 transition-all duration-300 select-none"
                    >
                        <span className="bg-brand-lime text-brand-dark font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-widest">
                            NEW AGE
                        </span>
                        <span className="text-xs text-white/80 font-medium flex items-center gap-1.5">
                            Modern Laravel + React Architecture <ArrowRight className="w-3.5 h-3.5 text-brand-lime" weight="bold" />
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white"
                    >
                        We build <span className="font-serif italic font-normal text-brand-lime">digital systems</span> that scale your business.
                    </motion.h1>

                    {/* Description */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
                    >
                        We architect Laravel + React systems with Inertia as the bridge — no separate API, no context switching. Every pixel is a deliberate decision.
                    </motion.p>

                    {/* Call To Actions — Sesuai dengan DESIGN.md Primary & Secondary CTAs */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
                    >
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-brand-lime text-brand-dark font-extrabold rounded-full text-base flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_25px_rgba(181,255,0,0.25)]"
                        >
                            Book a Strategy Call <ArrowRight className="w-5 h-5" weight="bold" />
                        </a>
                        <a
                            href="#playground"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full text-base border border-white/10 hover:border-white/20 flex items-center justify-center gap-2 transition-all duration-200"
                        >
                            Try Card Builder <CursorClick className="w-5 h-5 text-brand-lime" weight="bold" />
                        </a>
                    </motion.div>

                    {/* Metrics Bar — Redesigned into a premium dashboard grid panel */}
                    <motion.div 
                        variants={itemVariants}
                        className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-4 w-full max-w-md"
                    >
                        <div className="flex flex-col gap-1 border-r border-white/5 pr-4">
                            <span className="text-3xl font-black text-white tracking-tight leading-none">10x</span>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-tight">Speed boost</span>
                        </div>
                        <div className="flex flex-col gap-1 border-r border-white/5 px-2">
                            <span className="text-3xl font-black text-brand-lime tracking-tight leading-none">99%</span>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-tight">Lighthouse</span>
                        </div>
                        <div className="flex flex-col gap-1 pl-2">
                            <span className="text-3xl font-black text-white tracking-tight leading-none">3.2x</span>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-tight">Conversion</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Overlapping Interactive Instagram-style Cards (Poker Deck Shuffle style) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.96, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                    className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[520px] w-full mt-12 lg:mt-0"
                >
                    
                    {/* Floating Instruction sticker */}
                    <div className="absolute top-[34%] left-[-8%] hidden xl:block z-30 pointer-events-none select-none">
                        <svg className="w-20 h-20 text-brand-lime rotate-[-30deg]" fill="none" viewBox="0 0 100 100">
                            <path d="M10,80 Q30,40 70,30 M55,18 L73,32 L58,45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
                        </svg>
                        <span className="text-[10px] font-black tracking-widest uppercase text-brand-lime rotate-[5deg] block -mt-4 ml-6 animate-pulse">
                            Click to Shuffle
                        </span>
                    </div>

                    <div 
                        onClick={handleHeroShuffle}
                        className={`relative w-full max-w-[340px] md:max-w-[360px] h-[450px] cursor-pointer select-none ${heroActiveCard === 'blue' ? 'card-blue-active' : 'card-lime-active'}`}
                    >
                        {/* Blue Card */}
                        <div className={`shuffle-card card-blue ${isHeroShuffling && heroActiveCard === 'blue' ? 'shuffling-out' : ''}`}>
                            <InstagramCard 
                                variant="blue" 
                                title="Tailored Web Systems" 
                                description="We compile enterprise-grade Laravel cores directly into React frontends using Inertia. Clean, robust, and zero API boilerplate."
                                badges={['Laravel 13', 'Inertia 2.0', 'PostgreSQL']}
                                initialLikes={342}
                            />
                        </div>

                        {/* Lime Card */}
                        <div className={`shuffle-card card-lime ${isHeroShuffling && heroActiveCard === 'lime' ? 'shuffling-out' : ''}`}>
                            <InstagramCard 
                                variant="lime" 
                                title="Bespoke UI Engineering" 
                                description="Editorial styling, hardware-accelerated micro-interactions, and Tailwind CSS v4 variables compiled straight into the design token system."
                                badges={['Tailwind v4', 'React 19', 'Aesthetics']}
                                initialLikes={892}
                            />
                        </div>
                    </div>
                    
                    {/* Small helpful hint on mobile/tablet */}
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-black mt-4 block xl:hidden">
                        Tap card to swap / shuffle
                    </span>
                </motion.div>
            </section>

            {/* Services Section */}
            <section id="services" className="snap-section brand-section brand-section-subtle min-h-screen flex items-center w-full">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
                    >
                        <div className="flex flex-col items-start gap-4">
                            <span className="bg-brand-blue text-white font-extrabold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider">
                                Our Methodology
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                Custom <span className="font-serif italic font-normal text-brand-lime">digital architecture</span>
                            </h2>
                        </div>
                        <p className="text-white/60 max-w-md text-base leading-relaxed">
                            We don't use generic boilerplates. We engineer tailored code architectures from the ground up to solve your unique business challenges.
                        </p>
                    </motion.div>

                    {/* Bento Grid — asimetris, bukan 4 kartu identik */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:gap-5">

                        {/* [1] Featured Card — Laravel + React via Inertia (lebar 4 kolom) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="md:col-span-4 brand-card hover:border-brand-blue/40 flex flex-col justify-between group min-h-[260px]"
                        >
                            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand-blue/10 blur-2xl group-hover:bg-brand-blue/20 transition-all" />
                            <div className="flex flex-col gap-4 z-10">
                                <div className="flex items-center gap-3">
                                    <div className="brand-icon-box brand-icon-box-blue text-brand-blue">
                                        <Code className="w-6 h-6" weight="bold" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30">System Foundation</span>
                                </div>
                                <h3 className="text-3xl font-black tracking-tight">
                                    Unified Client & Server <span className="text-brand-blue">Efficiency</span>
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed max-w-sm">
                                    Instead of slow loading screens, your customers get a fast, unified flow that behaves like a native desktop app, boosting conversion.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-lime mt-8 cursor-pointer z-10">
                                Explore architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                            </span>
                        </motion.div>

                        {/* [2] Tailwind v4 — accent lime, kolom 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="md:col-span-2 brand-card-accent flex flex-col justify-between group"
                        >
                            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand-lime/15 blur-xl group-hover:bg-brand-lime/25 transition-all" />
                            <div className="flex flex-col gap-4 z-10">
                                <div className="brand-icon-box text-brand-lime">
                                    <TrendUp className="w-6 h-6" weight="bold" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">
                                    Instant Load <span className="text-brand-lime">Performance</span>
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    Your app loads fast on any device. Compiling design tokens straight into CSS variables keeps page load latency to a minimum.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-lime mt-6 cursor-pointer z-10">
                                See the stylesheet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                            </span>
                        </motion.div>

                        {/* [3] Design Systems — kolom 2 (kecil) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="md:col-span-2 brand-card hover:border-brand-blue/30 flex flex-col justify-between group"
                        >
                            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand-blue/10 blur-xl group-hover:bg-brand-blue/20 transition-all" />
                            <div className="flex flex-col gap-4 z-10">
                                <div className="brand-icon-box brand-icon-box-blue text-brand-blue">
                                    <Stack className="w-6 h-6" weight="bold" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight leading-tight">
                                    Bespoke Design Systems
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed">
                                    We establish a unique visual system for your brand, eliminating generic UI templates that make you look like everyone else.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-lime mt-6 cursor-pointer z-10">
                                See components <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                            </span>
                        </motion.div>

                        {/* [4] Animations & FX — lebar 4 kolom, horizontal layout */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="md:col-span-4 brand-card flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 group hover:border-brand-lime/20"
                        >
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-brand-lime/8 blur-2xl group-hover:bg-brand-lime/15 transition-all" />
                            <div className="flex flex-col gap-4 z-10">
                                <div className="brand-icon-box text-brand-lime">
                                    <Sparkle className="w-6 h-6" weight="bold" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight">
                                    Tactile Customer <span className="text-brand-lime">Experience</span>
                                </h3>
                                <p className="text-sm text-white/70 leading-relaxed max-w-md">
                                    Delightful tactile feedback that turns ordinary page interactions into a satisfying experience, building high customer trust.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-lime whitespace-nowrap cursor-pointer z-10 shrink-0">
                                Try interactions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
                            </span>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Playground Section */}
            <section id="playground" className="snap-section brand-section brand-section-transparent min-h-screen flex items-center w-full">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 flex flex-col gap-6 brand-panel">

                        <div className="flex flex-col gap-2">
                            <span className="text-brand-lime text-xs font-black tracking-widest uppercase flex items-center gap-1">
                                <Gear className="w-4 h-4" weight="bold" /> Live Customizer
                            </span>
                            <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                                Customize & Interact
                            </h3>
                            <p className="text-sm text-white/70">
                                Create and customize your Instagram-style card. See the styling react instantly and interact with the elements.
                            </p>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Card Theme Style</label>
                                <div className="flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setPlaygroundVariant('blue')}
                                        className={`flex-1 py-3.5 rounded-full font-extrabold text-sm border flex items-center justify-center gap-2 transition-all duration-200 ${playgroundVariant === 'blue' ? 'bg-brand-blue text-white border-brand-blue/30 shadow-[0_4px_20px_rgba(30,74,233,0.25)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                                    >
                                        <div className="w-3.5 h-3.5 rounded-full bg-brand-blue border border-white/20" /> Primary Blue
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setPlaygroundVariant('lime')}
                                        className={`flex-1 py-3.5 rounded-full font-extrabold text-sm border flex items-center justify-center gap-2 transition-all duration-200 ${playgroundVariant === 'lime' ? 'bg-brand-lime text-brand-dark border-brand-lime/30 shadow-[0_4px_25px_rgba(181,255,0,0.25)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                                    >
                                        <div className="w-3.5 h-3.5 rounded-full bg-brand-lime border border-brand-dark/20" /> Accent Lime
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Heading Title</label>
                                <input 
                                    type="text" 
                                    value={playgroundTitle}
                                    onChange={(e) => setPlaygroundTitle(e.target.value)}
                                    placeholder="Enter card heading..."
                                    maxLength={40}
                                    className="brand-input"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Body Text</label>
                                <textarea 
                                    value={playgroundDesc}
                                    onChange={(e) => setPlaygroundDesc(e.target.value)}
                                    placeholder="Enter description text..."
                                    rows={3}
                                    maxLength={160}
                                    className="brand-input resize-none"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Sticker Badges (Max 4)</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <AnimatePresence>
                                        {playgroundBadges.map((badge, idx) => (
                                            <motion.span 
                                                key={badge}
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.85 }}
                                                transition={{ duration: 0.2 }}
                                                layout
                                                onClick={() => handleRemoveBadge(idx)}
                                                className="bg-brand-lime/10 text-brand-lime hover:bg-red-500 hover:text-white border border-brand-lime/20 hover:border-red-500 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                                                title="Click to remove"
                                            >
                                                {badge} <span className="text-[9px]">✕</span>
                                            </motion.span>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {playgroundBadges.length < 4 && (
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={badgeInput}
                                            onChange={(e) => setBadgeInput(e.target.value)}
                                            placeholder="e.g. Custom Badge"
                                            maxLength={18}
                                            className="brand-input flex-1"
                                        />
                                        <button 
                                            onClick={handleAddBadge}
                                            className="px-5 bg-brand-lime text-brand-dark font-extrabold rounded-xl text-sm hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-1 shadow-[0_2px_15px_rgba(181,255,0,0.15)]"
                                        >
                                            <Plus className="w-4 h-4" weight="bold" /> Add
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6 relative min-h-[460px]">
                        <div className="absolute inset-0 brand-preview-box" />
                        <span className="text-xs text-white/40 uppercase tracking-widest font-black z-10 flex items-center gap-1">
                            <Sparkle className="w-3.5 h-3.5 text-brand-lime" weight="bold" /> Live Render Preview
                        </span>
                        <div className="z-10">
                            <InstagramCard 
                                variant={playgroundVariant}
                                title={playgroundTitle}
                                description={playgroundDesc}
                                badges={playgroundBadges}
                                initialLikes={512}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

            {/* About/Difference Section */}
            <section id="about" className="snap-section brand-section brand-section-subtle min-h-screen flex items-center w-full">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-2xl mx-auto flex flex-col gap-4 mb-16"
                    >
                        <span className="text-brand-lime text-xs font-black uppercase tracking-widest">Why Choose systemify.id</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                            Monolithic speed, <span className="font-serif italic font-normal text-brand-lime">premium visual language</span>
                        </h2>
                        <p className="text-white/70">
                            We believe web applications should look like highly curated magazine layouts, feel fluid, and require zero page-reload latency.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            className="brand-card flex flex-col gap-4"
                        >
                            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand-lime/8 blur-xl" />
                            <div className="w-10 h-10 rounded-full bg-brand-lime text-brand-dark flex items-center justify-center font-extrabold z-10">
                                01
                            </div>
                            <h4 className="text-xl font-bold mt-2">Zero Client-Side Routing Lag</h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Using InertiaJS, we bridge your Laravel server routes directly to React components. The result? No client APIs to write, and instantaneous page switching.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="brand-card flex flex-col gap-4"
                        >
                            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand-blue/8 blur-xl" />
                            <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-extrabold z-10">
                                02
                            </div>
                            <h4 className="text-xl font-bold mt-2">Highly Interactive Aesthetics</h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Every component is loaded with subtle physics animations, physical stickers, tactile shadows, and neon gradients to ensure your brand leaves an unforgettable impression.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="brand-card flex flex-col gap-4"
                        >
                            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/5 blur-xl" />
                            <div className="w-10 h-10 rounded-full bg-white text-brand-dark flex items-center justify-center font-extrabold z-10">
                                03
                            </div>
                            <h4 className="text-xl font-bold mt-2">A Stack That Works Together</h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                                React 19, Tailwind v4, Laravel 13, Vite 8 — each chosen because it solves a real problem in the chain. They interoperate in ways a generic boilerplate never achieves.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact" className="snap-section brand-section brand-section-transparent min-h-screen flex items-center w-full">
                <div className="max-w-7xl mx-auto px-6 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.96, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-xl mx-auto brand-panel md:p-12 relative z-10"
                    >
                    <div className="text-center flex flex-col gap-3 mb-8">
                        <span className="text-brand-lime text-xs font-black uppercase tracking-widest">Connect with us</span>
                        <h3 className="text-3xl font-extrabold tracking-tight leading-tight">
                            Ready to <span className="font-serif italic font-normal text-brand-lime">systemify?</span>
                        </h3>
                        <p className="text-sm text-white/60">
                            Send us a message and our lead systems architect will get in touch with you within 24 hours.
                        </p>
                    </div>

                    {contactSubmitted ? (
                        <div className="bg-brand-lime/10 border border-brand-lime/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4 animate-scale-in">
                            <CheckCircle className="w-16 h-16 text-brand-lime" weight="bold" />
                            <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Thank you, <span className="font-extrabold text-white">{formData.name}</span>. We've received your request and will reach out to you at <span className="font-extrabold text-white">{formData.email}</span> shortly.
                            </p>
                            <button 
                                onClick={() => {
                                    setContactSubmitted(false);
                                    setFormData({ name: '', email: '', message: '' });
                                }}
                                className="mt-4 px-6 py-2.5 bg-brand-lime text-brand-dark font-extrabold rounded-full text-xs hover:scale-105 active:scale-95 transition-all"
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Alex Mercer"
                                    className="brand-input"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="alex@company.com"
                                    className="brand-input"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Tell Us About Your Project</label>
                                <textarea 
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="What systems are you looking to build or optimize?"
                                    rows={4}
                                    className="brand-input resize-none"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={processing}
                                className={`w-full py-4 bg-brand-lime text-brand-dark font-extrabold rounded-full text-base transition-all duration-200 shadow-[0_4px_25px_rgba(181,255,0,0.25)] flex items-center justify-center gap-2 ${
                                    processing 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:scale-[1.03] active:scale-[0.97]'
                                }`}
                            >
                                {processing ? 'Sending...' : 'Send Project Brief'} <PaperPlaneRight className="w-4 h-4" weight="bold" />
                            </button>
                        </form>
                    )}
                    </motion.div>
                </div>
            </section>
        </AppLayout>
    );
}
