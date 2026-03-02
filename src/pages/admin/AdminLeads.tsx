import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Search } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  landing_page: string | null;
  referrer: string | null;
  source_url: string | null;
  created_at: string;
  notes: string | null;
}

const statusColors: Record<string, string> = {
  new: "bg-accent/10 text-accent",
  contacted: "bg-info/10 text-info",
  qualified: "bg-success/10 text-success",
  lost: "bg-destructive/10 text-destructive",
};

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      const { data } = await query;
      setLeads((data as Lead[]) ?? []);
      setLoading(false);
    };
    fetchLeads();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const filtered = leads.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Status", "UTM Source", "UTM Medium", "UTM Campaign", "Landing Page", "Date"];
    const rows = filtered.map(l => [l.name, l.email, l.phone ?? "", l.status, l.utm_source ?? "", l.utm_medium ?? "", l.utm_campaign ?? "", l.landing_page ?? "", new Date(l.created_at).toLocaleDateString()]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground">Leads</h1>
        <Button variant="outline" size="sm" onClick={exportCSV} className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search leads…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(l => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.email}</TableCell>
                  <TableCell>{l.phone ?? "—"}</TableCell>
                  <TableCell>
                    <Select value={l.status} onValueChange={v => updateStatus(l.id, v)}>
                      <SelectTrigger className="h-7 w-28 text-xs">
                        <Badge className={`${statusColors[l.status] ?? ""} text-xs`}>{l.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {["new", "contacted", "qualified", "lost"].map(s => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.utm_source ?? "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.utm_campaign ?? "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No leads found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
