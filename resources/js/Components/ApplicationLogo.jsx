export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <div className={`flex items-center gap-2 ${className}`} {...props}>
            <span className="w-10 h-10 rounded-xl bg-brand-lime flex items-center justify-center text-brand-dark font-black text-2xl shadow-md border border-brand-lime/20">
                S
            </span>
            <span className="font-extrabold text-2xl tracking-tight text-brand-dark dark:text-white">
                systemify<span className="text-brand-lime">.id</span>
            </span>
        </div>
    );
}
