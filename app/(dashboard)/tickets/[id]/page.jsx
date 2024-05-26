import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";
export const dynamicParams = true; // default val = true

export async function generateMetadata({ params }) {
  const id = params.id;
  const supabase = createServerComponentClient({ cookies });

  const { data: ticket } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();
  return {
    title: `Dojo Helpdesk | ${ticket?.title || "Ticket not found"}`,
  };
}

/* export async function generateStaticParams() {
  const res = await fetch('http://localhost:4000/tickets')

  const tickets = await res.json()
 
  return tickets.map((ticket) => ({
    id: ticket.id
  }))
} */

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }) {
  // const id = params.id
  const ticket = await getTicket(params.id);

  const supabase = createServerComponentClient({
    cookies,
  });

  const { data } = await supabase.auth.getSession();

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session.user.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
