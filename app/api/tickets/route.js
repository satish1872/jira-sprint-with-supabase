import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const ticket = await request.json();

  /* get supbase instance */
  const supabase = createRouteHandlerClient({ cookies });

  /* get the current user session */
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* insert data into supbase */
  const { data, error } = await supabase
    .from("Tickets")
    .insert({
      ...ticket,
      user_email: session?.user?.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}

/* export async function GET() {
  const res = await fetch('http://localhost:4000/tickets')

  const tickets = await res.json()

  return NextResponse.json(tickets, {
    status: 200
  })
} */

/* export async function POST(request) {
  const ticket = await request.json()

  const res = await fetch('http://localhost:4000/tickets', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(ticket)
  })

  const newTicket = await res.json()

  return NextResponse.json(newTicket, {
    status: 201
  })
} */
