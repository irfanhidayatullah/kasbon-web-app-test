"use client";

import { useQuery } from "@tanstack/react-query";
import { Debt } from "@/types/debt";
import { createClient } from "@/lib/supabase/client";

export default function useGetDebt() {
  const supabase = createClient();
  return useQuery({
    queryKey: ["debts"],

    queryFn: async (): Promise<Debt[]> => {
      const { data, error } = await supabase
        .from("debts")
        .select("*")
        .order("due_date", {
          ascending: true,
        });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });
}
