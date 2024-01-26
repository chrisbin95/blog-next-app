import Head from 'next/head'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import { SimpleLayout } from '@/components/SimpleLayout'

// Import statements

// Import statements

function ArticleCard({ article }) {
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
        <Link href={`/articles/${article.slug}`} passHref>
          <Card.Cta>Read More</Card.Cta>
        </Link>
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
function SocialLink({ icon: Icon, href, ...props }) {
  return (
    <Link href={href} passHref legacyBehavior>
      {/* Use the correct `a` prop on the Link component */}
      <a className="group -m-1 p-1" {...props}>
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>
    </Link>
  );
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>blog-next-app</title>
        <meta
          name="description"
          content="Blog website description"
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Welcome to My Blog
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Explore a world of insights, stories, and knowledge. Stay updated with the latest trends and discoveries in technology, lifestyle, and more.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="#"
              label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="#"
              label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="#"
              label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="#"
              label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>

      <SimpleLayout>
        <div className="md:border-l md:border-r md:pr-3 md:border-zinc-100 md:pl-3 md:dark:border-zinc-700/40">
          <div className="flex max-w-5xl flex-col space-y-10">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
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
    console.error("Error fetching articles:", error.message);
    return {
      props: {
        articles: [],
      },
    };
  }
}