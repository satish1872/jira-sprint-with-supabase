"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    const supabaseLogoutRes = await supabase.auth.signOut();
    console.log(supabaseLogoutRes);
    if (!supabaseLogoutRes.error) {
      router.push("/login");
    } else {
      console.log(supabaseLogoutRes.error);
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
