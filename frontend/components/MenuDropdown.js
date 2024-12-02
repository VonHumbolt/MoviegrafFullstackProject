import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivityIcon, ArrowUpNarrowWide, HouseIcon, LogIn, LogOut, MenuIcon, Pencil, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store";

function MenuDropdown({ user }) {

  const { removeUser, clearMovieStore } = useMovieStore();

  const router = useRouter()

  const logout = () => {
      removeUser()
      clearMovieStore()
      router.push("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MenuIcon size={24} className="md:hidden cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href={"/"}>
            <DropdownMenuItem className="cursor-pointer">
                <HouseIcon />
              <span>Home</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/"}>
            <DropdownMenuItem className="cursor-pointer">
                <ArrowUpNarrowWide />
              <span>Top 250 Movies</span>
            </DropdownMenuItem>
          </Link>
          <Link href={"/"}>
            <DropdownMenuItem className="cursor-pointer">
                <ActivityIcon />
              <span>Best Reviews</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {Object.keys(user).length > 0 ? (
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer"onClick={logout}>
              <LogOut />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <LogIn />
              <span>Login</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Pencil />
              <span>Sign Up</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MenuDropdown;
