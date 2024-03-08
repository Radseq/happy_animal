import { useClerk } from "@clerk/nextjs"
import { useRouter } from "next/router"

export const SignOutButton = () => {
	const { signOut } = useClerk()
	const router = useRouter()

	return (
		// Clicking on this button will sign out a user and reroute them to the "/" (home) page.
		<button
			className=" text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white"
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
