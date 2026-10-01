"use client";

import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface LoginPayload {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword(payload);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["debts"] });
      toast.success("Login Success");

      router.replace("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export default useLogin;
