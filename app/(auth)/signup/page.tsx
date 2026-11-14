"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

const SignUpPage = () => {
  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      image: string;
    };
    const { data, error } = await authClient.signUp.email({
      ...userData,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      redirect("/");
    }
  };

  const handleGoogle = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto px-4 my-5">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name" className="text-ink font-semibold">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-white h-12"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="imgUrl" className="text-ink font-semibold">
                  Image URL
                </FieldLabel>
                <Input
                  id="imgUrl"
                  name="imgUrl"
                  type="url"
                  placeholder="Image Link"
                  className="bg-white h-12"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-ink font-semibold">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  className="bg-white h-12"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className="text-ink font-semibold"
                  >
                    Password
                  </FieldLabel>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="bg-white h-12"
                  required
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className={`text-white bg-forest rounded-2xl hover:bg-forest-deep cursor-pointer font-semibold h-12`}
                >
                  Register
                </Button>
              </Field>
              <div className="flex justify-center">Or</div>
              <Field>
                <Button
                  variant="outline"
                  className={`h-12 font-semibold rounded-2xl cursor-pointer text-ink hover:bg-forest-deep hover:text-white`}
                  type="button"
                  onClick={handleGoogle}
                >
                  <FaGoogle />
                  Login with Google
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already a member? <Link href="/signin">Log In</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
