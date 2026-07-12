import { siteMeta } from '@/data';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: 'website' | 'article';
  /** Serialised as a JSON-LD block. */
  structuredData?: Record<string, unknown>;
}

/**
 * React 19 hoists `title`, `meta` and `link` elements into `<head>`, so no
 * helmet library is needed — the last mounted route wins.
 */
export function Seo({
  title,
  description = siteMeta.defaultDescription,
  image = siteMeta.ogImage,
  path = '/',
  type = 'website',
  structuredData,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${siteMeta.siteName}` : siteMeta.defaultTitle;
  const url = `${siteMeta.url}${path}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteMeta.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMeta.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </>
  );
}
