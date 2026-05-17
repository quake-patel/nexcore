export const LOCAL_PAGES_KEY = 'nexcore_pages_metadata';

export type PageMetadata = {
  title?: string;
  description?: string;
};

export type PagesMetadata = Record<string, PageMetadata>;

export function getPagesMetadata(): PagesMetadata {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LOCAL_PAGES_KEY);
    return raw ? (JSON.parse(raw) as PagesMetadata) : {};
  } catch {
    return {};
  }
}

export function savePageMetadata(pageKey: string, metadata: PageMetadata): void {
  const all = getPagesMetadata();
  all[pageKey] = metadata;
  localStorage.setItem(LOCAL_PAGES_KEY, JSON.stringify(all));
}
