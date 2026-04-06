import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for OpenClaw Skills for Authors. Learn how we collect, use, and protect your information.",
  alternates: {
    canonical: `${getSiteUrl()}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pb-24">
      <section className="site-shell pt-10 md:pt-16">
        <div className="max-w-3xl">
          <h1 className="display-title hero-headline">Privacy Policy</h1>
          <p className="hero-copy mt-4 text-[var(--muted-ink)]">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="site-shell section-gap">
        <div className="max-w-3xl prose prose-invert">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, including when you submit a Skill recommendation, 
            create an account, or contact us for support. This may include your name, email address, 
            and the content of your submissions.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process and display Skill submissions</li>
            <li>Send you updates and administrative communications</li>
            <li>Respond to your comments and questions</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties. 
            We may share aggregated, anonymized information that cannot identify you.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. 
            However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>5. Cookies</h2>
          <p>
            We may use cookies and similar technologies to enhance your experience. You can control 
            cookie preferences through your browser settings.
          </p>

          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. 
            Contact us at the email below to exercise these rights.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for the 
            privacy practices of these external sites.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for users under 16 years of age. We do not knowingly 
            collect information from children.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new policy on this page.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:support@clawauthor.com" className="text-[var(--accent)]">
              support@clawauthor.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
