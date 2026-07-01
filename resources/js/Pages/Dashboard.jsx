import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { EnvelopeSimple, Database, Terminal, IdentificationCard, Code, Trash } from '@phosphor-icons/react';

export default function Dashboard({ briefs = [], dbSize = 'N/A', adminCount = 0 }) {
    const handleUpdateStatus = (id, newStatus) => {
        router.patch(route('briefs.update-status', id), { status: newStatus }, {
            preserveScroll: true
        });
    };

    const handleDeleteBrief = (id) => {
        if (confirm('Are you sure you want to delete this client brief?')) {
            router.delete(route('briefs.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const auditTrail = [
        { id: 1, event: 'Database migration fresh & seed', ip: 'Console CLI', time: '17:51' },
        { id: 2, event: 'Admin systemify.id session started', ip: '127.0.0.1', time: '17:45' },
        { id: 3, event: 'Routing cache synchronized', ip: 'Internal Engine', time: '17:30' }
    ];

    const formatDate = (dateString) => {
        if (!dateString) return 'Just now';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return 'Recent';
        }
    };

    return (
        <AdminLayout activeTab="overview" title="System Control & Operations">
            <Head title="System Dashboard" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Column Left: Inbound Client Briefs (8/12) */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-lime flex items-center gap-1.5">
                            <EnvelopeSimple className="w-4 h-4" weight="bold" /> Inbound Client Briefs ({briefs.length})
                        </span>
                        <span className="text-xs text-white/40">Real-time DB Connection</span>
                    </div>

                    <div className="flex flex-col gap-6">
                        {briefs.length === 0 ? (
                            <div className="border border-dashed border-white/10 rounded-[24px] p-12 text-center flex flex-col items-center gap-4 bg-white/[0.01]">
                                <EnvelopeSimple className="w-12 h-12 text-white/20" />
                                <h4 className="text-base font-bold text-white/80">No Inbound Briefs Yet</h4>
                                <p className="text-xs text-white/40 max-w-sm leading-relaxed">
                                    When clients submit their project briefs through the homepage contact form, they will appear here in real-time.
                                </p>
                            </div>
                        ) : (
                            briefs.map((brief) => {
                                const stack = Array.isArray(brief.tech_stack) 
                                    ? brief.tech_stack 
                                    : [];

                                return (
                                    <div 
                                        key={brief.id} 
                                        className="bg-white/5 hover:bg-white/[0.07] border border-white/10 hover:border-brand-blue/30 rounded-[24px] p-6 transition-all duration-300 relative overflow-hidden group"
                                    >
                                        {/* Subtle blue glow on card hover */}
                                        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-brand-blue/5 blur-xl group-hover:bg-brand-blue/15 transition-all" />

                                        <div className="flex flex-col gap-4 relative z-10">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex flex-col min-w-0">
                                                    <h4 className="text-lg font-bold text-white group-hover:text-brand-lime transition-colors truncate">
                                                        {brief.company || 'Personal Project'}
                                                    </h4>
                                                    <span className="text-xs text-white/50 truncate">
                                                        Contact: {brief.name} // {brief.email}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="bg-white/5 text-white/70 border border-white/10 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">
                                                        {brief.budget || 'N/A'}
                                                    </span>
                                                    <span className={`font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border ${
                                                        brief.status === 'approved' 
                                                            ? 'bg-brand-lime/10 text-brand-lime border-brand-lime/20' 
                                                            : brief.status === 'discussion'
                                                                ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
                                                                : 'bg-white/5 text-white/50 border-white/10'
                                                    }`}>
                                                        {brief.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                                                {brief.message}
                                            </p>

                                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Code className="w-3.5 h-3.5 text-white/40" />
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {stack.map((tech, idx) => (
                                                            <span key={idx} className="text-[10px] font-mono text-brand-lime/80 bg-brand-lime/5 px-2 py-0.5 rounded border border-brand-lime/10">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] text-white/30 font-mono">{formatDate(brief.created_at)}</span>
                                                    <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                                                        {brief.status !== 'approved' && (
                                                            <button
                                                                onClick={() => handleUpdateStatus(brief.id, 'approved')}
                                                                className="px-2 py-0.5 rounded bg-brand-lime/10 hover:bg-brand-lime text-brand-lime hover:text-brand-dark border border-brand-lime/20 text-[9px] font-black uppercase tracking-wider transition-all"
                                                                title="Approve Brief"
                                                            >
                                                                Approve
                                                            </button>
                                                        )}
                                                        {brief.status === 'pending' && (
                                                            <button
                                                                onClick={() => handleUpdateStatus(brief.id, 'discussion')}
                                                                className="px-2 py-0.5 rounded bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/20 text-[9px] font-black uppercase tracking-wider transition-all"
                                                                title="Mark as In Discussion"
                                                            >
                                                                Discuss
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteBrief(brief.id)}
                                                            className="p-1 rounded hover:bg-red-500/10 text-white/30 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
                                                            title="Delete Brief"
                                                        >
                                                            <Trash className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
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
                                <span className="font-bold">SQLite 3.x</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">Database File</span>
                                <span className="font-mono text-brand-lime">database.sqlite</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5 border-b border-white/5">
                                <span className="text-white/40">File Size</span>
                                <span className="font-bold">{dbSize}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs py-1.5">
                                <span className="text-white/40">Registered Admins</span>
                                <span className="font-bold">{adminCount} Active</span>
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
                                <span className="font-bold">v13.x</span>
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
