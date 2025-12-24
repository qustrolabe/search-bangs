import { bangs } from "./bang";

export function getRedirectUrl(query: string | null): string | null {
    if (!query) return null;

    const match = query.match(/!(\S+)/i);
    const bangCandidate = match?.[1]?.toLowerCase();

    // Default to "g" (Google) if implicit, assuming that's what was in main.ts
    const defaultBang = bangs.find((b) => b.t === "g");
    const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

    // Remove the first bang from the query
    const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

    // If the query is just `!gh`, use `github.com` instead of `github.com/search?q=`
    if (cleanQuery === "")
        return selectedBang ? `https://${selectedBang.d}` : null;

    const searchUrl = selectedBang?.u.replace(
        "{{{s}}}",
        // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
    );

    return searchUrl ?? null;
}
