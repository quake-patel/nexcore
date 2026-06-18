import type { Metadata } from 'next';
import ContentWritingAgency from '@/components/curationchamp/ContentWritingAgency';
import ClientPageCustomizer from '@/components/ClientPageCustomizer';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'Content Writing Agency',
  description:
    'The content writing agency that makes you impossible to scroll past. SEO articles, web copy, ebooks, and founder ghostwriting by category specialists, plus a Content Cluster Strategy that ranks whole topics. Get a free sample.',
  openGraph: {
    title: 'Content Writing Agency — CurationChamp',
    description:
      'The content writing agency that makes you impossible to scroll past. SEO articles, web copy, ebooks, and founder ghostwriting by category specialists, plus a Content Cluster Strategy that ranks whole topics. Get a free sample.',
  },
};

export default function ContentWritingAgencyPage() {
  return (
    <ClientPageCustomizer pageKey="content-writing-agency">
      <ClientMetaUpdater pageKey="content-writing-agency" />
      <ContentWritingAgency />
    </ClientPageCustomizer>
  );
}
