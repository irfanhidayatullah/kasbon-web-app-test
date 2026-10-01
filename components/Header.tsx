"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { PlusCircle, Wallet } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
// import DebtForm from "@/features/home/DebtForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/api/auth/useLogout";
import DebtForm from "@/features/home/DebtForm";

const Header = () => {
  const [creating, setCreating] = useState(false);
  const pathname = usePathname();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-3 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-5">
          <div className="size-12 shrink-0 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <Wallet className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              HutangKu
            </h1>
            <p className="text-muted-foreground">
              Kelola & pantau piutang dan hutang pribadi secara efisien
            </p>
          </div>
        </div>
        {pathname === "/" && (
          <div className="flex gap-5">
            <Button variant="outline" onClick={() => setCreating(true)}>
              <PlusCircle />
              <span>Buat baru</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="shadcn"
                        className="grayscale"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    disabled={isLogoutPending}
                    onClick={() => logout()}
                  >
                    {isLogoutPending ? "Loading..." : "Log out"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {creating && <DebtForm onClose={() => setCreating(false)} />}
      </div>
    </main>
  );
};
export default Header;
