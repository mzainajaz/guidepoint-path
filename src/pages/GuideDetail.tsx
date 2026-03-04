import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { guideChapters, guideParts } from "@/data/setupGuides";
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const GuideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const chapter = guideChapters.find(c => c.slug === slug);

  if (!chapter) return <NotFound />;

  const part = guideParts.find(p => p.id === chapter.partId);
  const partChapters = guideChapters.filter(c => c.partId === chapter.partId);
  const currentIdx = partChapters.findIndex(c => c.id === chapter.id);
  const prev = currentIdx > 0 ? partChapters[currentIdx - 1] : null;
  const next = currentIdx < partChapters.length - 1 ? partChapters[currentIdx + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${chapter.title} — UAE Setup Guide`}
        description={chapter.summary}
        schema={[breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: chapter.title, url: `/guides/${chapter.slug}` },
        ])]}
      />
      <Header />
      <main className="page-offset">
        {/* Breadcrumbs */}
        <div className="container pt-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/guides" className="hover:text-foreground transition-colors">Guides</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium line-clamp-1">{chapter.title}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="container py-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-[10px]">
                Part {part?.number}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                Chapter {chapter.chapterNumber}
              </Badge>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">
              {chapter.title}
            </h1>
            <p className="text-lg text-muted-foreground">{chapter.summary}</p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="container pb-16 max-w-3xl space-y-10">
          {chapter.sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="space-y-4"
            >
              <h2 className="font-display text-xl font-semibold text-foreground border-l-2 border-primary pl-4">
                {sec.heading}
              </h2>

              {sec.content && (
                <p className="text-muted-foreground leading-relaxed">{sec.content}</p>
              )}

              {sec.bullets && (
                <ul className="space-y-2 pl-1">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="text-primary mt-1 shrink-0">●</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.table && (
                <div className="overflow-x-auto border border-border rounded-xl">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        {sec.table.headers.map((h, hi) => (
                          <th key={hi} className="text-left px-4 py-3 font-medium text-foreground whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, ri) => (
                        <tr key={ri} className="border-t border-border">
                          {row.map((cell, ci) => (
                            <td key={ci} className="px-4 py-3 text-muted-foreground">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ))}
        </section>

        {/* Navigation */}
        <section className="container pb-16 max-w-3xl">
          <div className="flex items-center justify-between border-t border-border pt-6 gap-4">
            {prev ? (
              <Button variant="ghost" asChild className="gap-2">
                <Link to={`/guides/${prev.slug}`}>
                  <ArrowLeft className="h-4 w-4" /> {prev.title}
                </Link>
              </Button>
            ) : <div />}
            {next ? (
              <Button variant="ghost" asChild className="gap-2">
                <Link to={`/guides/${next.slug}`}>
                  {next.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild className="gap-2">
                <Link to="/guides">
                  Back to all guides
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="container pb-16">
          <div className="border border-accent/20 bg-accent/5 rounded-lg p-6 md:p-8 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
              Need personalised guidance?
            </h2>
            <p className="text-muted-foreground mb-5">
              Get a Setup Snapshot tailored to your business model, activity, and budget.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/contact">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuideDetail;
