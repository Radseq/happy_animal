import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

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
						className="dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse"
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
								className="md:p-0·md:hover:bg-transparent·md:hover:text-blue-700·dark:border-gray-700·dark:text-white·dark:hover:bg-gray-700·dark:hover:text-white"
							>
								About
							</a>
						</li>
						{!isSignedIn && !user && (
							<li className="m-auto px-3">
								<Link
									href="/signIn"
									className="md:p-0·md:hover:bg-transparent·md:hover:text-blue-700·dark:border-gray-700·dark:text-white·dark:hover:bg-gray-700·dark:hover:text-white"
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
									className="md:me-0·dark:focus:ring-gray-60 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300"
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
										onMouseLeave={() => setShowUserMenu(false)}
										className="absolute right-0 top-3 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
										id="user-dropdown"
									>
										<div className="px-4 py-3">
											<span className="block text-sm text-gray-900 dark:text-white">
												{user.fullName}
											</span>
											<span className="block truncate  text-sm text-gray-500 dark:text-gray-400">
												{user.emailAddresses[0]?.emailAddress}
											</span>
										</div>
										<ul className="py-2" aria-labelledby="user-menu-button">
											<li>
												<a
													href="#"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
												>
													Settings
												</a>
											</li>
											{isSignedIn && (
												<li className="block px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-600"></li>
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
