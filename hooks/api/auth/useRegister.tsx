"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RegisterPayload {
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp(payload);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["debts"] });
      toast.success("Akun berhasil dibuat");
      router.replace("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export default useRegister;
