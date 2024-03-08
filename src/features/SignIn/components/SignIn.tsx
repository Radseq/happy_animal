import { SignInForm } from "./SignInForm"
import { useLogin } from "../hooks/useLogin"

export const SignIn = () => {
	const { handleSubmit, setEmailAddress, setPassword } = useLogin()

	return (
		<SignInForm
			handleSubmit={async () => {
				await handleSubmit()
			}}
			setEmailAddress={setEmailAddress}
			setPassword={setPassword}
		/>
	)
}
