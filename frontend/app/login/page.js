"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(50),
});

function Login() {

  const router = useRouter()
  const {addUser, loadMoviesFromDb} = useMovieStore()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json()

    if(response.ok) {
      addUser(json)
      loadMoviesFromDb(json.watchingList)
      router.push("/")
    }
  }

  return (
    <div className="mt-16 md:mt-32 relative mx-3 md:mx-0">
      <Image
        className="absolute -top-1/5 md:-top-1/4 -z-10 mx-auto"
        src={"/login/login_bg.png"}
        width={2000}
        height={2000}
      />
      <div
        className="bg-gradient-to-b from-white/10 to-white/5 shadow-md max-w-4xl
         border border-white/5 px-10 md:px-12 py-12 md:py-16 w-full md:w-1/2 mx-auto rounded-xl"
      >
        <h1 className="text-3xl md:text-4xl text-white font-bold text-center mb-10">
          Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="md:py-5 placeholder:text-lightGrey text-sm md:text-base"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-secondaryOrange" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="md:py-5 placeholder:text-lightGrey text-sm md:text-base"
                      placeholder="Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-secondaryOrange" />
                </FormItem>
              )}
            />
            <Button
              className="bg-white w-full py-6 md:py-7 text-black
              text-base md:text-lg font-semibold shadow-md border hover:bg-primaryDark hover:text-white"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
        <p className="text-lightGrey text-sm md:text-base mt-6 md:mt-8">
          Don't have an account?{" "}
          <Link href={"/signup"}>
            <span className="text-white font-semibold underline decoration-secondaryOrange decoration-2">
              Sign up now!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
