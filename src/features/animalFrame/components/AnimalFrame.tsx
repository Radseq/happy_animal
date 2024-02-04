import React, { useEffect, useRef, useState } from "react"

const maxFrameHeight = 148 // Maximum height for the ul element

export const AnimalFrame: React.FC<{ incomeItems: string[]; animalImage: string }> = ({
	incomeItems,
	animalImage,
}) => {
	const [items, setItems] = useState<string[]>(incomeItems)
	const ulRef = useRef<HTMLUListElement>(null)
	const [shownMore, setShowMore] = useState<boolean>(false)

	useEffect(() => {
		const updateHeight = () => {
			if (ulRef.current && !shownMore) {
				const currentHeight = ulRef.current.clientHeight

				if (currentHeight > maxFrameHeight) {
					setItems((prevItems) => prevItems.slice(0, items.length - 1))
				}
			}
		}

		updateHeight()
	}, [items, ulRef, setItems, shownMore])

	const handleShowMore = () => {
		setShowMore(true)
		setItems(incomeItems)
	}

	return (
		<article className="flex min-h-96 w-72 flex-col justify-between rounded-lg border-4 border-gray-300 bg-white ">
			<header>
				<img src={animalImage} alt="animal image" className="m-auto" />
				<h1 className="m-2 text-center text-3xl font-bold">Blacky</h1>
			</header>
			<ul ref={ulRef} className="flex h-full flex-wrap content-start">
				{items.map((item, index) => (
					<li key={index} className="mx-2 my-1 flex-col rounded-lg bg-slate-400 p-1">
						{item}
					</li>
				))}
			</ul>
			{!shownMore && (
				<button className="mr-2 grid h-6 justify-items-end" onClick={handleShowMore}>
					Show More
				</button>
			)}
		</article>
	)
}
