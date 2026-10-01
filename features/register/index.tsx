"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { RegisterSchema } from "./schemas/RegisterSchema";

const RegisterPage = () => {
  const { mutateAsync: register, isPending: isRegisterPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register({ email: values.email, password: values.password });
    },
  });
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg">
        <div className="relative h-auto lg:h-auto lg:w-1/2 overflow-hidden">
          <Image
            src="/gambar.webp"
            alt="Register Page Image"
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
                Gabung Kasbon App
              </CardTitle>
              <Link href="/login" className="mt-3 flex justify-center text-sm">
                Sudah punya akun? <span className="pl-2 underline">Masuk</span>
              </Link>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Alamat email</Label>
                    <Input
                      id="email"
                      autoComplete="email"
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
                      id="password"
                      autoComplete="new-password"
                      name="password"
                      type="password"
                      placeholder="Buat kata sandi"
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
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">
                      Konfirmasi kata sandi
                    </Label>
                    <Input
                      id="confirmPassword"
                      autoComplete="new-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Konfirmasi kata sandi"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.confirmPassword &&
                    !!formik.errors.confirmPassword ? (
                      <p className="text-xs text-destructive">
                        {formik.errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mt-10 w-full"
                  disabled={isRegisterPending || formik.isSubmitting}
                >
                  {isRegisterPending ? "Proses..." : "Daftar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
