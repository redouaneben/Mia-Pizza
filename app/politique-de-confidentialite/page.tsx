import type { Metadata } from "next";

import { LegalContactLine } from "@/components/legal-contact-line";
import { LegalPageShell } from "@/components/legal-page-shell";
import { legalConfig } from "@/config/legal";
import { getFullAddress, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${siteConfig.name}`,
  description: `Politique de confidentialité et cookies du site ${siteConfig.name}.`,
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageShell title="Politique de confidentialité">
      <p className="text-sm text-[#27251F]/65">
        Dernière mise à jour : {legalConfig.lastUpdated}
      </p>

      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          <strong>{siteConfig.legalName}</strong> — {getFullAddress()}.
          <br />
          Contact : <LegalContactLine /> — Tél.{" "}
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
        </p>
      </section>

      <section>
        <h2>2. Données collectées via ce site</h2>
        <p>
          Ce site vitrine <strong>ne propose pas de compte client</strong> ni
          de formulaire de contact en ligne. Nous ne collectons pas
          volontairement de données personnelles via des champs saisis sur le
          site.
        </p>
        <p>
          En revanche, lorsque vous utilisez le bouton d’appel (
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>
          ), votre téléphone établit une communication hors du site : aucune
          donnée n’est enregistrée par le site lui-même.
        </p>
      </section>

      <section>
        <h2>3. Cookies & services tiers</h2>
        <ul>
          <li>
            <strong>Google Maps</strong> (iframe) : peut déposer des cookies ou
            traceurs selon votre navigation. Consultez la{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              politique de confidentialité Google
            </a>
            .
          </li>
          <li>
            <strong>Hébergeur (Vercel)</strong> : journaux techniques
            (adresse IP, horodatage) pour la sécurité et le fonctionnement du
            service.
          </li>
          <li>
            <strong>Statistiques</strong> : si un outil de mesure d’audience est
            activé ultérieurement, cette page sera mise à jour et, le cas
            échéant, un bandeau cookies pourra être affiché.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Vos droits (RGPD)</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de
          limitation et d’opposition concernant vos données personnelles,
          ainsi que d’un droit d’introduire une réclamation auprès de la CNIL (
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.cnil.fr
          </a>
          ).
        </p>
        <p>
          Pour exercer vos droits : <LegalContactLine /> ou{" "}
          <a href={siteConfig.phone.href}>{siteConfig.phone.display}</a>.
        </p>
      </section>

      <section>
        <h2>5. Allergènes</h2>
        <p>
          Les informations allergènes affichées en ligne sont indicatives et ne
          remplacent pas l’affiche en boutique. En cas d’allergie sévère,
          confirmez toujours en établissement ou par téléphone.
        </p>
      </section>
    </LegalPageShell>
  );
}
