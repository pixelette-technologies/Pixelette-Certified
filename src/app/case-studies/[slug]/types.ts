export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudyData {
  slug: string;
  client: string;
  industry: string;
  employees: string;
  certifications: string[];
  timeline: string;
  overview: string;
  challenge: string[];
  solution: string[];
  metrics: CaseStudyMetric[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  relatedServices: { title: string; href: string }[];
}
