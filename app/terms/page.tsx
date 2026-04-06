"use client";

import { useLanguage } from "@/components/language-provider";

export default function TermsPage() {
  const { translations } = useLanguage();
  const { footer, home } = translations;

  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="display-title hero-headline">{footer.terms}</h1>
          <p className="hero-copy mt-4 text-[var(--muted-ink)]">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="max-w-3xl prose prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using OpenClaw Skills for Authors ("the Service"), you agree to be bound 
            by these Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            OpenClaw Skills for Authors is a curated library of AI workflows organized for authors, 
            writers, researchers, and course creators. The Service provides access to Skill listings, 
            descriptions, and related resources.
          </p>

          <h2>3. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose</li>
            <li>Submit false, misleading, or fraudulent Skill recommendations</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Harass, abuse, or harm other users</li>
          </ul>

          <h2>4. Skill Submissions</h2>
          <p>
            By submitting a Skill recommendation, you grant us a non-exclusive, royalty-free right to 
            use, display, and distribute the submitted content. You represent that you have the right 
            to submit such content.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by OpenClaw 
            Skills for Authors and are protected by international copyright laws.
          </p>

          <h2>6. Third-Party Content</h2>
          <p>
            The Service may include links to third-party websites or resources. We are not responsible 
            for the content, accuracy, or opinions expressed on such third parties.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
            EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your use of the Service.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless OpenClaw Skills for Authors and its affiliates 
            from any claim or demand arising from your violation of these Terms.
          </p>

          <h2>10. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to the Service at our sole 
            discretion, without prior notice, for any reason.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, 
            without regard to its conflict of law provisions.
          </p>

          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will notify you of changes 
            by posting the new Terms on this page. Your continued use of the Service constitutes 
            acceptance of the modified terms.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:{" "}
            <a href="mailto:support@clawauthor.com" className="text-[var(--accent)]">
              support@clawauthor.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
