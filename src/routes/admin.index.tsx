import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/")({
  loader: () => {
    const session = getAdminSession();
    if (session) {
      throw redirect({ to: "/admin/dashboard", statusCode: 302 });
    }
    throw redirect({ to: "/admin/login", statusCode: 302 });
  },
  component: () => null,
});
