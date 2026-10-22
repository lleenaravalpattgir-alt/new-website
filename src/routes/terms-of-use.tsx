import { createFileRoute } from "@tanstack/react-router";
import { TermsAndConditionsPage } from "./terms-and-conditions";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Rise Advisory" },
      { name: "description", content: "Terms of use governing website access and advisory services with Rise Advisory." },
    ],
  }),
  component: TermsAndConditionsPage,
});
