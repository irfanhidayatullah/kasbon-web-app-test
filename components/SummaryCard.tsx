import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DebtSummary } from "@/types/debt";
import { formatRupiah } from "@/lib/debts/format";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  summary: DebtSummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <section className="grid gap-5 md:grid-cols-3">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-30 w-30 rounded-bl-full bg-primary/5" />
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Total dihutang ke saya
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold tracking-tight">
          {formatRupiah(summary.owed_to_me)}
        </h3>
        <p className="mt-3 text-xs font-medium text-primary">Piutang</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <div className="pointer-events-none absolute right-0 top-0 h-30 w-30 rounded-bl-full bg-destructive/5" />
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Total saya hutang
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10 text-destructive">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-3xl font-extrabold tracking-tight">
          {formatRupiah(summary.i_owe)}
        </h3>
        <p className="mt-3 text-xs font-medium text-destructive">Hutang</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Net
          </span>

          <Badge variant="secondary">
            {summary.net > 0
              ? "Positif"
              : summary.net < 0
                ? "Negatif"
                : "Seimbang"}
          </Badge>
        </div>

        <h3
          className={cn(
            "text-3xl font-extrabold tracking-tight",
            summary.net > 0 && "text-success",
            summary.net < 0 && "text-destructive",
          )}
        >
          {formatRupiah(summary.net)}
        </h3>

        <p className="mt-3 text-xs font-medium text-muted-foreground">
          Selisih total piutang dan hutang
        </p>
      </div>
    </section>
  );
}
