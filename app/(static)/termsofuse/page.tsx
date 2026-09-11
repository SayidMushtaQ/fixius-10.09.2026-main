import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Fixius",
  description: "Terms and conditions for using the Handcraft Portal website.",
  robots: "index, follow",
};

export default function TermsOfUsePage() {
  return (
    <article className="prose prose-slate max-w-none text-Heading/80">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-8 border-b pb-4 border-gray-100">Terms of <span className="text-primary italic">Use</span></h1>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-secondary">1. Acceptance of Terms</h2>
        <p className="font-medium text-gray-600 leading-relaxed">
          By accessing and using the Handcraft Portal website (the Website), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Website.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-secondary">2. User Accounts</h2>
        <p className="font-medium text-gray-600 leading-relaxed">
          In order to use certain features or services on the Website, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or device.
        </p>
      </section>

      <section className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-secondary">3. Job Postings and Bidding</h2>
        <p className="font-medium text-gray-600 leading-relaxed">
          The Website allows users to post job listings and receive bids from service providers. It is your responsibility to provide accurate and complete information in your job postings.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-secondary">4. Intellectual Property</h2>
        <p className="font-medium text-gray-600 leading-relaxed">
          The content and materials on this Website are owned by or licensed to the Website. You may not modify, copy, or distribute any materials without prior written consent.
        </p>
      </section>
    </article>
  );
}
