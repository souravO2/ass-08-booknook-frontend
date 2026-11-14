"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
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

const inputClass =
  "h-11 rounded-[10px] border-[1.5px] border-[#CFC3AA] bg-white px-3.5 text-[15px] text-ink placeholder:text-muted/70 focus-visible:border-forest focus-visible:ring-2 focus-visible:ring-forest/20";

const labelClass = "text-sm font-bold text-ink";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const rules = [
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter", ok: /[a-z]/.test(password) },
    { label: "At least 6 characters", ok: password.length >= 6 },
  ];
  const passwordValid = rules.every((r) => r.ok);

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!passwordValid) {
      toast.error("Your password does not meet the requirements");
      return;
    }

    const form = new FormData(e.currentTarget);
    setSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name: String(form.get("name")).trim(),
        email: String(form.get("email")).trim(),
        password,
        image: String(form.get("image")).trim(),
      });

      if (error) {
        toast.error(error.message || "Could not create your account");
        return;
      }

      toast.success("Account created. Please log in.");
      router.push("/signin");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col lg:flex-row">
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">
        <Card className="w-full max-w-md gap-6 rounded-3xl border border-border bg-white p-2 shadow-none ring-0">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="font-heading text-3xl font-bold text-ink">
              Create your account
            </CardTitle>
            <p className="mt-1 text-muted">
              Join BookNook to add, borrow and return books.
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form onSubmit={handleEmailSignUp}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name" className={labelClass}>
                    Name
                  </FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="email" className={labelClass}>
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="image" className={labelClass}>
                    Photo URL
                  </FieldLabel>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className={inputClass}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password" className={labelClass}>
                    Password
                  </FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    required
                  />
                </Field>

                <Field>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 w-full cursor-pointer gap-2 rounded-full bg-forest font-bold text-white hover:bg-forest-deep disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="size-4 animate-spin" />}
                    {submitting ? "Creating account..." : "Register"}
                  </Button>
                </Field>

                <div className="flex items-center gap-3 text-sm text-muted">
                  <span className="h-px flex-1 bg-[#CFC3AA]" />
                  or
                  <span className="h-px flex-1 bg-[#CFC3AA]" />
                </div>

                <Field>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogle}
                    className="h-12 w-full cursor-pointer gap-2 rounded-full border-[1.5px] border-forest bg-white font-bold text-forest hover:bg-sand hover:text-forest"
                  >
                    <FcGoogle className="size-5" />
                    Continue with Google
                  </Button>
                </Field>

                <FieldDescription className="text-center text-muted">
                  Already a member?{" "}
                  <Link
                    href="/signin"
                    className="font-bold text-forest hover:underline"
                  >
                    Log In
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
