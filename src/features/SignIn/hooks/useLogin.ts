import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"
import { type ClerkErrorDef } from "~/features/SignUp/types"

export const useLogin = () => {
	const { isLoaded, signIn, setActive } = useSignIn()
	const [emailAddress, setEmailAddress] = useState("")
	const [password, setPassword] = useState("")

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

		try {
			const result = await signIn.create({
				identifier: emailAddress,
				password,
			})

			if (result.status === "complete") {
				console.log(result)
				await setActive({ session: result.createdSessionId })
				await router.push("/")
			} else {
				/*Investigate why the login hasn't completed */
				console.log(result)
			}
		} catch (err) {
			getErrorMessage(err)
		}
	}
	return { handleSubmit, setPassword, setEmailAddress }
}
