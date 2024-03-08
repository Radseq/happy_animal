import { SignUpForm } from "./SignUpForm"
import { useRegister } from "../hooks/useRegister"

export const SignUp = () => {
	const {
		code,
		handleSubmit,
		onPressVerify,
		pendingVerification,
		setCode,
		setEmailAddress,
		setPassword,
		setPasswordRepeat,
	} = useRegister()

	return (
		<SignUpForm
			pendingVerification={pendingVerification}
			code={code}
			setEmailAddress={setEmailAddress}
			setPassword={setPassword}
			setCode={setCode}
			onPressVerify={async () => {
				await onPressVerify()
			}}
			handleSubmit={async () => {
				await handleSubmit()
			}}
			setPasswordRepeat={setPasswordRepeat}
		/>
	)
}
