import glob from 'fast-glob';
import * as path from 'path';

async function importArticle(articleFilename) {
  try {
    const { meta, default: component } = await import(
      `../pages/articles/${articleFilename}`
    );

    return {
      slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
      ...meta,
      component,
    };
  } catch (error) {
    console.error(`Error importing article: ${articleFilename}`, error);
    throw error; // Rethrow the error to propagate it up
  }
}

export async function getAllArticles() {
  try {
    const articlesDirectory = path.join(process.cwd(), 'src/pages/articles');

    const articleFilenames = await glob(['*.mdx', '*/index.mdx'], {
      cwd: articlesDirectory,
    });

    const articles = await Promise.all(articleFilenames.map(importArticle));

    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error getting all articles', error);
    throw error; // Rethrow the error to propagate it up
  }
}
