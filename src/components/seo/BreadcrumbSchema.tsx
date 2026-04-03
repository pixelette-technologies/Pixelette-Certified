import JsonLd from "./JsonLd";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          ...(item.href ? { item: `https://pixelettecertified.com${item.href}` } : {}),
        })),
      }}
    />
  );
}
