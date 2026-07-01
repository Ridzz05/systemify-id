import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Database, Lightning, Cpu, GitBranch, Circle, Terminal, ArrowRight, Gear, CheckCircle } from '@phosphor-icons/react';

export default function Dashboard() {
    return (
        <AdminLayout activeTab="overview" title="Console Overview">
            <Head title="System Dashboard" />

            <div className="flex flex-col gap-8">
                {/* Metrik Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* SQLite Status */}
                    <div className="brand-card flex flex-col justify-between min-h-[140px] group relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-brand-blue/10 blur-xl group-hover:bg-brand-blue/20 transition-all" />
                        <div className="flex flex-col gap-2 z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                                <Database className="w-3.5 h-3.5 text-brand-blue" weight="bold" /> Database engine
                            </span>
                            <h3 className="text-2xl font-black mt-2 text-white">SQLite 3</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-lime z-10">
                            <Circle className="w-2.5 h-2.5 fill-brand-lime" weight="fill" />
                            <span>144 KB // Operational</span>
                        </div>
                    </div>

                    {/* Vite Compiler */}
                    <div className="brand-card flex flex-col justify-between min-h-[140px] group relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-brand-lime/10 blur-xl group-hover:bg-brand-lime/25 transition-all" />
                        <div className="flex flex-col gap-2 z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                                <Lightning className="w-3.5 h-3.5 text-brand-lime" weight="bold" /> Frontend bundler
                            </span>
                            <h3 className="text-2xl font-black mt-2 text-white">Vite 8.0</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-lime z-10">
                            <Circle className="w-2.5 h-2.5 fill-brand-lime animate-pulse" weight="fill" />
                            <span>HMR Active // Port 5173</span>
                        </div>
                    </div>

                    {/* Laravel Engine */}
                    <div className="brand-card flex flex-col justify-between min-h-[140px] group relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-brand-blue/10 blur-xl group-hover:bg-brand-blue/20 transition-all" />
                        <div className="flex flex-col gap-2 z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                                <Cpu className="w-3.5 h-3.5 text-brand-blue" weight="bold" /> Core Framework
                            </span>
                            <h3 className="text-2xl font-black mt-2 text-white">Laravel 13</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-brand-lime z-10">
                            <Circle className="w-2.5 h-2.5 fill-brand-lime" weight="fill" />
                            <span>PHP 8.3 // Host Active</span>
                        </div>
                    </div>

                    {/* Open Design Daemon */}
                    <div className="brand-card-accent flex flex-col justify-between min-h-[140px] group relative overflow-hidden">
                        <div className="absolute -right-8 -top-8 w-20 h-20 rounded-full bg-brand-lime/20 blur-xl group-hover:bg-brand-lime/30 transition-all" />
                        <div className="flex flex-col gap-2 z-10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/60 flex items-center gap-1.5">
                                <Gear className="w-3.5 h-3.5 text-brand-dark/80" weight="bold" /> Design Daemon
                            </span>
                            <h3 className="text-2xl font-black mt-2 text-brand-dark">Connected</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-brand-dark z-10">
                            <Circle className="w-2.5 h-2.5 fill-brand-dark animate-pulse" weight="fill" />
                            <span>Daemon Live // Port 7456</span>
                        </div>
                    </div>
                </div>

                {/* Main Console & Activity Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Active Pipelines Table */}
                    <div className="lg:col-span-8 brand-panel flex flex-col gap-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-brand-lime" weight="bold" /> Live System Pipelines
                            </h4>
                            <span className="text-[10px] text-brand-lime font-black bg-brand-lime/10 px-2 py-0.5 rounded border border-brand-lime/20 select-none">
                                SECURE SHELL ACTIVE
                            </span>
                        </div>
                        
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-white/40 font-bold uppercase tracking-wider text-[10px]">
                                        <th className="pb-3 pr-4">Module Name</th>
                                        <th className="pb-3 px-4">Port</th>
                                        <th className="pb-3 px-4">Engine Spec</th>
                                        <th className="pb-3 pl-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 pr-4 font-black">laravel-backend-api</td>
                                        <td className="py-4 px-4 font-mono text-xs text-white/60">8000</td>
                                        <td className="py-4 px-4 text-white/70">Laravel 13 // Monolith</td>
                                        <td className="py-4 pl-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-brand-lime font-bold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" /> Running
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 pr-4 font-black">vite-development-server</td>
                                        <td className="py-4 px-4 font-mono text-xs text-white/60">5173</td>
                                        <td className="py-4 px-4 text-white/70">Vite 8 // React 19 // Tailwind v4</td>
                                        <td className="py-4 pl-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-brand-lime font-bold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" /> Running
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 pr-4 font-black">open-design-daemon</td>
                                        <td className="py-4 px-4 font-mono text-xs text-white/60">7456</td>
                                        <td className="py-4 px-4 text-white/70">Daemon Dist CLI // Headless</td>
                                        <td className="py-4 pl-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-brand-lime font-bold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" /> Running
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 pr-4 font-black">sqlite-database-driver</td>
                                        <td className="py-4 px-4 font-mono text-xs text-white/60">File</td>
                                        <td className="py-4 px-4 text-white/70">SQLite 3.45 // Local File Storage</td>
                                        <td className="py-4 pl-4 text-right">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-brand-lime font-bold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" /> Mounted
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Git Activity Timeline */}
                    <div className="lg:col-span-4 brand-panel flex flex-col gap-6">
                        <h4 className="text-lg font-extrabold tracking-tight flex items-center gap-2">
                            <GitBranch className="w-5 h-5 text-brand-blue" weight="bold" /> Build Timeline
                        </h4>
                        
                        <div className="flex flex-col gap-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                            {/* Milestone 1 */}
                            <div className="flex gap-4 relative pl-8">
                                <div className="absolute left-[3px] top-1 w-2 h-2 rounded-full bg-brand-lime ring-4 ring-brand-lime/20" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black text-white">Scroll Snap Implementation</span>
                                    <span className="text-[10px] text-white/40 font-mono">30 Jun 2026 // c3e01b6</span>
                                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                                        Applied native CSS scroll-snapping with fixed-floating navigation bar.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 2 */}
                            <div className="flex gap-4 relative pl-8">
                                <div className="absolute left-[3px] top-1 w-2 h-2 rounded-full bg-brand-lime ring-4 ring-brand-lime/20" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black text-white">Framer Motion Integration</span>
                                    <span className="text-[10px] text-white/40 font-mono">30 Jun 2026 // ad3190f</span>
                                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                                        Staggered entrance layouts and reactive sticker transitions in customizer.
                                    </p>
                                </div>
                            </div>

                            {/* Milestone 3 */}
                            <div className="flex gap-4 relative pl-8">
                                <div className="absolute left-[3px] top-1 w-2 h-2 rounded-full bg-brand-lime ring-4 ring-brand-lime/20" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-black text-white">Custom Cursor Follower</span>
                                    <span className="text-[10px] text-white/40 font-mono">30 Jun 2026 // 2c7a7fb</span>
                                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                                        Constructed GPU-accelerated LERP custom cursor on desktop webview.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
