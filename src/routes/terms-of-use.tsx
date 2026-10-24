import { createFileRoute } from "@tanstack/react-router";
import { TermsAndConditionsPage } from "./terms-and-conditions";

export const Route = createFileRoute("/terms-of-use")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Rise Advisory" },
      { name: "description", content: "Terms of use governing website access and advisory services with Rise Advisory." },
      { property: "og:title", content: "Terms of Use | Rise Advisory" },
      { property: "og:url", content: "https://ryzeadvisory.co/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/terms-and-conditions" }],
  }),
  component: TermsAndConditionsPage,
});
