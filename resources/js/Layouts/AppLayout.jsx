import { useState, useEffect, useRef } from 'react';
import { usePage, Link, Head } from '@inertiajs/react';

export default function AppLayout({ 
    children, 
    title = '', 
    description = 'systemify.id — Laravel + React + Inertia. We architect digital systems that are precise, fast, and built to your exact specification. No templates.',
    showNav = true,
    showFooter = true,
    containerClassName = 'max-w-7xl mx-auto px-6 py-12 md:py-24 relative z-40'
}) {
    // Access global Inertia shared props safely
    const page = usePage();
    const props = page ? page.props : {};
    const auth = props.auth || { user: null };

    return (
        <>
            <Head>
                <title>{title ? `${title} | systemify.id` : 'systemify.id | Modern Digital Architecture & Agency'}</title>
                <meta name="description" content={description} />
            </Head>

            {/* Visual Shell */}
            <div className="scroll-container bg-brand-dark text-white font-sans selection:bg-brand-lime selection:text-brand-dark relative overflow-x-hidden">
                
                {/* === BACKGROUND SYSTEM ===
                     Filosofi: Atmosfer brand yang proporsional dan performant.
                     Lapis 1 → Noise texture: fixed container agar tidak di-repaint saat scroll.
                     Lapis 2 → Brand glow: menggunakan class .brand-glow untuk akselerasi GPU.
                */}

                {/* Lapis 1: Subtle noise texture overlay — fixed to viewport for high performance (octaves=1) */}
                <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
                />

                {/* Lapis 2: Brand glow — diakselerasi GPU (.brand-glow) untuk mencegah lag scrolling */}
                {/* Blue glow: menerangi Hero section secara terfokus */}
                <div className="brand-glow top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-brand-blue/[0.12] blur-[120px]" />
                {/* Lime counter-glow: ditempatkan secara diagonal di area bawah */}
                <div className="brand-glow bottom-[15%] right-[-10vw] w-[40vw] h-[400px] bg-brand-lime/[0.06] blur-[120px]" />

                {/* Side Rails — Rotated brand text on the right/left edges (Atelier Zero style) */}
                <div className="hidden 2xl:flex side-rail left">
                    <span className="rail-text">SYSTEMIFY.ID // DIGITAL SYSTEMS ARCHITECTURE</span>
                </div>
                <div className="hidden 2xl:flex side-rail right">
                    <span className="rail-text">STATUS: ACTIVE // LIVE BUILD ENGINE</span>
                </div>
                {/* Custom Cursor follower */}
                <CustomCursor />

                {/* Header Navigation */}
                {showNav && (
                    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 py-4 flex items-center justify-between z-50 bg-brand-dark/30 backdrop-blur-md border-b border-white/5">
                        <Link href="/" className="flex items-center gap-2 group">
                            {/* Logo: code bracket mark — identitas teknis, bukan letter S biasa */}
                            <span className="w-8 h-8 rounded-xl bg-brand-lime flex items-center justify-center text-brand-dark font-black text-sm shadow-lg group-hover:rotate-6 transition-transform duration-300 tracking-tighter font-mono select-none">
                                &lt;/&gt;
                            </span>
                            <span className="font-extrabold text-2xl tracking-tight text-white group-hover:text-brand-lime transition-colors">
                                systemify<span className="text-brand-lime">.id</span>
                            </span>
                            {/* Status dot — bukan dekorasi, menunjukkan system online/live */}
                            <span
                                className="w-2 h-2 rounded-full bg-brand-lime ml-0.5"
                                title="System online"
                                aria-label="Online"
                            />
                        </Link>

                        {/* Navigation Links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                            <Link href="/#services" className="text-white/70 hover:text-white transition-colors">Services</Link>
                            <Link href="/#playground" className="text-white/70 hover:text-white transition-colors">Playground</Link>
                            <Link href="/#about" className="text-white/70 hover:text-white transition-colors">Why Us</Link>
                            <Link href="/#contact" className="text-white/70 hover:text-white transition-colors">Contact</Link>
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-full text-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="hidden sm:inline-block text-sm font-bold text-white/80 hover:text-white px-3 py-2 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 bg-brand-lime text-brand-dark font-extrabold rounded-full text-sm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-[0_0_20px_rgba(181,255,0,0.3)]"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </header>
                )}

                {/* Main Content Area */}
                <main className={containerClassName}>
                    {children}
                </main>

                {/* Footer */}
                {showFooter && (
                    <footer className="bg-black/40 border-t border-white/5 py-12 relative z-40">
                        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-lg bg-brand-lime flex items-center justify-center text-brand-dark font-black text-xs font-mono">
                                    &lt;/&gt;
                                </span>
                                <span className="font-extrabold text-lg text-white">
                                    systemify<span className="text-brand-lime">.id</span>
                                </span>
                            </div>

                            <p className="text-xs text-white/40">
                                © {new Date().getFullYear()} systemify.id. All rights reserved. Built with Laravel, React 19, and Tailwind CSS v4.
                            </p>

                            <div className="flex gap-6 text-xs text-white/60">
                                <Link href="/#services" className="hover:text-brand-lime transition-colors">Services</Link>
                                <Link href="/#playground" className="hover:text-brand-lime transition-colors">Playground</Link>
                                <Link href="/#about" className="hover:text-brand-lime transition-colors">About</Link>
                                <Link href="/#contact" className="hover:text-brand-lime transition-colors">Contact</Link>
                            </div>
                        </div>
                    </footer>
                )}

            </div>
        </>
    );
}

export function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const mouseCoords = useRef({ x: -100, y: -100 });
    const ringCoords = useRef({ x: -100, y: -100 });
    const [hovered, setHovered] = useState(false);
    const [hoverType, setHoverType] = useState('lime'); // 'lime' or 'blue'

    useEffect(() => {
        document.documentElement.classList.add('has-custom-cursor');
        return () => {
            document.documentElement.classList.remove('has-custom-cursor');
        };
    }, []);

    useEffect(() => {
        const onMouseMove = (e) => {
            mouseCoords.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
            }
        };

        window.addEventListener('mousemove', onMouseMove);

        let animationFrameId;
        const updateRing = () => {
            const ease = 0.16; // smooth follow lag speed
            ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * ease;
            ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * ease;

            if (ringRef.current) {
                const offset = hovered ? 24 : 16;
                ringRef.current.style.transform = `translate3d(${ringCoords.current.x - offset}px, ${ringCoords.current.y - offset}px, 0)`;
            }

            animationFrameId = requestAnimationFrame(updateRing);
        };

        animationFrameId = requestAnimationFrame(updateRing);

        const handleMouseOver = (e) => {
            const target = e.target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer, .shuffle-card');
            if (target) {
                setHovered(true);
                // Check if target is a blue themed element
                const isBlueElement = target.classList.contains('bg-brand-blue') || 
                                     target.classList.contains('text-brand-blue') || 
                                     target.closest('.brand-icon-box-blue') || 
                                     target.closest('.hover\\:border-brand-blue\\/40') ||
                                     target.closest('.hover\\:border-brand-blue\\/30');
                if (isBlueElement) {
                    setHoverType('blue');
                } else {
                    setHoverType('lime');
                }
            } else {
                setHovered(false);
            }
        };

        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, [hovered]);

    return (
        <>
            {/* Inner Dot */}
            <div 
                ref={dotRef}
                className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] bg-brand-lime mix-blend-screen"
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            />
            {/* Outer Ring Follower */}
            <div 
                ref={ringRef}
                className={`hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border transition-[width,height,border-color,background-color] duration-300 ease-out
                    ${hovered 
                        ? (hoverType === 'blue' 
                            ? 'w-12 h-12 border-brand-blue/50 bg-brand-blue/10 shadow-[0_0_15px_rgba(30,74,233,0.2)]' 
                            : 'w-12 h-12 border-brand-lime/50 bg-brand-lime/10 shadow-[0_0_15px_rgba(181,255,0,0.2)]')
                        : 'w-8 h-8 border-brand-lime/20 bg-transparent'
                    }
                `}
                style={{ transform: 'translate3d(-100px, -100px, 0)' }}
            />
        </>
    );
}
