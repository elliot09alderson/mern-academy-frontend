import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

interface LegalPageLayoutProps {
  title: string;
  path: string;
  description: string;
  updated: string;
  children: ReactNode;
}

export const LegalPageLayout = ({ title, path, description, updated, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0D0C0A]">
      <SEO title={`${title} | MERN Academy`} description={description} path={path} />
      <Navigation />

      <main className="pt-20">
        <section className="py-20 px-6 lg:px-8 border-b border-[#2A2522]">
          <div className="max-w-3xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
              Legal
            </span>
            <h1
              className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {title}
            </h1>
            <p className="font-mono text-[11px] text-[#6B6660] tracking-[0.06em] uppercase">
              Last updated: {updated}
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto legal-prose">
            {children}
          </div>
        </section>
      </main>

      <style>{`
        .legal-prose h2 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-weight: 700;
          font-size: 1.375rem;
          color: #F0EBE1;
          letter-spacing: -0.01em;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .legal-prose h2:first-child { margin-top: 0; }
        .legal-prose p {
          color: #A39E95;
          font-size: 0.9375rem;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .legal-prose ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .legal-prose li {
          color: #A39E95;
          font-size: 0.9375rem;
          line-height: 1.75;
          margin-bottom: 0.5rem;
        }
        .legal-prose a {
          color: #C4622D;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .legal-prose a:hover { color: #D4723D; }
        .legal-prose strong { color: #F0EBE1; }
      `}</style>

      <Footer />
    </div>
  );
};
