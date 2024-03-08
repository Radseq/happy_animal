import { useSignIn } from "@clerk/nextjs"

export const SignInStep = () => {
	const { isLoaded, signIn } = useSignIn()

	if (!isLoaded) {
		// Handle loading state
		return null
	}

	return <div>The current sign in attempt status is {signIn.status}.</div>
}
