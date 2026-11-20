// Contact.jsx – working email (mailto) plus phone / WhatsApp routes.
// Opens on the emerald band, then the channels and form sit on paper.
import { useState } from "react";
import { Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { Reveal, DrawRule, SplitHeading } from "./components/Motion";
import Atmosphere from "./components/Atmosphere";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Your contact details
  const phoneNumber = "+234 808 410 8929";
  const whatsappNumber = "+234 808 410 8929";
  const whatsappLink = "https://wa.me/2348084108929"; // digits only for WhatsApp

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const subject = `Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    // Opens the visitor's default email client (Gmail, Outlook, etc.)
    window.location.href = `mailto:support@yourlab.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const fieldClass =
    "w-full rounded-2xl border border-jade-300/20 bg-white/[0.06] px-5 py-3.5 text-sm text-mist placeholder-mist/35 outline-none transition-colors duration-500 focus:border-jade-400/70 focus:bg-white/[0.1]";

  return (
    <div className="min-h-screen">
      {/* ---------- Opening — dark band ---------- */}
      <section className="relative z-10 overflow-hidden bg-forest-950 pb-24 pt-[calc(var(--nav-h)+6rem)] md:pb-32 md:pt-[calc(var(--nav-h)+9rem)]">
        <Atmosphere variant="hero" intensity={1} seamBottom />

        <div className="relative z-10 mx-auto max-w-[var(--shell)] px-5 sm:px-8">
          <Reveal variant="fade">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-jade-400/60" />
              <span className="eyebrow">Get in touch</span>
            </div>
          </Reveal>

          <SplitHeading
            as="h1"
            text={"Let's talk\nspecification."}
            className="display mt-8 text-[clamp(2.6rem,8vw,6.2rem)] text-white"
            stagger={55}
          />

          <Reveal variant="up" delay={200}>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-mist/70">
              Tell us the material, the grade and the volume. A specialist will
              come back with availability, documentation and a landed price —
              usually the same working day.
            </p>
          </Reveal>

          <DrawRule className="mt-14" delay={260} />
        </div>
      </section>

      {/* ---------- Channels + form ---------- */}
      <section className="relative z-10 mx-auto max-w-[var(--shell)] px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-start gap-6 lg:grid-cols-12">
          {/* Channels — light cards */}
          <div className="space-y-5 lg:col-span-5">
            <Reveal variant="left">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="lift card block rounded-[26px] p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-jade-500/12 text-jade-700">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-jade-700">
                      Call us
                    </p>
                    <p className="display numeric mt-3 text-2xl text-bark md:text-3xl">
                      {phoneNumber}
                    </p>
                    <p className="mt-3 text-sm text-moss">
                      Speak directly with a product specialist.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>

            <Reveal variant="left" delay={120}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="lift card block rounded-[26px] p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-jade-500/12 text-jade-700">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-jade-700">
                      WhatsApp
                    </p>
                    <p className="display numeric mt-3 text-2xl text-bark md:text-3xl">
                      {whatsappNumber}
                    </p>
                    <p className="mt-3 text-sm text-moss">
                      Quick replies, typically within the hour.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>

            <Reveal variant="left" delay={220}>
              <div className="card rounded-[26px] p-7">
                <div className="flex items-center gap-4">
                  <Clock className="h-4 w-4 flex-shrink-0 text-jade-700" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-bark">
                      Monday – Friday, 9am – 6pm WAT
                    </p>
                    <p className="mt-1 text-xs text-sage">
                      Messages sent outside these hours are answered next morning.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form — the emerald plate, so the page keeps the hero's weight */}
          <Reveal variant="right" delay={140} className="lg:col-span-7">
            <div className="panel-emerald relative overflow-hidden rounded-[30px] p-8 md:p-11">
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-jade-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-jade-700/25 blur-3xl" />

              <p className="eyebrow relative">Send a message</p>
              <h2 className="display relative mt-5 text-3xl text-white md:text-[38px]">
                Start an enquiry
              </h2>
              <p className="relative mt-4 text-sm leading-relaxed text-mist/65">
                Submitting opens your email app with the details filled in — just
                press send.
              </p>

              <form onSubmit={handleSubmit} className="relative mt-9 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/55"
                    >
                      Full name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      className={fieldClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/55"
                    >
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className={fieldClass}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-mist/55"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${fieldClass} resize-none`}
                    placeholder="Material, grade, quantity and delivery location."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary group inline-flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-[12px] uppercase tracking-[0.18em]"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>

                {submitted && (
                  <p className="flex items-center justify-center gap-2 rounded-2xl border border-jade-400/30 bg-jade-500/12 px-4 py-3 text-sm text-jade-300">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email client opened — please review and press send.
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
