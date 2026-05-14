// src/About.jsx
import { Link } from "react-router-dom";

const values = [
  {
    icon: "⚗️",
    title: "Uncompromising Purity",
    description:
      "Every product is rigorously tested to meet or exceed ACS, HPLC, and pharmacopoeia standards.",
  },
  {
    icon: "🧬",
    title: "Scientific Integrity",
    description:
      "We source only from audited suppliers and maintain full traceability from raw material to final shipment.",
  },
  {
    icon: "♻️",
    title: "Sustainable Lab",
    description:
      "Minimal‑waste packaging, solvent recycling programmes, and carbon‑neutral courier options.",
  },
  {
    icon: "🤝",
    title: "Community First",
    description:
      "We reinvest 2% of revenue into open‑access research grants and STEM education initiatives.",
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
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 opacity-95" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10 bg-amber-400" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400 mb-4">
            Our Story
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}
          >
            About CHEMERA
          </h1>
          <p className="text-stone-300 text-[15px] max-w-2xl mx-auto leading-relaxed">
            We believe that every great discovery starts with the purest materials. For nearly a decade,
            we’ve equipped labs around the globe with the reagents and equipment they need – and the
            trust they deserve.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border border-stone-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
              Our Mission
            </h2>
          </div>
          <p className="text-stone-700 leading-relaxed text-lg">
            To be the most reliable partner in the global scientific community by delivering
            <strong className="text-stone-900"> high‑purity chemicals</strong>,
            <strong className="text-stone-900"> innovative lab solutions</strong>, and
            <strong className="text-stone-900"> uncompromising customer support</strong>. We exist
            to remove every barrier between a researcher’s idea and their breakthrough.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
            Why Choose Us
          </p>
          <h2 className="text-4xl font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
            Our Values
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-stone-100
                         hover:border-stone-200 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-800 mb-2">{v.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Journey / Milestones */}
      <section className="bg-stone-100/80 backdrop-blur-lg py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
              The CHEMERA Timeline
            </p>
            <h2 className="text-4xl font-bold text-stone-900" style={{ fontFamily: "'Georgia', serif" }}>
              Our Journey
            </h2>
          </div>
          <div className="space-y-8 max-w-3xl mx-auto">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-stone-900">{m.year}</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-amber-400 pl-6 relative">
                  <div className="absolute w-4 h-4 bg-amber-400 rounded-full -left-[9px] top-1.5 ring-4 ring-white" />
                  <p className="text-stone-700 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-stone-100 p-8 md:p-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
            Quality Standards
          </p>
          <h2 className="text-3xl font-bold text-stone-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Built on Trust & Precision
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto mb-8">
            We hold certifications that demonstrate our commitment to the highest analytical and
            manufacturing standards. Every lot is validated in‑house using ICP‑MS, GC‑MS, and
            Karl‑Fischer titration.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["ISO 17025", "ISO 9001", "GMP Compliant", "REACH Registered"].map((cert) => (
              <span
                key={cert}
                className="px-6 py-3 bg-stone-100 rounded-full text-sm font-semibold text-stone-700
                           border border-stone-200 shadow-sm"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-stone-900 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Ready to experience the CHEMERA difference?
          </h2>
          <p className="text-stone-300 mb-8">
            Browse our catalogue of over 10,000 high‑purity reagents and lab essentials.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 text-amber-900 font-semibold
                       rounded-full hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
          >
            Explore Products →
          </Link>
        </div>
      </section>
    </div>
  );
}