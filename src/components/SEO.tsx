import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  /** Path only, e.g. "/gallery" — the domain is prepended automatically. */
  path: string;
  image?: string;
  noindex?: boolean;
}

const SITE_URL = "https://mernacademy.in";
const DEFAULT_IMAGE = `${SITE_URL}/logo.svg`;

export const SEO = ({ title, description, path, image = DEFAULT_IMAGE, noindex = false }: SEOProps) => {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
