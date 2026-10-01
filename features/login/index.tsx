"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { LoginSchema } from "./schemas/LoginSchema";
import useLogin from "@/hooks/api/auth/useLogin";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg">
        <div className="relative h-auto lg:h-auto lg:w-1/2 overflow-hidden">
          <Image
            src="/gambar.webp"
            alt="Login Page Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="eager"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <Card>
            <CardHeader className="mb-6 text-center lg:text-left">
              <CardTitle className="text-2xl font-bold text-center text-primary">
                Selamat Datang Kembali!
              </CardTitle>
              <p className="text-center text-base">Masuk ke Kasbon App</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Alamat email</Label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Alamat email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.email && !!formik.errors.email ? (
                      <p className="text-xs text-destructive">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Kata Sandi"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.password && !!formik.errors.password ? (
                      <p className="text-xs text-destructive">
                        {formik.errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Link
                  href="/register"
                  className=" mt-7 flex justify-start text-sm underline"
                >
                  Daftar?
                </Link>
                <Button
                  type="submit"
                  className="mt-3 w-full"
                  disabled={isLoginPending || formik.isSubmitting}
                >
                  {isLoginPending ? "Proses..." : "Masuk"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
