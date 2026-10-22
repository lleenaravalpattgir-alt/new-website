import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  component: () => <Navigate to="/offers" replace />,
});
