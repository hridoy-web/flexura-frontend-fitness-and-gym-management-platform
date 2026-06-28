import { getOverviewStats } from "@/lib/actions/adminApiActions";

export default async function AdminDashboardPage() {
    const stats = await getOverviewStats() || { totalUsers: 0, totalClasses: 0, totalBookedClasses: 0 };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-flexuraNeon font-display">ADMIN WORKSPACE</h1>
                <p className="text-zinc-400 text-sm mt-1">Tactical Overview and Control Panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-flexuraNeon/10 rounded-full blur-2xl group-hover:bg-flexuraNeon/20 transition-all"></div>
                    <p className="text-zinc-400 font-medium text-sm">TOTAL USERS</p>
                    <h3 className="text-4xl font-extrabold text-white mt-2 font-display">{stats.totalUsers}</h3>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-flexuraPurple/10 rounded-full blur-2xl group-hover:bg-flexuraPurple/20 transition-all"></div>
                    <p className="text-zinc-400 font-medium text-sm">TOTAL CLASSES</p>
                    <h3 className="text-4xl font-extrabold text-white mt-2 font-display">{stats.totalClasses}</h3>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-flexuraNeon/10 rounded-full blur-2xl group-hover:bg-flexuraNeon/20 transition-all"></div>
                    <p className="text-zinc-400 font-medium text-sm">CLASSES ENROLLED</p>
                    <h3 className="text-4xl font-extrabold text-white mt-2 font-display">{stats.totalBookedClasses}</h3>
                </div>
            </div>
        </div>
    );
}