import React from "react";

export default function Extension({
	image,
	name,
	description,
	isDark,
	active,
	onStatusChange,
	handleRemove,
}) {
	return (
		<div
			className={`p-3 ${
				isDark ? "bg-neutral-700 text-white" : "bg-white"
			} rounded-2xl outline outline-neutral-600 w-[400px]`}
		>
			<div className='flex flex-row gap-3'>
				<img src={image} alt='extension-icon' />
				<div className=''>
					<h2 className='text-lg font-bold'>{name}</h2>
					<p className={`${isDark ? "text-neutral-300 " : "text-neutral-600"}`}>
						{description}
					</p>
				</div>
			</div>
			<div className='flex justify-between items-center mt-4'>
				<button
					className={`rounded-4xl px-3 py-1 font-semibold outline outline-neutral-600 cursor-pointer
     ${isDark ? "bg-neutral-800 hover:bg-red-700" : "bg-white"} transition-all`}
					onClick={() => handleRemove(name)}
				>
					Remove
				</button>

				<label className='relative p-1 border-gray-300 text-center cursor-pointer'>
					<input
						type='checkbox'
						className='sr-only peer'
						checked={active}
						onChange={() => onStatusChange(name)}
					/>
					<div className='w-8 h-4 bg-neutral-600 rounded-full peer peer-checked:bg-red-500 transition-all' />
					<span className='dot absolute left-1 top-1 size-4 bg-white rounded-full transition-transform ease-in-out peer-checked:translate-x-5' />
				</label>
			</div>
		</div>
	);
}
