import React from "react";
import { MainNavbar } from "./MainNavbar";

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <MainNavbar />
      </div>
      <main>{children}</main>
    </div>
  );
}
