export default function Contact() {
  return (
    <div className="min-h-screen bg-stone-50 pt-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-stone-900 mb-6" style={{ fontFamily: "'Georgia', serif" }}>
          Contact Us
        </h1>
        <p className="text-stone-600 mb-8">
          Have a question about a product, an order, or a custom request? Our team of chemists
          and support specialists is ready to help.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">Email</h3>
            <p className="text-stone-600">support@chemera.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">Phone</h3>
            <p className="text-stone-600">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}