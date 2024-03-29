import { useSignUp } from "@clerk/nextjs"

export const SignUpStep = () => {
	const { isLoaded, signUp } = useSignUp()

	if (!isLoaded) {
		// Handle loading state
		return null
	}

	return <div>The current sign up attempt status is {signUp.status}.</div>
}
