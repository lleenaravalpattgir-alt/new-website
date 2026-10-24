import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://ryzeadvisory.co/offers" }],
  }),
  component: () => <Navigate to="/offers" replace />,
});
