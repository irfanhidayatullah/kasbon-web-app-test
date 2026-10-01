"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return;
    },
    onSuccess: async () => {
      await queryClient.cancelQueries({ queryKey: ["debts"] });
      queryClient.removeQueries({ queryKey: ["debts"] });
      toast.success("Berhasil keluar");

      router.replace("/login");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export default useLogout;
