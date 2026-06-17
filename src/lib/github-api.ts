import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const OWNER = process.env.GITHUB_REPO_OWNER || "";
const REPO = process.env.GITHUB_REPO_NAME || "";
const BRANCH = process.env.GITHUB_BRANCH || "main";

interface FileResponse {
  content?: string;
  sha?: string;
}

function decodeBase64(content: string): string {
  return Buffer.from(content, "base64").toString("utf-8");
}

function encodeBase64(content: string): string {
  return Buffer.from(content, "utf-8").toString("base64");
}

export async function readData<T>(filePath: string): Promise<T> {
  // If GitHub is not configured, return empty array/object
  if (!OWNER || !REPO || !process.env.GITHUB_TOKEN) {
    return ([] as unknown) as T;
  }

  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: OWNER,
      repo: REPO,
      path: `data/${filePath}`,
      ref: BRANCH,
    });

    const data = response.data as FileResponse;
    if (!data.content) {
      throw new Error("File content is empty");
    }

    const decoded = decodeBase64(data.content);
    return JSON.parse(decoded) as T;
  } catch (error: unknown) {
    const err = error as { status?: number };
    if (err.status === 404) {
      // File doesn't exist yet - return empty array or object
      return ([] as unknown) as T;
    }
    throw error;
  }
}

export async function writeData<T>(filePath: string, data: T): Promise<void> {
  // If GitHub is not configured, skip write silently
  if (!OWNER || !REPO || !process.env.GITHUB_TOKEN) {
    console.warn(`[github-api] writeData skipped for ${filePath} - GitHub not configured`);
    return;
  }

  const path = `data/${filePath}`;
  const content = JSON.stringify(data, null, 2);

  // Get existing file SHA if it exists
  let sha: string | undefined;
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: OWNER,
      repo: REPO,
      path,
      ref: BRANCH,
    });
    sha = (response.data as FileResponse).sha;
  } catch {
    // File doesn't exist yet, no SHA needed
  }

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: OWNER,
    repo: REPO,
    path,
    message: `Update ${filePath} - ${new Date().toISOString()}`,
    content: encodeBase64(content),
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  });
}

export async function readFileSha(filePath: string): Promise<string | undefined> {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: OWNER,
      repo: REPO,
      path: `data/${filePath}`,
      ref: BRANCH,
    });
    return (response.data as FileResponse).sha;
  } catch {
    return undefined;
  }
}
