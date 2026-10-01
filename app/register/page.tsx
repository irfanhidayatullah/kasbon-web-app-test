import RegisterPage from "@/features/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:3000/",
  ),
  title: "Kasbon App - Daftar",
};

const Register = () => {
  return (
    <div>
      <RegisterPage />
    </div>
  );
};

export default Register;
