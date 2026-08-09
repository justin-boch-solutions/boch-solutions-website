"use client";

import { useEffect } from "react";
import { company } from "@/lib/constants";

export function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%c👋 Hey, schön dass du reinschaust!",
      "font-size:16px;font-weight:bold;color:#8c52ff;",
    );
    console.log(
      "%cDu verstehst offensichtlich Code – vielleicht auch die IT eines Handwerksbetriebs?",
      "font-size:13px;color:#5ce0e6;",
    );
    console.log(
      `%cLust auf ein Projekt? ${company.email}`,
      "font-size:12px;color:#9aa3b2;",
    );
  }, []);

  return null;
}
