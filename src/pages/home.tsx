import { type GetServerSidePropsContext, type PreviewData } from "next"
import Head from "next/head"
import { getAuth } from "@clerk/nextjs/server"
import { Layout } from "~/features/Layout"
import { type ParsedUrlQuery } from "querystring"

export const getServerSideProps = (
	props: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) => {
	const { userId } = getAuth(props.req)

	if (!userId) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}

const Home = () => {
	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"></div>
			</Layout>
		</>
	)
}

export default Home
