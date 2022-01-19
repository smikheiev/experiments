import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'

type Props = {
  postData: PostData
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article className="prose">
        <h1 className="text-4xl font-extrabold mx-0 my-4 tracking-tighter">{postData.title}</h1>
        <div className="text-gray-500">
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const postIds = getAllPostIds()
  const paths = postIds.map((id) => ({
    params: { id },
  }))
  return {
    paths,
    fallback: false,
  }
}

type QueryParams = {
  id: string
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<QueryParams>): Promise<GetStaticPropsResult<Props>> {
  const { id } = params ?? {}
  const postData = getPostData(id!)
  const contentHtml = await convertMarkdownToHtml(postData.content)
  return {
    props: {
      postData: {
        ...postData,
        content: contentHtml,
      },
    },
  }
}

async function convertMarkdownToHtml(markdown: string) {
  return remark()
    .use(remarkHtml)
    .process(markdown)
    .then((res) => res.toString())
}
