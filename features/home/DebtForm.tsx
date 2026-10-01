"use client";

import { useFormik } from "formik";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useCreateDebt from "@/hooks/api/debts/useCreateDebt";
import useUpdateDebt from "@/hooks/api/debts/useUpdateDebt";
import { DebtSchema } from "./schemas/CreateDebtSchema";
import { today } from "@/lib/debts/format";
import { Debt, DebtType } from "@/types/debt";
interface DebtFormProps {
  debt?: Debt;
  onClose: () => void;
}

export default function DebtForm({ debt, onClose }: DebtFormProps) {
  const createDebt = useCreateDebt();
  const updateDebt = useUpdateDebt();

  const formik = useFormik({
    initialValues: {
      type: debt?.type ?? DebtType.OWED_TO_ME,
      counterpart_name: debt?.counterpart_name ?? "",
      amount: debt ? String(debt.amount) : "",
      due_date: debt?.due_date.slice(0, 10) ?? today(),
      note: debt?.note ?? "",
    },
    validationSchema: DebtSchema,
    onSubmit: async (values) => {
      const payload = {
        type: values.type,
        counterpart_name: values.counterpart_name.trim(),
        amount: Number(values.amount),
        due_date: values.due_date,
        note: values.note.trim() || null,
      };

      if (debt) {
        await updateDebt.mutateAsync({
          id: debt.id,
          ...payload,
        });
      } else {
        await createDebt.mutateAsync(payload);
      }
      onClose();
    },
  });

  const isLoading = createDebt.isPending || updateDebt.isPending;
  const error = createDebt.error ?? updateDebt.error;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !isLoading) {
          onClose();
        }
      }}
    >
      <DialogContent
        className="max-h-[90dvh] overflow-y-auto"
        showCloseButton={!isLoading}
      >
        <DialogHeader>
          <DialogTitle>{debt ? "Ubah" : "Buat baru"}</DialogTitle>

          <DialogDescription>Catat piutang / hutang pribadi</DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Tipe</Label>
            <RadioGroup
              value={formik.values.type}
              onValueChange={(value) => formik.setFieldValue("type", value)}
            >
              <div className="flex items-center gap-3 mt-1">
                <RadioGroupItem id="owed-to-me" value={DebtType.OWED_TO_ME} />
                <Label htmlFor="owed-to-me">Saya dihutang</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem id="i-owe" value={DebtType.I_OWE} />
                <Label htmlFor="i-owe">Saya hutang</Label>
              </div>
            </RadioGroup>

            {formik.touched.type && formik.errors.type && (
              <p className="text-xs text-destructive">{formik.errors.type}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="counterpart_name">Nama orang</Label>
            <Input
              id="counterpart_name"
              name="counterpart_name"
              value={formik.values.counterpart_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={200}
            />
            {formik.touched.counterpart_name &&
              formik.errors.counterpart_name && (
                <p className="text-xs text-destructive">
                  {formik.errors.counterpart_name}
                </p>
              )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min={1}
              step={1}
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-xs text-destructive">{formik.errors.amount}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="due_date">Tanggal</Label>
            <Input
              id="due_date"
              name="due_date"
              type="date"
              value={formik.values.due_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.due_date && formik.errors.due_date && (
              <p className="text-xs text-destructive">
                {formik.errors.due_date}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Catatan</Label>
            <Input
              id="note"
              name="note"
              value={formik.values.note}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={200}
            />
            {formik.touched.note && formik.errors.note && (
              <p className="text-xs text-destructive">{formik.errors.note}</p>
            )}
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error.message}
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={onClose}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
