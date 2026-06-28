import { getTransactions } from "@/lib/actions/adminApiActions";

export const dynamic = 'force-dynamic';

export default async function TransactionsPage() {
    const data = await getTransactions();
    
    const payments = data?.payments || [];
    const totalRevenue = data?.totalRevenue || 0;

    console.log(payments, "payment");
    console.log(totalRevenue, 'total');

    return (
        <div className="space-y-8 p-6 min-h-screen bg-black text-zinc-100">
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-zinc-900 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white font-display tracking-wider uppercase">
                        Transactions <span className="text-flexuraNeon">Registry</span>
                    </h1>
                    <p className="text-zinc-500 text-xs mt-1 font-sans tracking-wide">
                        Real-Time Read-Only Log of Confirmed Dashboard Booking Payments
                    </p>
                </div>
                
               
                <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 px-8 py-4 rounded-xl shadow-2xl min-w-[220px] overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-flexuraNeon/5 rounded-full blur-2xl transition-all group-hover:bg-flexuraNeon/10"></div>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest block mb-1">
                        Total Gross Revenue
                    </span>
                    <span className="text-3xl font-black text-flexuraNeon font-display tracking-tight">
                        ${totalRevenue.toLocaleString()}
                    </span>
                </div>
            </div>

          
            <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                       
                        <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-800 text-[11px] font-bold uppercase tracking-wider font-display">
                            <tr>
                                <th className="p-4 border-b border-zinc-800/80">User Statement</th>
                                <th className="p-4 border-b border-zinc-800/80">Amount Collected</th>
                                <th className="p-4 border-b border-zinc-800/80">Date</th>
                                <th className="p-4 border-b border-zinc-800/80 text-right">Transaction Identifier</th>
                            </tr>
                        </thead>
                        
                      
                        <tbody className="divide-y divide-zinc-900 text-sm font-sans">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center text-zinc-600 py-16 font-medium tracking-wide">
                                        No validated transaction history located in logs.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((p) => (
                                    <tr 
                                        key={p._id} 
                                        className="hover:bg-zinc-900/30 transition-all duration-200 group border-b border-zinc-900"
                                    >
                                        {/* User Email */}
                                        <td className="p-4 font-medium text-zinc-300 group-hover:text-white transition-colors">
                                            {p.userEmail}
                                        </td>
                                        
                                        {/* Price */}
                                        <td className="p-4 font-black font-display text-flexuraNeon text-base">
                                            ${p.price}
                                        </td>
                                        
                                        {/* Booking Date */}
                                        <td className="p-4 text-xs text-zinc-500 font-medium">
                                            {p.bookedAt ? new Date(p.bookedAt).toISOString().split('T')[0] : "N/A"}
                                        </td>
                                        
                                        {/* Transaction (Session ID) */}
                                        <td className="p-4 text-right">
                                            <span 
                                                className="text-[11px] font-mono text-zinc-600 bg-zinc-950/60 border border-zinc-900/50 px-3 py-1.5 rounded-md inline-block max-w-xs truncate group-hover:border-zinc-800 group-hover:text-zinc-400 transition-all"
                                                title={p.transactionId}
                                            >
                                                {p.transactionId}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}