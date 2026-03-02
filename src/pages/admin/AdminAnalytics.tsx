import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(160,84%,39%)", "hsl(217,91%,60%)", "hsl(38,92%,50%)", "hsl(0,72%,51%)", "hsl(280,60%,50%)"];

const AdminAnalytics = () => {
  const [dailyViews, setDailyViews] = useState<{ date: string; views: number }[]>([]);
  const [topPages, setTopPages] = useState<{ page: string; views: number }[]>([]);
  const [sources, setSources] = useState<{ name: string; value: number }[]>([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString();
      const { data: views } = await supabase
        .from("page_views")
        .select("page_path, utm_source, created_at")
        .gte("created_at", thirtyDaysAgo);

      if (!views) return;
      setTotalViews(views.length);

      // Daily views
      const byDay: Record<string, number> = {};
      views.forEach(v => {
        const d = v.created_at.split("T")[0];
        byDay[d] = (byDay[d] || 0) + 1;
      });
      setDailyViews(
        Object.entries(byDay)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, views]) => ({ date: date.slice(5), views }))
      );

      // Top pages
      const byPage: Record<string, number> = {};
      views.forEach(v => { byPage[v.page_path] = (byPage[v.page_path] || 0) + 1; });
      setTopPages(
        Object.entries(byPage)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([page, views]) => ({ page, views }))
      );

      // Sources
      const bySource: Record<string, number> = {};
      views.forEach(v => {
        const s = v.utm_source || "Direct";
        bySource[s] = (bySource[s] || 0) + 1;
      });
      setSources(Object.entries(bySource).map(([name, value]) => ({ name, value })));
    };
    fetch();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
        <span className="text-sm text-muted-foreground">Last 30 days · {totalViews} views</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily views chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Page Views per Day</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip />
              <Bar dataKey="views" fill="hsl(160,84%,39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic sources */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={sources} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {sources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {sources.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {s.name}
                </span>
                <span className="text-muted-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top pages */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Top Pages</h3>
        <div className="space-y-2">
          {topPages.map(p => (
            <div key={p.page} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-sm text-foreground font-mono">{p.page}</span>
              <span className="text-sm font-semibold text-foreground">{p.views}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-2">Google Analytics Integration</h3>
        <p className="text-sm text-muted-foreground">
          To add Google Analytics, paste your GA4 Measurement ID (G-XXXXXXXXXX) in the SEO / Meta section, or add the gtag script to your <code>index.html</code>.
        </p>
      </div>
    </div>
  );
};

export default AdminAnalytics;
