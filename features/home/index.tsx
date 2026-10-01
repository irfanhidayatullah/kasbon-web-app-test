"use client";

import { useMemo, useState } from "react";
import { Inbox, RotateCcw, Search } from "lucide-react";
import SummaryCard from "@/components/SummaryCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDeleteDebt from "@/hooks/api/debts/useDeleteDebt";
import useGetDebt from "@/hooks/api/debts/useGetDebt";
import useUpdateDebt from "@/hooks/api/debts/useUpdateDebt";
import { formatRupiah, relativeDate } from "@/lib/debts/format";
import { Debt, DebtType } from "@/types/debt";
import DebtForm from "./DebtForm";
type DebtStatus = "semua" | "belum" | "lunas";
type DebtTypeFilter = "semua" | DebtType;

export default function HomePage() {
  const { data: debts = [], isLoading, isError, error, refetch } = useGetDebt();
  const updateDebt = useUpdateDebt();
  const deleteDebt = useDeleteDebt();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<DebtTypeFilter>("semua");
  const [status, setStatus] = useState<DebtStatus>("semua");
  const [editing, setEditing] = useState<Debt | null>(null);
  const [deleting, setDeleting] = useState<Debt | null>(null);
  const filteredDebts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("id-ID");
    return debts.filter((debt) => {
      const matchesSearch = debt.counterpart_name
        .toLocaleLowerCase("id-ID")
        .includes(normalizedSearch);
      const matchesType = type === "semua" || debt.type === type;
      const matchesStatus =
        status === "semua" ||
        (status === "lunas" ? Boolean(debt.settled_at) : !debt.settled_at);
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [debts, search, type, status]);
  const summary = useMemo(() => {
    let owedToMe = 0;
    let iOwe = 0;

    debts.forEach((debt) => {
      if (debt.settled_at) {
        return;
      }
      if (debt.type === DebtType.OWED_TO_ME) {
        owedToMe += debt.amount;
      }
      if (debt.type === DebtType.I_OWE) {
        iOwe += debt.amount;
      }
    });
    return {
      owed_to_me: owedToMe,
      i_owe: iOwe,
      net: owedToMe - iOwe,
    };
  }, [debts]);

  const resetFilters = () => {
    setSearch("");
    setType("semua");
    setStatus("semua");
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl p-4 text-center">
        <p className="text-muted-foreground">Memuat data...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl space-y-4 p-4">
        <p role="alert" className="text-destructive">
          {error.message}
        </p>

        <Button variant="outline" onClick={() => refetch()}>
          Coba lagi
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-5 p-4">
      <SummaryCard summary={summary} />
      <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama orang"
              className="pl-10"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Select<DebtType | "semua">
            value={type}
            onValueChange={(value) => {
              if (value !== null) {
                setType(value);
              }
            }}
          >
            <SelectTrigger className="w-full md:w-44">
              <SelectValue>
                {type === "semua"
                  ? "Semua tipe"
                  : type === DebtType.OWED_TO_ME
                    ? "Dihutang"
                    : "Hutang"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua tipe</SelectItem>

              <SelectItem value={DebtType.OWED_TO_ME}>Dihutang</SelectItem>

              <SelectItem value={DebtType.I_OWE}>Hutang</SelectItem>
            </SelectContent>
          </Select>

          <Select<DebtStatus>
            value={status}
            onValueChange={(value) => {
              if (value !== null) {
                setStatus(value);
              }
            }}
          >
            <SelectTrigger className="w-full md:w-44">
              <SelectValue>
                {status === "semua"
                  ? "Semua status"
                  : status === "belum"
                    ? "Belum lunas"
                    : "Lunas"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="semua">Semua status</SelectItem>

              <SelectItem value="belum">Belum lunas</SelectItem>

              <SelectItem value="lunas">Lunas</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={resetFilters}>
            <RotateCcw />
          </Button>
        </div>

        <p className="border-t border-border pt-3 text-xs text-muted-foreground">
          Menampilkan {filteredDebts.length} catatan
        </p>
      </section>

      {/* LIST */}

      <section className="overflow-hidden rounded-2xl border border-border bg-card">
        {filteredDebts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <Inbox className="h-8 w-8 text-muted-foreground" />

            <h2 className="font-heading font-medium">
              Tidak ada catatan ditemukan
            </h2>

            <p className="text-sm text-muted-foreground">
              Tambah catatan baru atau sesuaikan filter.
            </p>

            <Button variant="secondary" onClick={resetFilters}>
              Reset filter
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filteredDebts.map((debt) => (
              <li
                key={debt.id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 space-y-2">
                  <h2 className="break-words font-heading font-semibold">
                    {debt.counterpart_name}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {debt.type === DebtType.OWED_TO_ME
                        ? "Dihutang"
                        : "Saya hutang"}
                    </Badge>

                    <Badge variant={debt.settled_at ? "secondary" : "outline"}>
                      {debt.settled_at ? "Lunas" : "Belum lunas"}
                    </Badge>
                  </div>

                  <p className="text-lg font-semibold">
                    {formatRupiah(debt.amount)}
                  </p>

                  <time
                    dateTime={debt.due_date}
                    className="text-sm text-muted-foreground"
                  >
                    Jatuh tempo: {relativeDate(debt.due_date)}
                  </time>

                  {debt.note && (
                    <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                      Catatan: {debt.note}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {!debt.settled_at && (
                    <Button
                      size="sm"
                      disabled={updateDebt.isPending}
                      onClick={() =>
                        updateDebt.mutate({
                          id: debt.id,

                          settled_at: new Date().toISOString(),
                        })
                      }
                    >
                      Tandai lunas
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditing(debt)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleting(debt)}
                  >
                    Hapus
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* EDIT */}

      {editing && (
        <DebtForm
          key={editing.id}
          debt={editing}
          onClose={() => setEditing(null)}
        />
      )}

      {/* DELETE */}

      {deleting && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open && !deleteDebt.isPending) {
              setDeleting(null);
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hapus catatan?</DialogTitle>

              <DialogDescription>
                Catatan {deleting.counterpart_name} sebesar{" "}
                {formatRupiah(deleting.amount)} akan dihapus permanen.
              </DialogDescription>
            </DialogHeader>

            {deleteDebt.error && (
              <p className="text-sm text-destructive">
                {deleteDebt.error.message}
              </p>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                disabled={deleteDebt.isPending}
                onClick={() => setDeleting(null)}
              >
                Batal
              </Button>

              <Button
                variant="destructive"
                disabled={deleteDebt.isPending}
                onClick={() =>
                  deleteDebt.mutate(deleting.id, {
                    onSuccess: () => setDeleting(null),
                  })
                }
              >
                {deleteDebt.isPending ? "Menghapus..." : "Hapus"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
