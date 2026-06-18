import type { Metadata } from 'next';
import CurationChampHome from '@/components/curationchamp/CurationChampHome';
import ClientPageCustomizer from '@/components/ClientPageCustomizer';
import ClientMetaUpdater from '@/components/ClientMetaUpdater';

export const metadata: Metadata = {
  title: 'CurationChamp — Content Curation, Writing & Marketing Agency',
  description:
    'CurationChamp turns scattered ideas into content that ranks, reads, and converts. Curation, writing, and marketing under one roof, with fixed scope and predictable pricing. Get a free content sample.',
};

export default function HomePage() {
  return (
    <ClientPageCustomizer pageKey="home">
      <ClientMetaUpdater pageKey="home" />
      <CurationChampHome />
    </ClientPageCustomizer>
  );
}
