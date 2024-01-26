import Head from 'next/head';
import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { getAllArticles } from '@/lib/getAllArticles';
import { formatDate } from '@/lib/formatDate';

function Article({ article }) {
  return (
    <article className="p-6 rounded-2xl md:grid md:grid-cols-1 md:items-baseline">
      <Card className="mt-5">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        {/* Ensure the Card.Cta component handles the href prop correctly */}
        <Card.Cta href={`/articles/${article.slug}`}>Read More</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex({ articles }) {
  return (
    <>
      <Head>
        <title>Blogs</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        />
      </Head>
      {/* Provide alternative text for the headings */}
      <SimpleLayout
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <div className="md:border-l md:border-r md:pr-3 md:border-zinc-100 md:pl-3 md:dark:border-zinc-700/40">
          <div className="flex max-w-5xl flex-col space-y-10">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}

export async function getStaticProps() {
  try {
    const articles = (await getAllArticles()).map(({ component, ...meta }) => meta);
    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching contents:", error.message);
    return {
      props: {
        articles: [],
      },
    };
  }
}