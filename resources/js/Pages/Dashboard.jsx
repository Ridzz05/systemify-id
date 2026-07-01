import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { EnvelopeSimple, Database, Shield, Terminal, ArrowRight, IdentificationCard, Code } from '@phosphor-icons/react';

export default function Dashboard() {
    const clientBriefs = [
        {
            id: 1,
            client: 'Alex Mercer',
            company: 'Aether Nexus',
            email: 'alex@aether.io',
            budget: 'IDR 150M',
            message: 'Need a custom ERP system with instant client routing and a highly interactive, physical card customizer for tracking physical assets.',
            status: 'Pending Review',
            date: 'June 30, 2026',
            stack: ['Laravel', 'React 19', 'Tailwind v4']
        },
        {
            id: 2,
            client: 'Sarah Connor',
            company: 'Cyberdyne Systems',
            email: 's.connor@cyberdyne.co',
            budget: 'IDR 450M',
            message: 'Looking to optimize our military-grade logistics pipeline. System latency must be under 50ms, and it should run on SQLite replication.',
            status: 'In Discussion',
            date: 'June 29, 2026',
            stack: ['Laravel', 'SQLite', 'Go Engine']
        },
        {
            id: 3,
            client: 'Bruce Wayne',
            company: 'Wayne Enterprises',
            email: 'bruce@wayne.corp',
            budget: 'IDR 1.2B',
            message: 'Secure portal for tracking vehicle maintenance and tactical inventory. Needs strict role-based access control and high-end editorial aesthetics.',
            status: 'Approved',
            date: 'June 28, 2026',
            stack: ['React 19', 'Next.js', 'PostgreSQL']
        }
    ];

    const auditTrail = [
        { id: 1, event: 'Database migration fresh & seed', ip: 'Console CLI', time: '17:51' },
        { id: 2, event: 'Admin systemify.id session started', ip: '127.0.0.1', time: '17:45' },
        { id: 3, event: 'Routing cache synchronized', ip: 'Internal Engine', time: '17:30' }
    ];

    return (
        <AdminLayout activeTab="overview" title="System Control & Operations">
            <Head title="System Dashboard" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Column Left: Inbound Client Briefs (8/12) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-lime flex items-center gap-1.5">
                            <EnvelopeSimple className="w-4 h-4" weight="bold" /> Inbound Client Briefs ({clientBriefs.length})
                        </span>
                        <span className="text-xs text-white/40">Latest update: Today</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        {clientBriefs.map((brief) => (
                            <div 
                                key={brief.id} 
                                className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-brand-blue/30 rounded-[24px] p-6 transition-all duration-300 relative overflow-hidden group"
                            >
                                {/* Subtle blue glow on card hover */}
                                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand-blue/5 blur-xl group-hover:bg-brand-blue/15 transition-all" />

                                <div className="flex flex-col gap-4 relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex flex-col">
                                            <h4 className="text-lg font-bold text-white group-hover:text-brand-lime transition-colors">
                                                {brief.company}
                                            </h4>
                                            <span className="text-xs text-white/50">
                                                Contact: {brief.client} // {brief.email}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="bg-white/5 text-white/70 border border-white/10 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                                                {brief.budget}
                                            </span>
                                            <span className={`font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider ${
                                                brief.status === 'Approved' 
                                                    ? 'bg-brand-lime/10 text-brand-lime border border-brand-lime/20' 
                                                    : 'bg-brand-blue/10 text-white border border-brand-blue/20'
                                            }`}>
                                                {brief.status}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-white/70 leading-relaxed">
                                        {brief.message}
                                    </p>

                                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 mt-2">
                                        <div className="flex items-center gap-2">
                                            <Code className="w-3.5 h-3.5 text-white/40" />
                                            <div className="flex gap-1.5">
                                                {brief.stack.map((tech, idx) => (
                                                    <span key={idx} className="text-[10px] font-mono text-brand-lime/80 bg-brand-lime/5 px-2 py-0.5 rounded border border-brand-lime/10">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-white/30 font-mono">{brief.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Column Right: System Specs & Audit Logs (4/12) */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    
                    {/* Database Specs Block */}
                    <div className="brand-panel flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue flex items-center gap-1.5">
                            <Database className="w-4 h-4" /> System Storage
                        </span>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">Database Engine</span>
                                <span className="font-bold">SQLite 3.45</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">Database File</span>
                                <span className="font-mono text-brand-lime">database.sqlite</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">File Size</span>
                                <span className="font-bold">144 KB // Compact</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5">
                                <span className="text-white/40">Registered Admins</span>
                                <span className="font-bold">1 Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Environment Specs Block */}
                    <div className="brand-panel flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue flex items-center gap-1.5">
                            <IdentificationCard className="w-4 h-4" /> Engine Specs
                        </span>
                        
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">Laravel Framework</span>
                                <span className="font-bold">v13.0.0</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">PHP Runtime</span>
                                <span className="font-bold">PHP 8.3</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5">
                                <span className="text-white/40">Environment Mode</span>
                                <span className="font-bold text-brand-lime">Local</span>
                            </div>
                        </div>
                    </div>

                    {/* Security Audit Log */}
                    <div className="brand-panel flex flex-col gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue flex items-center gap-1.5">
                            <Terminal className="w-4 h-4" /> Security Audit Trail
                        </span>
                        
                        <div className="flex flex-col gap-4">
                            {auditTrail.map((log) => (
                                <div key={log.id} className="flex flex-col gap-1 text-[11px] border-l-2 border-brand-lime/30 pl-3">
                                    <span className="font-bold text-white">{log.event}</span>
                                    <div className="flex justify-between text-white/40 text-[9px] font-mono">
                                        <span>Source: {log.ip}</span>
                                        <span>{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
