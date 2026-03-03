"use client";

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const revenue = [82, 88, 75, 92, 78, 95, 102, 88, 96, 110, 98, 105];
const expenses = [52, 58, 48, 62, 55, 60, 65, 58, 62, 68, 64, 70];
const maxVal = Math.max(...revenue, ...expenses);

export function RevenueOverviewChart() {
  return (
    <div className="bg-white rounded-edu-xl border border-edu-border p-6 shadow-soft h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-edu-text-dark">Aperçu des Revenus</h2>
        <div className="flex items-center gap-4 text-xs text-muted-text">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-edu-primary" />
            Entrées
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-slate-300" />
            Sorties
          </span>
        </div>
      </div>
      <div className="flex-1 flex items-end gap-1 min-h-0">
        {months.map((month, i) => (
          <div key={month} className="flex-1 flex flex-col items-center gap-1 h-full min-w-0">
            <div className="flex-1 w-full flex flex-col justify-end gap-0.5 min-h-[200px]">
              <div
                className="w-full rounded-t min-h-[4px] bg-edu-primary transition-opacity hover:opacity-90"
                style={{ height: `${(revenue[i] / maxVal) * 100}%` }}
                title={`Entrées: ${revenue[i]}k€`}
              />
              <div
                className="w-full rounded-t min-h-[4px] bg-slate-200 transition-opacity hover:opacity-80"
                style={{ height: `${(expenses[i] / maxVal) * 100}%` }}
                title={`Sorties: ${expenses[i]}k€`}
              />
            </div>
            <span className="text-[10px] text-muted-text truncate w-full text-center">
              {month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
