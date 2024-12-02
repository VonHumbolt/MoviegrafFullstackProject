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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useMovieStore } from "@/store";

const formSchema = z.object({
  username: z.string().min(4).max(24),
  email: z.string().email(),
  password: z.string().min(4).max(50),
  passwordAgain: z.string().min(4).max(50),
});

function Signup() {
  const router = useRouter()
  const {addUser} = useMovieStore()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordAgain: "",
    },
  });

  async function onSubmit(values) {
    const response = await fetch("http://localhost:5000/api/user/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json()

    if(response.ok) {
      addUser(json)
      router.push("/")
    }
  }

  return (
    <div className="mt-16 md:mt-32 relative mx-3 md:mx-0">
      <Image
        className="absolute top-1/4 md:-top-1/2 -z-10"
        src={"/signup/signup_bg.png"}
        width={2000}
        height={2000}
      />
      <div
        className="bg-gradient-to-b from-white/10 to-white/5 shadow-md max-w-4xl
         border border-white/5 px-10 md:px-12 py-12 md:py-16 w-full md:w-1/2 mx-auto rounded-xl"
      >
        <h1 className="text-3xl md:text-4xl text-white font-bold text-center mb-4">
          Create Account
        </h1>
        <p className="text-lightGrey font-medium text-center mb-8 xl:w-3/4 mx-auto">
          1000+ films are waiting you. Create account, generate watching lists
          and share with your fellows.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="md:py-5 placeholder:text-lightGrey text-sm md:text-base"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-secondaryOrange" />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="passwordAgain"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="md:py-5 placeholder:text-lightGrey text-sm md:text-base"
                      placeholder="Password again"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage className="text-secondaryOrange" />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox className="bg-background" />
              <label className="text-sm md:text-base font-medium text-lightGrey">
                Accept terms and conditions
              </label>
            </div>
            <Button
              className="bg-white w-full py-6 md:py-7 text-black
              text-base md:text-lg font-semibold shadow-md border hover:bg-primaryDark hover:text-white"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="text-lightGrey text-sm md:text-base mt-6 md:mt-8">
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className="text-white font-semibold underline decoration-secondaryOrange decoration-2">
              Login now!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
