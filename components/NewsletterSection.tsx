'use client';

import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <section className="py-14 bg-white border-b border-zinc-200" data-purpose="newsletter-signup">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900 mb-4">
          GET THE LATEST TRENDS FIRST
        </h3>
        {/* Single minimal input box with arrow submit */}
        <form className="relative flex items-center max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            className="w-full border-b border-zinc-300 border-t-0 border-l-0 border-r-0 py-2.5 px-0 text-sm placeholder-zinc-400 focus:outline-none focus:ring-0 focus:border-black transition-colors"
            placeholder="Email address"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            aria-label="Submit Newsletter"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-zinc-800 hover:text-black hover:translate-x-1 transition-transform"
            type="submit"
          >
            <span className="text-lg">→</span>
          </button>
        </form>
        {submitted && (
          <p className="text-xs font-semibold text-emerald-700 mt-2">
            Thank you for subscribing! Check your inbox for exclusive trend previews.
          </p>
        )}
      </div>
    </section>
  );
}
