import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <p>lorem ipsum</p>

      <h2>
        <Link href="/">
          Back to Home
        </Link>
      </h2>
    </Layout>
  )
}