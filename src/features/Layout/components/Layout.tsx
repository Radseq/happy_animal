import { type PropsWithChildren } from "react"
import { Navbar } from "~/features/Navbar"

type LayoutProps = PropsWithChildren //&{}

export const Layout = (props: LayoutProps) => {
	return (
		<main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<Navbar />
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				{props.children}
			</div>
		</main>
	)
}
