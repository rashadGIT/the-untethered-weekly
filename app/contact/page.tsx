'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-white text-center">
        <div className="container-narrow">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            Let's Talk
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Ready to choose courage over comfort? Fill out the form below and I'll get back to you within 48 hours.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-[#f9f9f9]">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white p-8 shadow-lg">
              <h2 className="text-3xl font-heading mb-6">Get In Touch</h2>

              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 p-6 rounded">
                  <h3 className="text-xl font-heading mb-2 text-green-800">Message Sent!</h3>
                  <p className="text-green-700">
                    Thank you for reaching out. I'll get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#161317] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#161317] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#161317] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-[#161317] focus:outline-none resize-none"
                      placeholder="Tell me about what you're looking for..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#161317] text-white px-8 py-4 font-medium hover:bg-[#3e3641] transition-colors disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-3xl font-heading mb-6">What Happens Next?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#161317] text-white rounded-full flex items-center justify-center font-heading text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-heading mb-2">I'll Review Your Message</h3>
                    <p className="text-gray-700">
                      I read every message personally. I'll review what you shared and think about how I can best support you.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#161317] text-white rounded-full flex items-center justify-center font-heading text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-heading mb-2">We'll Schedule A Call</h3>
                    <p className="text-gray-700">
                      If it seems like a good fit, I'll send you a link to schedule an initial conversation. No pressure, no sales pitch—just a real conversation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#161317] text-white rounded-full flex items-center justify-center font-heading text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-heading mb-2">We'll Figure Out Next Steps</h3>
                    <p className="text-gray-700">
                      Together, we'll determine which coaching option makes sense for you and what your path forward looks like.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-[#f9f9f9] p-6">
                <h3 className="text-xl font-heading mb-4">Prefer Email?</h3>
                <p className="text-gray-700 mb-4">
                  You can also reach me at:
                </p>
                <p className="text-lg font-medium">
                  hello@shannonmuruli.com
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  I typically respond within 48 hours.
                </p>
              </div>

              <div className="mt-8 bg-[#f9f9f9] p-6">
                <h3 className="text-xl font-heading mb-4">Follow Along</h3>
                <div className="space-y-2">
                  <a
                    href="https://www.instagram.com/shannonmuruli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-[#161317] transition-colors"
                  >
                    Instagram: @shannonmuruli
                  </a>
                  <a
                    href="https://www.facebook.com/shannonmuruli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-700 hover:text-[#161317] transition-colors"
                  >
                    Facebook: Shannon Muruli
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-[#161317] text-white text-center">
        <div className="container-narrow">
          <h2 className="text-4xl md:text-5xl font-heading mb-6 text-white">
            Not Ready To Reach Out Yet?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Join The Untethered Weekly and get weekly sales courage delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-6 py-4 mb-4 border border-gray-600 bg-transparent text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-white text-[#161317] px-6 py-4 text-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Get Weekly Courage
            </button>
          </form>
          <p className="text-sm text-gray-400">
            No spam. Unsubscribe anytime. Just courage.
          </p>
        </div>
      </section>
    </>
  );
}
