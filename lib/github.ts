export interface GithubRepo {
    name: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
    description: string;
}

export interface GithubCalendar {
    total: number;
    contributions: Array<{
        date: string;
        count: number;
        level: 0 | 1 | 2 | 3 | 4;
    }>;
}

/* Abort controller timeout — prevents hanging forever on slow networks */
function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 8000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
}

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
    try {
        const res = await fetchWithTimeout(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch repos");
        }

        const repos = await res.json();
        return repos.map((repo: any) => ({
            name: repo.name,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language || "Code",
            html_url: repo.html_url,
            description: repo.description,
        }));
    } catch {
        /* Silently return empty array — network may be unavailable */
        return [];
    }
}

export async function getGithubContributions(username: string): Promise<GithubCalendar> {
    try {
        const res = await fetchWithTimeout(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) throw new Error("Failed to fetch contributions");

        const data = await res.json();
        return {
            total: Object.values(data.total).reduce((a: any, b: any) => a + b, 0) as number,
            contributions: data.contributions
        };
    } catch {
        /* Silently return fallback — network may be unavailable */
        return { total: 0, contributions: [] };
    }
}
