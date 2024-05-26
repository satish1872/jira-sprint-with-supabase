import Navbar from "@/app/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  console.log(cookies);

  const { data, error } = await supabase.auth.getSession();
  console.log(data);

  if (!data?.session) {
    redirect("/login");
  }

  if (error) {
    // Handle error, such as displaying an error message or redirecting to login page
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar user={data?.session?.user} />{" "}
      {/* Optional chaining to handle null values */}
      {children}
    </>
  );
}

/* // components
export default async function DashboardLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });
  console.log(cookies);

  const { data } = await supabase.auth.getSession();
  console.log(data);

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  );
}
 */
