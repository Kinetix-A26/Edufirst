export const StatCard = ({ title, value, trend }: { title: string, value: string, trend: string }) => (
    <div className="bg-white p-5 rounded-edu-xl border border-slate-100 shadow-soft">
        <p className="text-muted-text text-sm mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-edu-text-main">{value}</h3>
            <span className="text-edu-emerald text-xs font-medium">{trend}</span>
        </div>
    </div>
);
