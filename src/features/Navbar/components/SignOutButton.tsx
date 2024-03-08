import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { type FC } from "react"

export const SignOutButton: FC<{ classes?: string }> = ({ classes }) => {
	const { signOut } = useClerk()
	const router = useRouter()

	return (
		// Clicking on this button will sign out a user and reroute them to the "/" (home) page.
		<button
			className={classes}
			onClick={() =>
				void (async () => {
					await signOut(() => {
						void (async () => {
							await router.push("/")
						})()
					})
				})()
			}
		>
			Sign out
		</button>
	)
}
