import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import staticImageLoader from '../lib/staticImageLoader'

const name = 'Serhii'
export const siteTitle = 'Next.js Sample Website'

type Props = {
  home?: boolean
}

export default function Layout({ children, home }: PropsWithChildren<Props>) {
  return (
    <div className="mt-12 mx-auto mb-24 px-4 py-0 max-w-xl">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className="flex flex-col items-center">
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt={name}
              loader={staticImageLoader}
            />
            <h1 className="text-4xl font-extrabold mx-0 my-4 tracking-tighter">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className="rounded-full"
                  height={108}
                  width={108}
                  alt={name}
                  loader={staticImageLoader}
                />
              </a>
            </Link>
            <h2 className="text-2xl my-4 mx-0">
              <Link href="/">
                <a className="text-inherit">{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>

      <main>{children}</main>

      {!home && (
        <div className="m-0 mt-12">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
