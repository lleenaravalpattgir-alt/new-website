import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  submitToIndexNow,
  submitAllPagesToIndexNow,
  getIndexNowKey,
  getIndexNowKeyLocation,
  getAllSiteCanonicalUrls,
  validateAndFilterUrls,
  INDEXNOW_HOST,
} from "@/lib/indexnow";

const SubmissionSchema = z.object({
  urls: z.array(z.string()).optional(),
  url: z.string().optional(),
  submitAll: z.boolean().optional(),
});

export const Route = createFileRoute("/api/public/indexnow")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Key",
          },
        }),

      // GET: Diagnostic & status endpoint
      GET: async () => {
        const key = getIndexNowKey();
        const keyLocation = getIndexNowKeyLocation(key);
        const allUrls = getAllSiteCanonicalUrls();

        return Response.json({
          service: "IndexNow API Submission Manager",
          host: INDEXNOW_HOST,
          keyLocation,
          totalIndexableUrls: allUrls.length,
          status: "ready",
          documentation: "https://www.indexnow.org/documentation",
          supportedEngines: ["Microsoft Bing", "Yandex", "Naver", "Seznam"],
        });
      },

      // POST: Submit new, updated, or batch URLs to IndexNow
      POST: async ({ request }) => {
        // Optional secret protection if configured in environment
        const configuredSecret = process.env.INDEXNOW_SUBMIT_SECRET || process.env.ADMIN_SECRET;
        if (configuredSecret) {
          const clientSecret =
            request.headers.get("x-admin-key") ||
            request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
          if (clientSecret !== configuredSecret) {
            return Response.json(
              { error: "Unauthorized: Invalid or missing administration key." },
              { status: 401 },
            );
          }
        }

        let body: z.infer<typeof SubmissionSchema>;
        try {
          const raw = await request.json();
          body = SubmissionSchema.parse(raw);
        } catch {
          return Response.json(
            { error: "Invalid request payload. Expected { urls?: string[], url?: string, submitAll?: boolean }" },
            { status: 400 },
          );
        }

        // Mode 1: Submit all pages in sitemap
        if (body.submitAll) {
          const result = await submitAllPagesToIndexNow();
          return Response.json(result, { status: result.success ? 200 : result.statusCode || 500 });
        }

        // Mode 2: Specific list of URLs
        const targetUrls: string[] = [];
        if (body.url) targetUrls.push(body.url);
        if (body.urls && Array.isArray(body.urls)) targetUrls.push(...body.urls);

        if (targetUrls.length === 0) {
          return Response.json(
            { error: "No URLs provided. Provide 'url', 'urls', or set 'submitAll: true'." },
            { status: 400 },
          );
        }

        // Validate that all URLs strictly belong to ryzeadvisory.co
        const { validUrls, rejected } = validateAndFilterUrls(targetUrls);
        if (validUrls.length === 0) {
          return Response.json(
            {
              error: "All submitted URLs were rejected. URLs must belong to https://ryzeadvisory.co/.",
              rejected,
            },
            { status: 422 },
          );
        }

        const result = await submitToIndexNow(validUrls);
        return Response.json(
          {
            ...result,
            rejected: rejected.length > 0 ? rejected : undefined,
          },
          { status: result.success ? 200 : result.statusCode || 500 },
        );
      },
    },
  },
});
