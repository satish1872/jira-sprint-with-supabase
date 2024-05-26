"use client";
import React, { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";
function DeleteButton({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    console.log("deleting id: " + id);
    // http://localhost:4000/tickets
   /*  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
    }); */
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets/${id}`, {
      method: "DELETE",
    });


    const json = await res.json();

    if (json.error) {
      console.log(error);
      setIsLoading(false);
    } else {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn-primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <TiDelete />
            Deleting ...
          </>
        ) : (
          <>
            <TiDelete />
            Delete ticket
          </>
        )}
      </button>
    </>
  );
}

export default DeleteButton;
