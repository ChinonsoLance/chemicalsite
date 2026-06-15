// Contact.jsx – with working email (mailto) and your phone/WhatsApp number
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // Your contact details
  const phoneNumber = "+234 704 753 5828";
  const whatsappNumber = "+234 704 753 5828";
  const whatsappLink = `https://wa.me/2347047535828`; // digits only for WhatsApp

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = form;
    const subject = `Contact from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    // Opens user's default email client (Gmail, Outlook, etc.)
    window.location.href = `mailto:support@yourlab.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Optional: clear form after sending
    setForm({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have questions about our products or your order? Reach out to our lab specialists.
            We're here to help!
          </p>
        </div>

        {/* Two-column layout: Contact Info + Form */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* LEFT: Contact cards (WhatsApp & Phone) */}
          <div className="space-y-6">
            {/* Phone Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-500 text-sm mt-1">Speak directly with a lab specialist</p>
                  <a href={`tel:${phoneNumber.replace(/\s/g, "")}`} className="text-green-600 font-medium text-lg mt-2 inline-block hover:underline">
                    {phoneNumber}
                  </a>
                  <p className="text-xs text-gray-400 mt-2">Mon–Fri, 9am–6pm EST</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.89.5 3.66 1.38 5.21l-1.46 4.28 4.28-1.46A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.24-.46-4.59-1.26l-.33-.19-2.68.91.91-2.68-.19-.33A7.96 7.96 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Chat on WhatsApp</h3>
                  <p className="text-gray-500 text-sm mt-1">Quick replies, typically within 1 hour</p>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 font-medium text-lg mt-2 inline-block hover:underline">
                    {whatsappNumber}
                  </a>
                  <p className="text-xs text-gray-400 mt-2">Click to open WhatsApp chat</p>
                </div>
              </div>
            </div>

            {/* Extra note */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Prefer email? Fill out the form — we reply within 24h.
              </p>
            </div>
          </div>

          {/* RIGHT: Contact Form with working email (opens your email client) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Send us a message</h2>
            <p className="text-gray-500 text-sm mb-6">Fill out the form and it will open your email app – just press send.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Full name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors bg-gray-50/50"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Email address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors bg-gray-50/50"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors bg-gray-50/50 resize-none"
                  placeholder="How can we help? Please include order number if applicable."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gray-900 text-white font-medium text-sm rounded-full hover:bg-gray-700 transition-all shadow-lg shadow-gray-200"
              >
                Send Message (opens email)
              </button>
              {submitted && (
                <div className="text-green-600 text-sm text-center mt-3 p-2 bg-green-50 rounded-lg">
                  ✓ Email client opened – please check and press send!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}