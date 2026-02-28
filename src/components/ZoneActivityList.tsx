import { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Shield, Clock, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ZoneActivityList as ZoneActivityListType } from "@/data/zoneActivities";

interface Props {
  data: ZoneActivityListType;
}

const ZoneActivityListComponent = ({ data }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showApprovalOnly, setShowApprovalOnly] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let items = data.activities;

    if (selectedCategory) {
      items = items.filter((a) => a.category === selectedCategory);
    }

    if (showApprovalOnly) {
      items = items.filter((a) => a.thirdParty && a.thirdParty !== "N/A");
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.code.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    return items;
  }, [data.activities, search, selectedCategory, showApprovalOnly]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((a) => {
      const arr = map.get(a.category) || [];
      arr.push(a);
      map.set(a.category, arr);
    });
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    data.activities.forEach((a) => {
      counts.set(a.category, (counts.get(a.category) || 0) + 1);
    });
    return counts;
  }, [data.activities]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="text-muted-foreground">
          <strong className="text-foreground">{data.totalActivities}</strong> licensed activities
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">
          <strong className="text-foreground">{data.categories.length}</strong> categories
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">
          Last updated: {data.lastUpdated}
        </span>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
              !selectedCategory
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-muted-foreground border-border hover:border-accent/40"
            }`}
          >
            All ({data.activities.length})
          </button>
          {data.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                selectedCategory === cat
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-muted-foreground border-border hover:border-accent/40"
              }`}
            >
              {cat} ({categoryCounts.get(cat) || 0})
            </button>
          ))}
        </div>

        {/* Filter toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowApprovalOnly(!showApprovalOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-all ${
              showApprovalOnly
                ? "bg-accent/10 text-accent border-accent/30"
                : "bg-card text-muted-foreground border-border hover:border-accent/40"
            }`}
          >
            <Shield className="h-3 w-3" />
            Requires approval
          </button>
          {search || selectedCategory || showApprovalOnly ? (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
                setShowApprovalOnly(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all filters
            </button>
          ) : null}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing <strong className="text-foreground">{filtered.length}</strong> of {data.activities.length} activities
        {grouped.length > 0 && ` across ${grouped.length} categories`}
      </div>

      {/* Activity list by category */}
      <div className="space-y-2">
        {grouped.map(([category, activities]) => (
          <Collapsible
            key={category}
            open={expandedCategories.has(category) || !!search || !!selectedCategory}
            onOpenChange={() => toggleCategory(category)}
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card hover:bg-secondary/30 transition-all group">
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm text-foreground">{category}</span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {activities.length}
                </Badge>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-1 border border-border rounded-lg overflow-hidden bg-card">
                {/* Table header */}
                <div className="hidden sm:grid sm:grid-cols-[100px_1fr_180px_80px] px-4 py-2 bg-secondary/30 text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                  <span>Code</span>
                  <span>Activity</span>
                  <span>Approval</span>
                  <span>Timing</span>
                </div>
                {/* Rows */}
                {activities.map((activity, i) => (
                  <div
                    key={`${activity.code}-${i}`}
                    className={`px-4 py-2.5 text-sm flex flex-col sm:grid sm:grid-cols-[100px_1fr_180px_80px] gap-1 sm:gap-0 items-start sm:items-center ${
                      i < activities.length - 1 ? "border-b border-border/50" : ""
                    } hover:bg-secondary/20 transition-colors`}
                  >
                    <span className="font-mono text-xs text-muted-foreground">{activity.code}</span>
                    <span className="text-foreground leading-snug">
                      {activity.name}
                      {activity.dnfbp && (
                        <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 bg-destructive/10 text-destructive text-[10px] rounded font-medium">
                          DNFBP
                        </span>
                      )}
                      {activity.esr && (
                        <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 bg-primary/10 text-primary text-[10px] rounded font-medium">
                          ESR
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {activity.thirdParty && activity.thirdParty !== "N/A"
                        ? activity.thirdParty
                        : "—"}
                    </span>
                    <span>
                      {activity.approvalTiming === "PRE" && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-destructive/10 text-destructive text-[10px] rounded font-medium">
                          <Clock className="h-2.5 w-2.5" /> PRE
                        </span>
                      )}
                      {activity.approvalTiming === "POST" && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] rounded font-medium">
                          <Clock className="h-2.5 w-2.5" /> POST
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No activities match your search.</p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
                setShowApprovalOnly(false);
              }}
              className="text-xs text-accent hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground border-t border-border pt-4">
        <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <p>
          This activity list is extracted from official Meydan Free Zone documentation and covers{" "}
          {data.totalActivities} activities. Availability may change. Always confirm with the authority before proceeding.
        </p>
      </div>
    </div>
  );
};

export default ZoneActivityListComponent;
