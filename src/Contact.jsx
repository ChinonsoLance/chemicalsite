// Contact.jsx (placeholder – minimal)
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-sm mb-8">Have a question about our products or your order? Reach out to our lab specialists.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors bg-gray-50/50"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors bg-gray-50/50"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">Message</label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-500 transition-colors bg-gray-50/50 resize-none"
              placeholder="How can we help?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-gray-900 text-white font-medium text-sm rounded-full hover:bg-gray-700 transition-all shadow-lg shadow-gray-200"
          >
            Send Message
          </button>
          {submitted && (
            <p className="text-green-600 text-sm text-center animate-fade-in-up">✓ Thanks for reaching out – we'll respond within 24 hours.</p>
          )}
        </form>
      </div>
    </div>
  );
}