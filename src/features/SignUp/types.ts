export type ClerkErrorDef = {
	status: number
	clerkError: boolean
	errors: ClerkError[]
}

export type ClerkError = {
	code: string
	message: string
	longMessage: string
	meta: Meta
}

export type Meta = {
	paramName: string
}
