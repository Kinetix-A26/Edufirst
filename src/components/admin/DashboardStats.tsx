import { Users, UserCheck, TrendingUp, AlertCircle } from "lucide-react";

const stats = [
  { label: "Total Élèves", value: "840", trend: "+5.2%", icon: Users, color: "text-blue-600" },
  { label: "Places Disponibles", value: "120", trend: "84% Capacité", icon: UserCheck, color: "text-edu-primary" },
  { label: "Recouvrement", value: "94.2%", trend: "+2.1%", icon: TrendingUp, color: "text-emerald-500" },
  { label: "Alertes Paiement", value: "12", trend: "Urgent", icon: AlertCircle, color: "text-red-500" },
];

export const DashboardStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="bg-white p-6 rounded-edu-xl shadow-soft border border-edu-border hover:bg-edu-soft transition-colors group"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-muted-text text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-edu-text-dark mt-1">{stat.value}</h3>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 group-hover:bg-white transition-colors">
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              stat.trend === "Urgent"
                ? "bg-red-100 text-red-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {stat.trend}
          </span>
          {stat.trend !== "Urgent" && stat.trend !== "84% Capacité" && (
            <span className="text-xs text-muted-text">vs mois dernier</span>
          )}
        </div>
      </div>
    ))}
  </div>
);
