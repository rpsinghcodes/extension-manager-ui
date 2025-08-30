import React, { useMemo, useState } from "react";
import Extension from "./Extension";
import data from "./data.json";

const DARK = "dark";
const LIGHT = "light";

function App() {
	const [theme, setTheme] = useState(LIGHT);
	const isAvailable = useMemo(
		() => data.filter((item) => item.isActive === true),
		[]
	);
	const notAvailable = useMemo(
		() => data.filter((item) => item.isActive === false),
		[]
	);
	const isDark = theme === DARK;
	const textColor = theme === DARK ? "text-white" : "text-neutral-900";
	const [selectedExtension, setSelectedExtension] = useState("all");
	const [filteredData, setFilteredData] = useState({
		isAvailable,
		notAvailable,
		all: data,
	});
	const handleButtonStyle = (group) => {
		return `rounded-4xl px-3 py-1 font-semibold
     ${
				selectedExtension === group
					? " bg-red-500 hover:bg-red-700 "
					: isDark
					? "bg-neutral-800 text-white"
					: "bg-white"
			} transition-all`;
	};

	const handleAvailability = (name) => {
		const index = filteredData["all"].findIndex((item) => item.name === name);

		if (filteredData["all"][index].isActive === true) {
			const updatedExtension = filteredData["all"][index];
			updatedExtension.isActive = !updatedExtension.isActive;
			const updatedIsAvailable = filteredData["isAvailable"].filter(
				(item) => item.name !== name
			);
			filteredData["notAvailable"].push(updatedExtension);
			const updatedNotAvailable = filteredData["notAvailable"];
			const updatedAllExtensions = filteredData["all"].map((item) =>
				item.name === name ? { ...item, isActive: false } : item
			);
			setFilteredData({
				isAvailable: updatedIsAvailable,
				notAvailable: updatedNotAvailable,
				all: updatedAllExtensions,
			});
		} else {
			// when the extension is disabled
			const updatedExtension = filteredData["all"][index];
			updatedExtension.isActive = true;
			const updatedNotAvailable = filteredData["notAvailable"].filter(
				(item) => item.name !== name
			);
			filteredData["isAvailable"].push(updatedExtension);
			const updatedIsAvailable = filteredData["isAvailable"];
			const updatedAllExtensions = filteredData["all"].map((item) =>
				item.name === name ? { ...item, isActive: true } : item
			);
			setFilteredData({
				isAvailable: updatedIsAvailable,
				notAvailable: updatedNotAvailable,
				all: updatedAllExtensions,
			});
		}
	};

	const removeExtension = (name) => {
		const index = filteredData["all"].findIndex((item) => item.name === name);
		const updatedAllExtensions = filteredData["all"].filter(
			(item) => item.name !== name
		);
		let updatedIsActive = filteredData["isAvailable"];
		let updatedNotAvailable = filteredData["notAvailable"];
		if (filteredData["all"][index].isActive === true) {
			updatedIsActive = filteredData["isAvailable"].filter(
				(item) => item.name !== name
			);
		} else {
			updatedNotAvailable = filteredData["notAvailable"].filter(
				(item) => item.name !== name
			);
		}
		setFilteredData({
			isAvailable: updatedIsActive,
			notAvailable: updatedNotAvailable,
			all: updatedAllExtensions,
		});
	};

	return (
		<div
			className={`${
				theme === DARK
					? "bg-[linear-gradient(180deg,#040918_0%,#091540_100%)] "
					: "bg-[linear-gradient(180deg,#ebf2fc_0%,#eef8f9_100%)] "
			}  p-10 min-h-[100vh]`}
		>
			<div
				className={`w-full flex justify-between items-center ${
					isDark ? "bg-neutral-800" : "bg-white"
				} rounded-2xl p-3`}
			>
				<div className='h-[30px]'>
					<img
						src='images/logo.svg'
						alt='logo'
						className={`size-full ${theme === DARK ? "fill-white" : ""}`}
					/>
				</div>
				<button
					onClick={() =>
						setTheme((prev) => {
							return prev === DARK ? LIGHT : DARK;
						})
					}
				>
					<div>
						<img
							src={
								theme === DARK ? "images/icon-sun.svg" : "images/icon-moon.svg"
							}
							className={`size-full ${
								isDark
									? "bg-[hsl(226,11%,37%)] hover:bg-[hsl(0,0%,78%)]"
									: "hover:bg-[hsl(226,11%,37%)] bg-[hsl(0,0%,78%)]"
							} p-3 rounded-xl transition-all`}
							alt='moon-logo'
						/>
					</div>
				</button>
			</div>
			{/* Extensions list nav */}
			<div className='flex flex-col  justify-between items-center mt-12 mb-8 md:flex-row'>
				<h1 className={`${textColor} text-3xl font-bold mb-4 md:mb-0`}>
					Extensions List
				</h1>
				<div className='flex gap-3 '>
					<button
						onClick={() => {
							setSelectedExtension("all");
						}}
						className={handleButtonStyle("all")}
					>
						All
					</button>
					<button
						onClick={() => {
							setSelectedExtension("isAvailable");
						}}
						className={handleButtonStyle("isAvailable")}
					>
						Active
					</button>
					<button
						onClick={() => {
							setSelectedExtension("notAvailable");
						}}
						className={handleButtonStyle("notAvailable")}
					>
						Inactive
					</button>
				</div>
			</div>

			{/* Extensions */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center  max-w-[1300px] mx-auto'>
				{filteredData[selectedExtension].map(
					({ logo, description, name, isActive }) => (
						<Extension
							key={name}
							image={logo}
							description={description}
							name={name}
							isDark={isDark}
							active={isActive}
							onStatusChange={(args) => handleAvailability(args)}
							handleRemove={(args) => removeExtension(args)}
						/>
					)
				)}
			</div>
		</div>
	);
}

export default App;
