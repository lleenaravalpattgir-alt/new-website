import { createFileRoute } from "@tanstack/react-router";
import { AuthorPage } from "./about.author";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder Profile — Leena Raval | Rise Advisory" },
      { name: "description", content: "Founder profile of Leena Raval, strategic business growth advisor and founder of Rise Advisory in Ahmedabad, India." },
    ],
  }),
  component: AuthorPage,
});
