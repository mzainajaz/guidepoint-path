import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, Search, ChevronDown, ChevronUp } from "lucide-react";

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
  country: string | null;
  business_type: string | null;
  contact_preference: string[] | null;
  setup_preference: string | null;
  budget: string | null;
  additional_services: string[] | null;
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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
    const headers = ["Name", "Email", "Phone", "Country", "Business Type", "Contact Pref", "Setup Pref", "Budget", "Services", "Status", "UTM Source", "UTM Campaign", "Landing Page", "Date"];
    const rows = filtered.map(l => [
      l.name, l.email, l.phone ?? "", l.country ?? "", l.business_type ?? "",
      (l.contact_preference ?? []).join("; "), l.setup_preference ?? "", l.budget ?? "",
      (l.additional_services ?? []).join("; "), l.status, l.utm_source ?? "",
      l.utm_campaign ?? "", l.landing_page ?? "", new Date(l.created_at).toLocaleDateString()
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const formatArray = (arr: string[] | null) => {
    if (!arr || arr.length === 0) return "—";
    return arr.join(", ");
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
                <TableHead className="w-8"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(l => (
                <>
                  <TableRow key={l.id} className="cursor-pointer" onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}>
                    <TableCell className="px-2">
                      {expandedId === l.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </TableCell>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell>{l.email}</TableCell>
                    <TableCell>{l.phone ?? "—"}</TableCell>
                    <TableCell>{l.country ?? "—"}</TableCell>
                    <TableCell className="text-xs">{l.business_type ?? "—"}</TableCell>
                    <TableCell>
                      <Select value={l.status} onValueChange={v => { updateStatus(l.id, v); }}>
                        <SelectTrigger className="h-7 w-28 text-xs" onClick={e => e.stopPropagation()}>
                          <Badge className={`${statusColors[l.status] ?? ""} text-xs`}>{l.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {["new", "contacted", "qualified", "lost"].map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(l.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                  {expandedId === l.id && (
                    <TableRow key={`${l.id}-details`}>
                      <TableCell colSpan={8} className="bg-secondary/30 px-6 py-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Contact Preference</span>
                            <span className="text-foreground">{formatArray(l.contact_preference)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Setup Preference</span>
                            <span className="text-foreground">{l.setup_preference ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Budget</span>
                            <span className="text-foreground">{l.budget ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Additional Services</span>
                            <span className="text-foreground">{formatArray(l.additional_services)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">UTM Source</span>
                            <span className="text-foreground">{l.utm_source ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Campaign</span>
                            <span className="text-foreground">{l.utm_campaign ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Landing Page</span>
                            <span className="text-foreground">{l.landing_page ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Referrer</span>
                            <span className="text-foreground">{l.referrer ?? "—"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs mb-0.5">Notes</span>
                            <span className="text-foreground">{l.notes ?? "—"}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No leads found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
