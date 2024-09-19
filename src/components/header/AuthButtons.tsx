"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout as logoutAction } from "../../actions";

const AuthButtons = () => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const logout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      logoutAction(token);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <button
          onClick={logout}
          className="whitespace-nowrap text-sm font-roboto text-[#686f7a] leading-[26px] no-underline flex-shrink-0 ml-[10px] hover:text-black"
        >
          Log out
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="whitespace-nowrap text-sm font-roboto text-[#686f7a] leading-[26px] no-underline flex-shrink-0 ml-[10px] hover:text-black"
        >
          Login
        </button>
      )}
    </>
  );
};

export default AuthButtons;
