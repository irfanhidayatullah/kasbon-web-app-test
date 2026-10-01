"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Debt, UpdateDebtPayload } from "@/types/debt";
import { createClient } from "@/lib/supabase/client";

interface UpdateDebtParams extends UpdateDebtPayload {
  id: number;
}

export default function useUpdateDebt() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateDebtParams): Promise<Debt> => {
      const { data, error } = await supabase
        .from("debts")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["debts"],
      });
    },
  });
}
