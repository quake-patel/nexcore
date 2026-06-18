import type { Metadata } from 'next';
import ContentMarketingAgency from '@/components/curationchamp/ContentMarketingAgency';
import ClientPageCustomizer from '@/components/ClientPageCustomizer';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'Content Marketing Agency',
  description:
    'The content marketing agency that turns words into pipeline. Strategy, creation, optimisation, promotion, and distribution under one roof, with reporting tied to revenue. Book a free strategy call.',
  openGraph: {
    title: 'Content Marketing Agency — CurationChamp',
    description:
      'The content marketing agency that turns words into pipeline. Strategy, creation, optimisation, promotion, and distribution under one roof, with reporting tied to revenue. Book a free strategy call.',
  },
};

export default function ContentMarketingAgencyPage() {
  return (
    <ClientPageCustomizer pageKey="content-marketing-agency">
      <ClientMetaUpdater pageKey="content-marketing-agency" />
      <ContentMarketingAgency />
    </ClientPageCustomizer>
  );
}
