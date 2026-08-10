// Contact.jsx – working email (mailto) plus phone / WhatsApp routes.
import { useState } from "react";
import { Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { Reveal, DrawRule, SplitHeading, Parallax } from "./components/Motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Your contact details
  const phoneNumber = "+234 704 753 5828";
  const whatsappNumber = "+234 704 753 5828";
  const whatsappLink = "https://wa.me/2347047535828"; // digits only for WhatsApp

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
    "w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-sm text-white placeholder-mist/30 outline-none transition-colors duration-500 focus:border-jade-400/60 focus:bg-white/[0.06]";

  return (
    <div className="min-h-screen">
      {/* ---------- Opening ---------- */}
      <section className="relative overflow-hidden pb-14 pt-[calc(var(--nav-h)+6rem)] md:pb-20 md:pt-[calc(var(--nav-h)+9rem)]">
        <Parallax speed={0.12} className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/3 h-[460px] w-[620px] rounded-full bg-jade-600/12 blur-[140px]" />
        </Parallax>

        <div className="relative mx-auto max-w-[var(--shell)] px-5 sm:px-8">
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
            stagger={80}
          />

          <Reveal variant="up" delay={200}>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.85] text-mist/60">
              Tell us the material, the grade and the volume. A specialist will
              come back with availability, documentation and a landed price —
              usually the same working day.
            </p>
          </Reveal>

          <DrawRule className="mt-14" delay={260} />
        </div>
      </section>

      {/* ---------- Channels + form ---------- */}
      <section className="mx-auto max-w-[var(--shell)] px-5 pb-28 sm:px-8 md:pb-36">
        <div className="grid items-start gap-6 lg:grid-cols-12">
          {/* Channels */}
          <div className="space-y-5 lg:col-span-5">
            <Reveal variant="left">
              <a
                href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                className="lux-card glass block rounded-[26px] p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                    <Phone className="h-5 w-5 text-jade-400" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-jade-300/70">
                      Call us
                    </p>
                    <p className="display mt-3 text-2xl text-white md:text-3xl">
                      {phoneNumber}
                    </p>
                    <p className="mt-3 text-sm text-mist/55">
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
                className="lux-card glass block rounded-[26px] p-8"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.05]">
                    <MessageCircle className="h-5 w-5 text-jade-400" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-jade-300/70">
                      WhatsApp
                    </p>
                    <p className="display mt-3 text-2xl text-white md:text-3xl">
                      {whatsappNumber}
                    </p>
                    <p className="mt-3 text-sm text-mist/55">
                      Quick replies, typically within the hour.
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>

            <Reveal variant="left" delay={220}>
              <div className="glass rounded-[26px] p-7">
                <div className="flex items-center gap-4">
                  <Clock className="h-4 w-4 flex-shrink-0 text-jade-300/80" />
                  <div className="flex-1">
                    <p className="text-sm text-white/90">Monday – Friday, 9am – 6pm WAT</p>
                    <p className="mt-1 text-xs text-mist/45">
                      Messages sent outside these hours are answered next morning.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal variant="right" delay={140} className="lg:col-span-7">
            <div className="glass-strong relative overflow-hidden rounded-[30px] p-8 md:p-11">
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-jade-500/10 blur-3xl" />

              <p className="eyebrow relative">Send a message</p>
              <h2 className="display relative mt-5 text-3xl text-white md:text-[38px]">
                Start an enquiry
              </h2>
              <p className="relative mt-4 text-sm leading-relaxed text-mist/55">
                Submitting opens your email app with the details filled in — just
                press send.
              </p>

              <form onSubmit={handleSubmit} className="relative mt-9 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-mist/45"
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
                      className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-mist/45"
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
                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-mist/45"
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
                  <p className="flex items-center justify-center gap-2 rounded-2xl border border-jade-400/25 bg-jade-500/10 px-4 py-3 text-sm text-jade-300">
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
