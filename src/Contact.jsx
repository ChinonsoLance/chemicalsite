import { useState } from "react";
import { Phone, MessageCircle, Clock, MapPin, ArrowRight } from "lucide-react";

import { CONTACT, COMPANY, ENQUIRY_EMAIL } from "./site";
import { Reveal } from "./components/Motion";
import { Masthead } from "./components/Layout";

const CHANNELS = [
  {
    index: "01",
    icon: Phone,
    label: "Call",
    value: CONTACT.phoneDisplay,
    note: "Speak directly with a product specialist.",
    href: CONTACT.phoneHref,
  },
  {
    index: "02",
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsappDisplay,
    note: "Send a specification or a photo of a label.",
    href: CONTACT.whatsappHref,
    external: true,
  },
  {
    index: "03",
    icon: Clock,
    label: "Hours",
    value: CONTACT.hours,
    note: CONTACT.hoursNote,
  },
  {
    index: "04",
    icon: MapPin,
    label: "Stock held",
    value: `${COMPANY.city}, ${COMPANY.country}`,
    note: "Dispatch nationwide, trial quantities to container loads.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Enquiry from ${form.name}${
      form.company ? ` — ${form.company}` : ""
    }`;
    const body = [
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <>
      <Masthead
        index="01"
        label="Contact"
        title={
          <>
            Let&rsquo;s talk
            <br />
            specification.
          </>
        }
        lede="Tell us the material, the grade and the volume. A specialist comes back with availability, documentation and a landed price."
      />

      <section className="band relative z-10">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Channels */}
          <div>
            <Reveal className="flex items-baseline gap-3">
              <span className="label num label-accent">02</span>
              <span className="label">Direct lines</span>
            </Reveal>

            <div className="mt-8">
              {CHANNELS.map((c, i) => {
                const Icon = c.icon;
                const content = (
                  <div className="flex items-start gap-5">
                    <Icon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <p className="label">{c.label}</p>
                      <p className="display-sm mt-1.5 text-[15px] md:text-base">
                        {c.value}
                      </p>
                      <p className="prose-body mt-1.5 text-[13.5px]">{c.note}</p>
                    </div>
                  </div>
                );

                return c.href ? (
                  <Reveal key={c.label} delay={i * 60}>
                    <a
                      href={c.href}
                      {...(c.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="row-item"
                    >
                      {content}
                    </a>
                  </Reveal>
                ) : (
                  <Reveal key={c.label} delay={i * 60} className="row-item">
                    {content}
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Enquiry form */}
          <div>
            <Reveal className="flex items-baseline gap-3">
              <span className="label num label-accent">03</span>
              <span className="label">Send an enquiry</span>
            </Reveal>

            <Reveal delay={60}>
              <p className="prose-body mt-7 text-[14px]">
                Submitting opens your email app with the details filled in —
                review it and press send.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={handleSubmit} className="mt-10 space-y-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label">
                      Full name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="field"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="field-label">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="field"
                      placeholder="Optional"
                      value={form.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="field"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="field-label">
                    Material, grade, quantity *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="field resize-none"
                    placeholder="e.g. Citric Acid Monohydrate, food grade, 2 tonnes, delivered Ikeja."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-solid w-full sm:w-auto">
                  Send enquiry
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                {sent && (
                  <p
                    role="status"
                    className="rounded-[var(--r-sm)] border border-accent bg-accent-soft px-4 py-3 text-[14px] text-ink"
                  >
                    Your email app should have opened with the details filled
                    in. If nothing happened, reach us on WhatsApp instead.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
