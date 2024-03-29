import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SignOutButton } from "./SignOutButton"

export const Navbar = () => {
	const { user, isSignedIn } = useUser()
	const [showUserMenu, setShowUserMenu] = useState(false)

	return (
		<nav className="border-gray-200 bg-white dark:bg-gray-900">
			<div className="mx-auto flex max-w-screen-xl  items-center justify-between p-4">
				<Link href={"/home"} className="flex items-center space-x-3 rtl:space-x-reverse">
					<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8"
						alt="Flowbite Logo"
					/>
					<span className="self-center  text-2xl font-semibold dark:text-white">
						Help animals
					</span>
				</Link>

				<div
					className=" w-full items-center justify-between md:order-1 md:flex md:w-auto"
					id="navbar-user"
				>
					<ul
						onMouseLeave={() => setShowUserMenu(false)}
						className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 
                        dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse"
					>
						<li className="m-auto px-3">
							<Link
								href={"/home"}
								className="block rounded bg-blue-700 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
							>
								Home
							</Link>
						</li>
						<li className="m-auto px-3">
							<a
								href="#"
								className="block rounded text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white 
                                    dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
							>
								About
							</a>
						</li>
						{!isSignedIn && !user && (
							<li className="m-auto px-3">
								<Link
									href="/signIn"
									className="block rounded text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white 
                                    dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
								>
									Sign in
								</Link>
							</li>
						)}
						{isSignedIn && user && (
							<li
								className="relative m-auto flex px-3"
								onMouseEnter={() => setShowUserMenu(true)}
								onMouseLeave={() => setShowUserMenu(false)}
							>
								<span className="relative  m-auto">
									{user.emailAddresses[0]?.emailAddress}
								</span>

								<button
									type="button"
									className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:me-0"
									id="user-menu-button"
									aria-expanded="false"
									data-dropdown-toggle="user-dropdown"
									data-dropdown-placement="bottom"
									onClick={() => setShowUserMenu(true)}
									onMouseEnter={() => setShowUserMenu(true)}
								>
									<span className="sr-only">Open user menu</span>
									<Image
										className="size-8 rounded-full"
										src={user.imageUrl}
										alt={"user photo"}
										width={32}
										height={32}
									/>
								</button>
								{showUserMenu && (
									<div
										className="absolute right-0 top-3 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg 
											bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
										id="user-dropdown"
									>
										<ul className="py-2" aria-labelledby="user-menu-button">
											<li className="block truncate px-4 py-2  text-sm text-gray-500 dark:text-gray-400">
												{user.emailAddresses[0]?.emailAddress}
											</li>
											<li>
												<a
													href="#"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
														dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
												>
													Settings
												</a>
											</li>
											{isSignedIn && (
												<li>
													<SignOutButton classes="flex content-start w-full px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-600" />
												</li>
											)}
										</ul>
									</div>
								)}
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}
