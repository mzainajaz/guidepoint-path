import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Eye, FileText, TrendingUp } from "lucide-react";

interface Stats {
  totalLeads: number;
  todayViews: number;
  publishedPosts: number;
  newLeadsToday: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalLeads: 0, todayViews: 0, publishedPosts: 0, newLeadsToday: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split("T")[0];

      const [leads, views, posts, todayLeads] = await Promise.all([
        supabase.from("leads").select("id", { count: "exact", head: true }),
        supabase.from("page_views").select("id", { count: "exact", head: true }).gte("created_at", today),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", today),
      ]);

      setStats({
        totalLeads: leads.count ?? 0,
        todayViews: views.count ?? 0,
        publishedPosts: posts.count ?? 0,
        newLeadsToday: todayLeads.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-accent" },
    { label: "Today's Views", value: stats.todayViews, icon: Eye, color: "text-info" },
    { label: "Published Posts", value: stats.publishedPosts, icon: FileText, color: "text-success" },
    { label: "New Leads Today", value: stats.newLeadsToday, icon: TrendingUp, color: "text-caution" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <div key={c.label} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
