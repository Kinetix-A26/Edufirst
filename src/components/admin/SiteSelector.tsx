"use client";
const sites = ["St. Mary's Academy", "Sévigné Primary", "Lycée Horizon"]; // Exemples

export const SiteSelector = () => {
  return (
    <div className="dropdown dropdown-bottom">
      <div tabIndex={0} role="button" className="btn btn-ghost bg-white border-edu-border shadow-sm normal-case flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-edu-primary animate-pulse"></span>
        <span className="text-edu-text-main font-medium">{sites[0]}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-edu-xl w-64 mt-2">
        {sites.map((site) => (
          <li key={site}>
            <a className="hover:bg-edu-primary-light transition-colors">{site}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
