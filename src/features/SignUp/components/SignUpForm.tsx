import Link from "next/link"
import { type FC } from "react"

export const SignUpForm: FC<{
	pendingVerification: boolean
	code: string
	setEmailAddress: (email: string) => void
	setPassword: (password: string) => void
	setPasswordRepeat: (passwordRepeat: string) => void
	setCode: (code: string) => void
	onPressVerify: () => Promise<void>
	handleSubmit: () => Promise<void>
}> = ({
	pendingVerification,
	code,
	setEmailAddress,
	setPassword,
	setPasswordRepeat,
	setCode,
	onPressVerify,
	handleSubmit,
}) => {
	return (
		<div>
			<div className="flex min-h-full flex-col justify-center bg-white px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					{/* <img
					className="mx-auto h-10 w-auto"
					src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					alt="Your Company"
				/> */}
					<h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign up and join
					</h2>
				</div>

				<div className=" sm:mx-auto sm:w-full sm:max-w-sm">
					{!pendingVerification && (
						<>
							<form
								className="space-y-6"
								onSubmit={(e) => {
									e.stopPropagation()
									void (async () => {
										await handleSubmit()
									})()
								}}
							>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium leading-6 text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											required
											onChange={(e) => setEmailAddress(e.target.value)}
											className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm 
												ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
												focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Password
										</label>
									</div>
									<div className="mt-2">
										<input
											id="password"
											name="password"
											type="password"
											placeholder="••••••••"
											required
											onChange={(e) => setPassword(e.target.value)}
											className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 
												ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
												focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="confirm-password"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Password Repeat
										</label>
									</div>
									<div className="mt-2">
										<input
											id="confirm-password"
											name="confirm-password"
											type="password"
											placeholder="••••••••"
											required
											onChange={(e) => setPasswordRepeat(e.target.value)}
											className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 
												ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
												focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div>
									<button
										type="submit"
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm 
											font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
											focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Sign up
									</button>
								</div>
							</form>

							<p className="text-center text-sm text-gray-500">
								Already have Account?
								<Link
									href="/signIn"
									className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
								>
									Sign in
								</Link>
							</p>
						</>
					)}
					{pendingVerification && (
						<form
							className="space-y-6"
							onSubmit={() => {
								void (async () => {
									await onPressVerify()
								})()
							}}
						>
							<div>
								<label
									htmlFor="code"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Code
								</label>
								<div className="mt-2">
									<input
										id="code"
										name="code"
										value={code}
										required
										onChange={(e) => setCode(e.target.value)}
										className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm 
											ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
											focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm 
										font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
										focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Verify Email
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}
