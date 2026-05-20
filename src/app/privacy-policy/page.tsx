import type { Metadata } from 'next';
import LegalPageWrapper from '@/components/layout/LegalPageWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy | Sniper Cutzz',
  description: 'Privacy Policy and GDPR information for Sniper Cutzz barbershop.',
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageWrapper title="Privacy Policy" lastUpdated="May 2026">
      {/* ── Transitional notice ──────────────────────────────────────── */}
      <div className="notice-box">
        <p>
          <strong>Transitional notice:</strong> Sniper Cutzz is currently operating in a pre-registration
          phase pending full legal entity incorporation (expected by{' '}
          <span className="placeholder">TBD_BY_SEPTEMBER_2026</span>).
          Until registration is complete, the data controller is{' '}
          <span className="placeholder">{'{{OWNER_NAME}}'}</span>, operating as a sole trader.
          This policy will be updated upon formal registration.
        </p>
      </div>

      <h2>1. Data Controller</h2>
      <p>
        The data controller responsible for processing your personal data is:
      </p>
      <ul>
        <li><strong>Company name:</strong> <span className="placeholder">{'{{COMPANY_NAME}}'}</span></li>
        <li><strong>Legal form:</strong> <span className="placeholder">{'{{LEGAL_FORM}}'}</span> (pending registration)</li>
        <li><strong>Address:</strong> <span className="placeholder">{'{{ADDRESS}}'}</span></li>
        <li>
          <strong>Contact:</strong>{' '}
          <a href="mailto:contact@sniper-cutzz.com">
            <span className="placeholder">{'{{DPO_EMAIL}}'}</span>
          </a>
        </li>
        <li><strong>Phone:</strong> +352 691 341 915</li>
      </ul>

      <h2>2. Data We Collect</h2>

      <h3>2.1 Booking data (via WhatsApp or Calendly)</h3>
      <ul>
        <li>First and last name</li>
        <li>WhatsApp phone number</li>
        <li>Email address (via Calendly only)</li>
        <li>Preferred barber, date and time slot</li>
        <li>Location (Luxembourg or Portugal)</li>
      </ul>

      <h3>2.2 Reviews and media</h3>
      <ul>
        <li>Name or handle (if submitted voluntarily)</li>
        <li>Review text</li>
        <li>Photos or videos of your haircut (with explicit consent)</li>
      </ul>

      <h3>2.3 Contact form</h3>
      <ul>
        <li>Name, email address, free-text message</li>
      </ul>

      <h3>2.4 Technical data</h3>
      <ul>
        <li>IP address (anonymised where possible)</li>
        <li>Browser type and OS (for analytics, if consented)</li>
        <li>Pages visited and time spent (anonymised analytics)</li>
      </ul>

      <h2>3. Purposes and Legal Basis (Art. 6 GDPR)</h2>
      <ul>
        <li>
          <strong>Appointment management:</strong> Art. 6(1)(b) — performance of a contract
          (booking your haircut appointment).
        </li>
        <li>
          <strong>Marketing communications:</strong> Art. 6(1)(a) — your consent (you may
          withdraw at any time).
        </li>
        <li>
          <strong>Reviews and social media content:</strong> Art. 6(1)(a) — explicit consent
          before publication of any photo or video.
        </li>
        <li>
          <strong>Analytics:</strong> Art. 6(1)(a) — consent via cookie banner.
        </li>
        <li>
          <strong>Legal obligations:</strong> Art. 6(1)(c) — accounting and regulatory
          requirements.
        </li>
      </ul>

      <h2>4. Recipients and Sub-Processors</h2>
      <p>Your data may be shared with the following third parties:</p>
      <ul>
        <li>
          <strong>Calendly Inc.</strong> (USA) — online scheduling. Subject to Standard
          Contractual Clauses (SCCs) for data transfers to the USA.{' '}
          <a href="https://calendly.com/privacy" target="_blank" rel="noopener noreferrer">
            Calendly Privacy Policy
          </a>
        </li>
        <li>
          <strong>Vercel Inc.</strong> (USA) — website hosting. Subject to SCCs.{' '}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel Privacy Policy
          </a>
        </li>
        <li>
          <strong>Meta Platforms Ireland Ltd.</strong> — Instagram / Facebook (if marketing
          cookies are accepted). Subject to Meta&apos;s standard data transfer mechanisms.
        </li>
        <li>
          <strong>WhatsApp LLC</strong> — booking confirmations sent via WhatsApp. Data
          processed per WhatsApp / Meta Terms.
        </li>
      </ul>
      <p>
        We do not sell your personal data to third parties.
      </p>

      <h2>5. Retention Periods</h2>
      <ul>
        <li>Booking data: retained for <strong>3 years</strong> after your last visit.</li>
        <li>Review content and media: retained until you request removal or withdraw consent.</li>
        <li>Contact form submissions: retained for <strong>12 months</strong>.</li>
        <li>Analytics data: retained for <strong>26 months</strong> (anonymised).</li>
        <li>Legal / accounting records: retained for the period required by Luxembourg or
          Portuguese law (typically 10 years for fiscal records).</li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>
        Under the GDPR you have the right to:
      </p>
      <ul>
        <li><strong>Access</strong> — obtain a copy of your personal data.</li>
        <li><strong>Rectification</strong> — correct inaccurate data.</li>
        <li><strong>Erasure</strong> — request deletion (&ldquo;right to be forgotten&rdquo;).</li>
        <li><strong>Restriction</strong> — limit how we process your data.</li>
        <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
        <li><strong>Objection</strong> — object to processing based on legitimate interests.</li>
        <li>
          <strong>Withdraw consent</strong> — at any time, without affecting the lawfulness of
          prior processing.
        </li>
      </ul>
      <p>
        To exercise any of these rights, contact us at{' '}
        <a href="mailto:contact@sniper-cutzz.com">
          <span className="placeholder">{'{{DPO_EMAIL}}'}</span>
        </a>.
        We will respond within 30 days.
      </p>

      <h2>7. Cookies</h2>
      <p>
        We use cookies and similar tracking technologies. You can manage your preferences at
        any time via the cookie banner displayed on your first visit.
      </p>

      <h3>7.1 Essential cookies</h3>
      <p>
        Required for the website to function (session, language preference). No consent required.
      </p>

      <h3>7.2 Analytics cookies</h3>
      <p>
        Help us understand how the site is used (anonymised traffic data). Requires consent.
      </p>

      <h3>7.3 Marketing cookies</h3>
      <p>
        Used for targeted advertising via Instagram and Meta. Requires consent.
      </p>

      <h2>8. Transfers to Third Countries</h2>
      <p>
        Calendly, Vercel, and Meta are based in the United States. Transfers to these providers
        are made under the EU Standard Contractual Clauses (Commission Decision 2021/914/EU),
        which provide appropriate safeguards for your personal data.
      </p>

      <h2>9. Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect your personal
        data against unauthorised access, alteration, disclosure or destruction. All data is
        transmitted over HTTPS.
      </p>

      <h2>10. Supervisory Authority</h2>
      <p>
        If you believe we have not handled your data in accordance with applicable law, you
        have the right to lodge a complaint with the competent supervisory authority:
      </p>
      <ul>
        <li>
          <strong>Luxembourg:</strong>{' '}
          <a href="https://cnpd.public.lu" target="_blank" rel="noopener noreferrer">
            Commission Nationale pour la Protection des Données (CNPD)
          </a>
          {' '}— 15, Boulevard du Jazz, L-4370 Belvaux
        </li>
        <li>
          <strong>Portugal:</strong>{' '}
          <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">
            Comissão Nacional de Proteção de Dados (CNPD Portugal)
          </a>
          {' '}— Av. D. Carlos I, 134 — 1º, 1200-651 Lisboa
        </li>
      </ul>

      <h2>11. Contact</h2>
      <p>
        For any questions regarding this Privacy Policy or the processing of your personal
        data:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@sniper-cutzz.com">
            <span className="placeholder">{'{{DPO_EMAIL}}'}</span>
          </a>
        </li>
        <li><strong>WhatsApp:</strong> +352 691 341 915</li>
        <li><strong>Address:</strong> <span className="placeholder">{'{{ADDRESS}}'}</span></li>
      </ul>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we make material changes, we
        will update the &ldquo;last updated&rdquo; date at the top of this page. We encourage you to review
        this policy periodically.
      </p>
    </LegalPageWrapper>
  );
}
