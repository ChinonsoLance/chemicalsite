// About.jsx
import { Link } from "react-router-dom";

const values = [
  {
    icon: "⚗️",
    title: "Uncompromising Purity",
    description: "Every product is rigorously tested to meet or exceed ACS, HPLC, and pharmacopoeia standards.",
  },
  {
    icon: "🧬",
    title: "Scientific Integrity",
    description: "We source only from audited suppliers and maintain full traceability from raw material to final shipment.",
  },
  {
    icon: "♻️",
    title: "Sustainable Lab",
    description: "Minimal‑waste packaging, solvent recycling programmes, and carbon‑neutral courier options.",
  },
  {
    icon: "🤝",
    title: "Community First",
    description: "We reinvest 2% of revenue into open‑access research grants and STEM education initiatives.",
  },
];

const milestones = [
  { year: "2018", event: "Founded by a team of PhD chemists in Cambridge, UK." },
  { year: "2020", event: "Launched first 5,000‑product catalogue covering all major reagent families." },
  { year: "2022", event: "Opened North American distribution centre in Boston, MA." },
  { year: "2024", event: "Achieved ISO 17025 accreditation for in‑house testing." },
  { year: "2026", event: "Reached 50,000 researchers served across 90 countries." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900/80" />
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10 bg-green-400" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-green-400 mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4 drop-shadow-lg">About CJ‑DELUZ</h1>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto leading-relaxed">
            We believe that every great discovery starts with the purest materials. For nearly a decade,
            we've equipped labs around the globe with the reagents and equipment they need – and the trust they deserve.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-base">
            To be the most reliable partner in the global scientific community by delivering
            <strong className="text-gray-900"> high‑purity chemicals</strong>,
            <strong className="text-gray-900"> innovative lab solutions</strong>, and
            <strong className="text-gray-900"> uncompromising customer support</strong>. We exist
            to remove every barrier between a researcher's idea and their breakthrough.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-green-500 mb-2">Why Choose Us</p>
          <h2 className="text-3xl font-semibold text-gray-900">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300"
            >
              <div className="text-3xl mb-3 transform group-hover:scale-105 transition-transform duration-300">
                {v.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50/80 backdrop-blur-lg py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-green-500 mb-2">The CJ‑DELUZ Timeline</p>
            <h2 className="text-3xl font-semibold text-gray-900">Our Journey</h2>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-16 text-right">
                  <span className="text-base font-semibold text-gray-900">{m.year}</span>
                </div>
                <div className="flex-1 pb-6 border-l-2 border-green-400 pl-5 relative">
                  <div className="absolute w-3 h-3 bg-green-400 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                  <p className="text-gray-700 text-sm leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
          <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-green-500 mb-2">Quality Standards</p>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Built on Trust & Precision</h2>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto mb-6">
            We hold certifications that demonstrate our commitment to the highest analytical and manufacturing standards.
            Every lot is validated in‑house using ICP‑MS, GC‑MS, and Karl‑Fischer titration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["ISO 17025", "ISO 9001", "GMP Compliant", "REACH Registered"].map((cert) => (
              <span
                key={cert}
                className="px-5 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-700 border border-gray-200 shadow-sm"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-14 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Ready to experience the CJ‑DELUZ difference?</h2>
          <p className="text-gray-400 text-sm mb-6">Browse our catalogue of over 10,000 high‑purity reagents and lab essentials.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-medium rounded-full hover:bg-green-500 transition-all shadow-lg shadow-green-600/20"
          >
            Explore Products →
          </Link>
        </div>
      </section>
    </div>
  );
}