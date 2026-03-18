import { useEffect, useState, useCallback } from "react";
import { format, subDays } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Search, Globe, TrendingUp, Link2, Unplug, ExternalLink, RefreshCw, Filter, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const DATE_PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 28 days", days: 28 },
  { label: "Last 90 days", days: 90 },
  { label: "Last 6 months", days: 180 },
  { label: "Custom", days: 0 },
];

const LANGUAGE_PREFIXES = [
  { value: "all", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "es", label: "Spanish" },
  { value: "it", label: "Italian" },
  { value: "ru", label: "Russian" },
  { value: "uk", label: "Ukrainian" },
];

interface GSCRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface GATrafficRow {
  date: string;
  sessions: number;
  users: number;
  pageViews: number;
  bounceRate: number;
}

const AdminSearchPerformance = () => {
  const { session } = useAuth();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>(subDays(new Date(), 28));
  const [dateTo, setDateTo] = useState<Date>(new Date());
  const [datePreset, setDatePreset] = useState("28");
  const [showCustomFrom, setShowCustomFrom] = useState(false);
  const [showCustomTo, setShowCustomTo] = useState(false);

  // GSC state
  const [sites, setSites] = useState<string[]>([]);
  const [selectedSite, setSelectedSite] = useState("");
  const [langPrefix, setLangPrefix] = useState("all");
  const [indexedPages, setIndexedPages] = useState<GSCRow[]>([]);
  const [searchQueries, setSearchQueries] = useState<GSCRow[]>([]);
  const [countryData, setCountryData] = useState<GSCRow[]>([]);

  // GA state
  const [gaProperties, setGaProperties] = useState<{ id: string; name: string }[]>([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [trafficData, setTrafficData] = useState<GATrafficRow[]>([]);
  const [topPages, setTopPages] = useState<{ page: string; views: number; bounce: number }[]>([]);
  const [conversionData, setConversionData] = useState<{ event: string; count: number }[]>([]);
  const [trafficSources, setTrafficSources] = useState<{ channel: string; sessions: number }[]>([]);

  const callFunction = useCallback(
    async (fnName: string, body: Record<string, unknown>) => {
      const { data, error } = await supabase.functions.invoke(fnName, {
        body,
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (error) throw error;
      return data;
    },
    [session]
  );

  // Check connection status
  useEffect(() => {
    if (!session) return;
    callFunction("google-auth", { action: "status" })
      .then((d) => {
        setConnected(d.connected);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, callFunction]);

  // Hardcoded properties — no API calls needed
  useEffect(() => {
    if (!connected) return;
    setSites(["sc-domain:incorporateuae.com"]);
    setSelectedSite("sc-domain:incorporateuae.com");
    setGaProperties([{ id: "properties/523055023", name: "inc-uae" }]);
    setSelectedProperty("properties/523055023");
  }, [connected]);


  const startDate = format(dateFrom, "yyyy-MM-dd");
  const endDate = format(dateTo, "yyyy-MM-dd");

  const fetchGSCData = useCallback(async () => {
    if (!selectedSite) return;
    setRefreshing(true);
    try {
      const [idx, queries, countries] = await Promise.all([
        callFunction("google-search-console", {
          action: "index_status",
          site_url: selectedSite,
          language_prefix: langPrefix,
          start_date: startDate,
          end_date: endDate,
        }),
        callFunction("google-search-console", {
          action: "search_queries",
          site_url: selectedSite,
          language_prefix: langPrefix,
          start_date: startDate,
          end_date: endDate,
        }),
        callFunction("google-search-console", {
          action: "performance_by_country",
          site_url: selectedSite,
          start_date: startDate,
          end_date: endDate,
        }),
      ]);
      setIndexedPages(idx.rows || []);
      setSearchQueries(queries.rows || []);
      setCountryData(countries.rows || []);
    } catch (e) {
      console.error("GSC fetch error:", e);
    }
    setRefreshing(false);
  }, [selectedSite, langPrefix, startDate, endDate, callFunction]);

  const fetchGAData = useCallback(async () => {
    if (!selectedProperty) return;
    setRefreshing(true);
    try {
      const [traffic, pages, conversions, sources] = await Promise.all([
        callFunction("google-analytics", {
          action: "traffic_overview",
          property_id: selectedProperty,
          start_date: startDate,
          end_date: endDate,
        }),
        callFunction("google-analytics", {
          action: "top_pages",
          property_id: selectedProperty,
          start_date: startDate,
          end_date: endDate,
        }),
        callFunction("google-analytics", {
          action: "conversions",
          property_id: selectedProperty,
          start_date: startDate,
          end_date: endDate,
        }),
        callFunction("google-analytics", {
          action: "traffic_sources",
          property_id: selectedProperty,
          start_date: startDate,
          end_date: endDate,
        }),
      ]);

      // Parse GA traffic
      const rows = traffic.rows || [];
      setTrafficData(
        rows.map((r: any) => ({
          date: r.dimensionValues?.[0]?.value?.slice(4) || "",
          sessions: parseInt(r.metricValues?.[0]?.value || "0"),
          users: parseInt(r.metricValues?.[1]?.value || "0"),
          pageViews: parseInt(r.metricValues?.[5]?.value || "0"),
          bounceRate: parseFloat(r.metricValues?.[3]?.value || "0"),
        }))
      );

      setTopPages(
        (pages.rows || []).map((r: any) => ({
          page: r.dimensionValues?.[0]?.value || "",
          views: parseInt(r.metricValues?.[0]?.value || "0"),
          bounce: parseFloat(r.metricValues?.[2]?.value || "0"),
        }))
      );

      setConversionData(
        (conversions.rows || []).map((r: any) => ({
          event: r.dimensionValues?.[0]?.value || "",
          count: parseInt(r.metricValues?.[0]?.value || "0"),
        }))
      );

      setTrafficSources(
        (sources.rows || []).map((r: any) => ({
          channel: r.dimensionValues?.[0]?.value || "",
          sessions: parseInt(r.metricValues?.[0]?.value || "0"),
        }))
      );
    } catch (e) {
      console.error("GA fetch error:", e);
    }
    setRefreshing(false);
  }, [selectedProperty, startDate, endDate, callFunction]);

  // Auto-fetch when site/property/dates change
  useEffect(() => {
    if (connected && selectedSite) fetchGSCData();
  }, [connected, selectedSite, langPrefix, fetchGSCData]);

  useEffect(() => {
    if (connected && selectedProperty) fetchGAData();
  }, [connected, selectedProperty, fetchGAData]);

  const handleConnect = async () => {
    const redirectUri = `${window.location.origin}/admin/google-callback`;
    const data = await callFunction("google-auth", {
      action: "get_auth_url",
      redirect_uri: redirectUri,
    });
    window.location.href = data.url;
  };

  const handleDisconnect = async () => {
    await callFunction("google-auth", { action: "disconnect" });
    setConnected(false);
    setSites([]);
    setGaProperties([]);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Search Performance</h1>
        <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
          <Globe className="h-12 w-12 text-muted-foreground mx-auto" />
          <h2 className="text-lg font-semibold text-foreground">Connect Google Account</h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Connect your Google account to see Search Console indexing data, search queries, and Analytics traffic & conversions — all in one place.
          </p>
          <Button onClick={handleConnect} className="gap-2">
            <Link2 className="h-4 w-4" /> Connect with Google
          </Button>
        </div>
      </div>
    );
  }

  const totalClicks = searchQueries.reduce((s, r) => s + r.clicks, 0);
  const totalImpressions = searchQueries.reduce((s, r) => s + r.impressions, 0);
  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0";
  const avgPosition =
    searchQueries.length > 0
      ? (searchQueries.reduce((s, r) => s + r.position, 0) / searchQueries.length).toFixed(1)
      : "0";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="font-display text-2xl font-bold text-foreground">Search Performance</h1>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date range presets */}
          <Select
            value={datePreset}
            onValueChange={(val) => {
              setDatePreset(val);
              if (val !== "0") {
                setDateFrom(subDays(new Date(), parseInt(val)));
                setDateTo(new Date());
              }
            }}
          >
            <SelectTrigger className="w-[150px] h-8 text-xs">
              <CalendarIcon className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DATE_PRESETS.map((p) => (
                <SelectItem key={p.days} value={String(p.days)} className="text-xs">
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Custom date pickers */}
          {datePreset === "0" && (
            <div className="flex items-center gap-1">
              <Popover open={showCustomFrom} onOpenChange={setShowCustomFrom}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className={cn("h-8 text-xs gap-1 w-[120px] justify-start", !dateFrom && "text-muted-foreground")}>
                    <CalendarIcon className="h-3 w-3" />
                    {format(dateFrom, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={(d) => { if (d) { setDateFrom(d); setShowCustomFrom(false); } }}
                    disabled={(d) => d > dateTo || d > new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <span className="text-xs text-muted-foreground">–</span>
              <Popover open={showCustomTo} onOpenChange={setShowCustomTo}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className={cn("h-8 text-xs gap-1 w-[120px] justify-start", !dateTo && "text-muted-foreground")}>
                    <CalendarIcon className="h-3 w-3" />
                    {format(dateTo, "MMM d, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={(d) => { if (d) { setDateTo(d); setShowCustomTo(false); } }}
                    disabled={(d) => d < dateFrom || d > new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <span className="text-xs text-muted-foreground hidden sm:inline">
            {format(dateFrom, "MMM d")} – {format(dateTo, "MMM d, yyyy")}
          </span>

          <Button variant="outline" size="sm" onClick={() => { fetchGSCData(); fetchGAData(); }} disabled={refreshing} className="gap-2">
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDisconnect} className="gap-2 text-destructive">
            <Unplug className="h-3.5 w-3.5" /> Disconnect
          </Button>
        </div>
      </div>

      {/* ─── SEARCH CONSOLE SECTION ─── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Search className="h-5 w-5" /> Search Console
          </h2>
          <span className="text-xs text-muted-foreground">incorporateuae.com</span>
          <Select value={langPrefix} onValueChange={setLangPrefix}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <Filter className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_PREFIXES.map((l) => (
                <SelectItem key={l.value} value={l.value} className="text-xs">{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Total Clicks", value: totalClicks.toLocaleString(), color: "text-accent" },
            { label: "Impressions", value: totalImpressions.toLocaleString(), color: "text-info" },
            { label: "Avg CTR", value: `${avgCtr}%`, color: "text-success" },
            { label: "Avg Position", value: avgPosition, color: "text-caution" },
          ].map((c) => (
            <div key={c.label} className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Top search queries */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Top Search Queries</h3>
          {searchQueries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data available for this period.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Query</th>
                    <th className="text-right py-2 font-medium">Clicks</th>
                    <th className="text-right py-2 font-medium">Impressions</th>
                    <th className="text-right py-2 font-medium">CTR</th>
                    <th className="text-right py-2 font-medium">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {searchQueries.slice(0, 20).map((r, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-2 text-foreground font-mono text-xs">{r.keys[0]}</td>
                      <td className="py-2 text-right text-foreground font-semibold">{r.clicks}</td>
                      <td className="py-2 text-right text-muted-foreground">{r.impressions.toLocaleString()}</td>
                      <td className="py-2 text-right text-muted-foreground">{(r.ctr * 100).toFixed(1)}%</td>
                      <td className="py-2 text-right text-muted-foreground">{r.position.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Indexed pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Indexed Pages {langPrefix !== "all" && <span className="text-muted-foreground">({langPrefix})</span>}
            </h3>
            <p className="text-3xl font-bold text-foreground mb-3">{indexedPages.length}</p>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {indexedPages.slice(0, 30).map((r, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-0">
                  <span className="text-foreground font-mono truncate max-w-[70%]">{r.keys[0]}</span>
                  <span className="text-muted-foreground">{r.clicks} clicks</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Performance by Country</h3>
            {countryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={countryData.slice(0, 10).map((r) => ({ country: r.keys[0], clicks: r.clicks, impressions: r.impressions }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="country" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="hsl(160,84%,39%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No country data.</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── GOOGLE ANALYTICS SECTION ─── */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Google Analytics
          </h2>
          {gaProperties.length > 0 && (
            <Select value={selectedProperty} onValueChange={handlePropertyChange}>
              <SelectTrigger className="w-[260px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gaProperties.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="text-xs">{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Traffic chart */}
        {trafficData.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Overview (Last 28 Days)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke="hsl(160,84%,39%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="users" stroke="hsl(217,91%,60%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pageViews" stroke="hsl(38,92%,50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Traffic sources */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Traffic Sources</h3>
            {trafficSources.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={trafficSources} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="channel" type="category" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} width={120} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="hsl(217,91%,60%)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted-foreground">No source data.</p>
            )}
          </div>

          {/* Conversions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Conversion Events</h3>
            {conversionData.length > 0 ? (
              <div className="space-y-3">
                {conversionData.map((c) => (
                  <div key={c.event} className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-mono">{c.event}</span>
                    <span className="text-sm font-bold text-foreground">{c.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No conversion events recorded.</p>
            )}
          </div>
        </div>

        {/* GA Top Pages */}
        {topPages.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Top Pages (GA4)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Page</th>
                    <th className="text-right py-2 font-medium">Views</th>
                    <th className="text-right py-2 font-medium">Bounce Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topPages.map((p, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="py-2 text-foreground font-mono text-xs">{p.page}</td>
                      <td className="py-2 text-right font-semibold text-foreground">{p.views}</td>
                      <td className="py-2 text-right text-muted-foreground">{(p.bounce * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSearchPerformance;
