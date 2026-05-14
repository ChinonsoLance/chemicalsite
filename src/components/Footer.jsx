// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div>
          <p className="text-white text-lg font-bold mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            CHEMERA
          </p>
          <p className="text-xs leading-relaxed">
            High-purity chemicals and lab supplies for research and industry. Quality you can trust.
          </p>
        </div>
        {[
          { title: "Chemera", links: ["New Reagents", "Solvents", "Glassware", "Equipment", "Safety", "Sale"] },
          { title: "Help", links: ["Contact Us", "Safety Data", "FAQs", "Track Order"] },
            
        ].map((col) => (
          <div key={col.title}>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <button className="text-xs hover:text-white transition-colors">{l}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-xs">© 2026 CHEMERA. All rights reserved.</p>
        <div className="flex gap-4">
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <button key={l} className="text-xs hover:text-white transition-colors">
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}