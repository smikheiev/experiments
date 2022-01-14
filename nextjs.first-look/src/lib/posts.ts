import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "posts");

export type PostData = {
  id: string;
  content: string;
  date: string;
  title: string;
};

export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const postsData = fileNames.map(getPostDataFromFile);
  return sortPostsByDate(postsData);
}

export function getAllPostIds(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(getPostIdFromFilename);
}

export function getPostData(postId: string): PostData {
  const fileName = `${postId}.md`;
  return getPostDataFromFile(fileName);
}

function getPostDataFromFile(fileName: string) {
  const id = getPostIdFromFilename(fileName);
  const fileContent = getFileContent(fileName);
  const data = parseMarkdown(fileContent);
  return {
    id,
    ...data,
  };
}

function getPostIdFromFilename(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function getFileContent(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName);
  return fs.readFileSync(fullPath, "utf8");
}

function parseMarkdown(markdown: string) {
  const { content, data } = matter(markdown);
  return {
    ...(data as Omit<PostData, "id" | "content">),
    content,
  };
}

function sortPostsByDate(postsData: PostData[]) {
  return postsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
