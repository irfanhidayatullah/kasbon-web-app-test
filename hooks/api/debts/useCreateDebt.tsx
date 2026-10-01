"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDebtPayload, Debt } from "@/types/debt";
import { createClient } from "@/lib/supabase/client";

export default function useCreateDebt() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDebtPayload): Promise<Debt> => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("User belum login");
      }

      const { data, error } = await supabase
        .from("debts")
        .insert({
          ...payload,
          user_id: user.id,
        })
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
