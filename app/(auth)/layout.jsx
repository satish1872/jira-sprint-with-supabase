import Link from "next/link";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/dist/server/api-utils";

export default async function AuthLayout({ children }) {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = supabase.auth.getSession();

  if (data?.session) {
    redirect("/");
  }

  return (
    <>
      <nav>
        <h1>Dojo Helpdesk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
