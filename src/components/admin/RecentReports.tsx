const reports = [
  { teacher: "Jane Doe", title: "Rapport Mensuel CM1", date: "24 Oct 2023", status: "Reçu" },
  { teacher: "Mark Smith", title: "Évaluation Sciences", date: "23 Oct 2023", status: "Reçu" },
];

export const RecentReports = () => (
  <div className="bg-white rounded-edu-xl border border-edu-border p-6 shadow-soft">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-bold text-edu-text-dark">Derniers Rapports Professeurs</h2>
      <button type="button" className="text-edu-primary text-sm font-medium hover:underline">
        Voir tout
      </button>
    </div>
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.title}
          className="flex items-center justify-between p-4 rounded-lg border border-slate-50 hover:border-edu-primary-light transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
              {report.teacher.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-edu-text-dark">{report.title}</p>
              <p className="text-xs text-muted-text">
                {report.teacher} • {report.date}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm text-edu-primary">
            PDF
          </button>
        </div>
      ))}
    </div>
  </div>
);
