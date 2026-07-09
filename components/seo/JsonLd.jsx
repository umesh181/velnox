import { getAllSchemas } from '@/lib/seo/schema';

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getAllSchemas()),
      }}
    />
  );
}
