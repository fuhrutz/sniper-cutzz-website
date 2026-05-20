import type { Metadata } from 'next';
import LegalPageWrapper from '@/components/layout/LegalPageWrapper';

export const metadata: Metadata = {
  title: 'Legal Notice | Sniper Cutzz',
  description: 'Legal notice and mentions légales for Sniper Cutzz barbershop.',
  robots: { index: false },
};

export default function LegalNoticePage() {
  return (
    <LegalPageWrapper title="Legal Notice" lastUpdated="May 2026">
      {/* ── Transitional notice ──────────────────────────────────────── */}
      <div className="notice-box">
        <p>
          <strong>Pre-registration notice:</strong> Sniper Cutzz is currently operating in a
          pre-registration phase. Full legal entity registration is in progress and expected to
          be completed by{' '}
          <span className="placeholder">TBD_BY_SEPTEMBER_2026</span>.
          The information below reflects the current operational status and will be updated upon
          formal incorporation.
        </p>
      </div>

      <h2>1. Publisher</h2>
      <p>
        This website is published by:
      </p>
      <ul>
        <li><strong>Trading name:</strong> Sniper Cutzz</li>
        <li>
          <strong>Legal entity:</strong>{' '}
          <span className="placeholder">{'{{COMPANY_NAME}}'}</span>,{' '}
          <span className="placeholder">{'{{LEGAL_FORM}}'}</span>
        </li>
        <li>
          <strong>Registered address:</strong>{' '}
          <span className="placeholder">{'{{ADDRESS}}'}</span>
        </li>
        <li>
          <strong>RCS number:</strong>{' '}
          <span className="placeholder">{'{{RCS_NUMBER}}'}</span> (pending
          registration — <span className="placeholder">TBD_BY_SEPTEMBER_2026</span>)
        </li>
        <li>
          <strong>VAT number:</strong>{' '}
          <span className="placeholder">{'{{VAT_NUMBER}}'}</span> (pending
          registration — <span className="placeholder">TBD_BY_SEPTEMBER_2026</span>)
        </li>
        <li>
          <strong>Director / Gérant:</strong>{' '}
          <span className="placeholder">{'{{DIRECTOR_NAME}}'}</span>
        </li>
        <li><strong>Phone:</strong> +352 691 341 915</li>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@sniper-cutzz.com">
            <span className="placeholder">{'{{EMAIL}}'}</span>
          </a>
        </li>
      </ul>

      <h2>2. Website Host</h2>
      <ul>
        <li><strong>Provider:</strong> Vercel Inc.</li>
        <li><strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
        <li>
          <strong>Website:</strong>{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            vercel.com
          </a>
        </li>
      </ul>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this website — including but not limited to text, graphics, logos,
        photographs, videos, icons, and software — is the exclusive property of Sniper Cutzz
        or its content suppliers and is protected by applicable intellectual property laws.
      </p>
      <p>
        The Sniper Cutzz name, logo, and brand identity are proprietary trademarks. Unauthorised
        reproduction, distribution, or use of any content without prior written permission is
        strictly prohibited.
      </p>
      <p>
        All photographs and video content published on this site were produced by or under
        licence to Sniper Cutzz. Client photos and videos are published with explicit consent.
      </p>

      <h2>4. Disclaimer</h2>
      <p>
        The information provided on this website is for general informational purposes only.
        While we strive to keep information accurate and up to date, we make no warranties or
        representations of any kind, express or implied, about the completeness, accuracy,
        reliability, or availability of the information.
      </p>
      <p>
        Prices, services, and availability are subject to change without notice. Booking
        confirmations are sent via WhatsApp and are subject to barber availability.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, Sniper Cutzz shall not be liable
        for any indirect, incidental, special, consequential, or punitive damages arising from
        your use of, or inability to use, this website or its services.
      </p>

      <h2>6. External Links</h2>
      <p>
        This website may contain links to third-party websites (Instagram, WhatsApp, Calendly).
        Sniper Cutzz has no control over the content or privacy practices of those sites and
        accepts no responsibility for them.
      </p>

      <h2>7. Applicable Law</h2>
      <p>
        This legal notice is governed by the laws of the Grand Duchy of Luxembourg. Any
        disputes arising from the use of this website shall be subject to the exclusive
        jurisdiction of the courts of Luxembourg City.
      </p>

      <h2>8. Credits</h2>
      <p>
        Website conceived and developed by{' '}
        <a href="https://vision2studio.com" target="_blank" rel="noopener noreferrer">
          Vision2Studio
        </a>{' '}
        — audiovisual production and digital creation studio based in Luxembourg.
      </p>

      <h2>9. Contact</h2>
      <ul>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@sniper-cutzz.com">
            <span className="placeholder">{'{{EMAIL}}'}</span>
          </a>
        </li>
        <li><strong>WhatsApp:</strong> +352 691 341 915</li>
        <li>
          <strong>Instagram:</strong>{' '}
          <a href="https://instagram.com/sniper_cutzz" target="_blank" rel="noopener noreferrer">
            @sniper_cutzz
          </a>
        </li>
      </ul>
    </LegalPageWrapper>
  );
}
