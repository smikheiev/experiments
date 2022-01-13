import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostData = {
  id: string;
  date: string;
  title: string;
};

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const postsData = fileNames.map(getPostDataFromFile);
  return sortPostsByDate(postsData);
}

function getPostDataFromFile(fileName: string) {
  const id = fileName.replace(/\.md$/, "");
  const fileContent = getFileContent(fileName);
  const markdownMetadata = parseMarkdownMetadata(fileContent);
  return {
    id,
    ...markdownMetadata,
  };
}

function getFileContent(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName);
  return fs.readFileSync(fullPath, "utf8");
}

function parseMarkdownMetadata(markdown: string) {
  return matter(markdown).data as Omit<PostData, "id">;
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
