import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/Date'
import Layout, { siteTitle } from '../components/Layout'
import { getSortedPostsData, PostData } from '../lib/posts'

type Props = {
  postsData: PostData[]
}

export default function Home({ postsData }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="text-lg">
        <p>{"Hello, I'm Serhii."}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className="text-lg pt-[1px]">
        <h2 className="text-2xl mx-0 my-4">Blog</h2>
        <ul className="m-0 p-0 list-none">
          {postsData.map(({ id, date, title }) => (
            <li className="m-0 mb-5" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="text-gray-500">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const postsData = getSortedPostsData()
  return {
    props: {
      postsData,
    },
  }
}
