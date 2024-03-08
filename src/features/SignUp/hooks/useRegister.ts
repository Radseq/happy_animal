import { useSignUp } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"
import { type ClerkErrorDef } from "../types"

export const useRegister = () => {
	const { isLoaded, signUp, setActive } = useSignUp()
	const [emailAddress, setEmailAddress] = useState("")
	const [password, setPassword] = useState("")
	const [passwordRepeat, setPasswordRepeat] = useState("")
	const [pendingVerification, setPendingVerification] = useState(false)
	const [code, setCode] = useState("")
	const router = useRouter()

	const getErrorMessage = (error: unknown) => {
		const clerkError: ClerkErrorDef | null = JSON.parse(
			JSON.stringify(error, null, 2),
		) as ClerkErrorDef

		const errMessages: string[] = []
		if (clerkError) {
			console.log(clerkError)

			clerkError.errors.forEach((err) => {
				if (err.meta.paramName === "email_address") {
					errMessages.push("Email address is not valid!")
				} else {
					errMessages.push(err.longMessage)
				}
			})
		} else {
			toast.error("Unknown error, contact with support!")
		}
		if (errMessages.length) {
			toast.error(errMessages.join("\n"))
		}
		return String(error)
	}

	const handleSubmit = async () => {
		if (!isLoaded) {
			return
		}

		if (passwordRepeat !== password) {
			toast.error("Password is different than Password Repeat")
			return
		}

		try {
			await signUp.create({
				emailAddress,
				password,
			})
			// send the email.
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
			// change the UI to our pending section.
			setPendingVerification(true)
		} catch (err) {
			getErrorMessage(err)
		}
	}

	const onPressVerify = async () => {
		if (!isLoaded) {
			return
		}
		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			})
			if (completeSignUp.status !== "complete") {
				/*  investigate the response, to see if there was an error
		   or if the user needs to complete more steps.*/
				console.log(JSON.stringify(completeSignUp, null, 2))
			}
			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				await router.push("/")
			}
		} catch (err) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return {
		pendingVerification,
		code,
		setCode,
		setEmailAddress,
		setPassword,
		onPressVerify,
		setPasswordRepeat,
		handleSubmit,
	}
}
