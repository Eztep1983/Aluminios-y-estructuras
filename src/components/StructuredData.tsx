export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Estructuras y Aluminios Pasto",
    "image": "https://res.cloudinary.com/dzqm5gmyg/image/upload/v1763677622/Portada1_pugn6j.jpg",
    "description": "Especialistas en acabados de aluminio y vidrios en Pasto, Nariño. Ventanas, puertas, fachadas y estructuras.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Barrio Navarrete, Cl 19 # 17b 22, Pasto, Nariño",
      "addressLocality": "Pasto",
      "addressRegion": "Nariño",
      "addressCountry": "CO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "1.2079692",
      "longitude": "-77.2749046"
    },
    "telephone": "+573122180953",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Pasto"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}