import React, { useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';


function App() {
	const API_KEY = "7Niohy-tMSP05Sye4ow5xZIjwvFQSAP5g9BoVSgg2qI";
	const API_URL = "https://api.unsplash.com/search/photos";
	const [photos, setPhotos] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [modal, setModal] = useState(false);
	const [tempimgSrc, setTempimgSrc] = useState("");
	const getImg = (imgSrc) => {
		setTempimgSrc(imgSrc);
		setModal(true);
	};

	useEffect(() => {
		getPhotos(searchText, page);
	}, [page]);

	const handlePage = (event, value) => {
		setPage(value);
	};

	const getPhotos = async (searchText) => {
		const response = await axios.get(`${API_URL}?query=${searchText}&client_id=${API_KEY}&page=${page}&per_page=20`);
		setPhotos(response.data.results);
		setPageCount(response.data.total_pages);
		console.log(response.data.results);
	};

	const handleSubmit = () => {
		getPhotos(searchText);
		setPage(1);
	};
	return (
		<div className="App bg-black w-full h-auto flex sm:flex-row flex-col">
			<aside className="sm:sticky sm:top-0 w-full h-screen flex flex-col basis-[15%] grow-0 sm:justify-between items-start px-8 text-white">
				<div>
					<h1 className="text-3xl py-8 logo text-[#fca311]">Galleria</h1>
					<p className="py-4 text-gray-300 text-lg">
						A minimal elegant gallery for your art or photos. Search your favourite cuisines, or top wildlife pictures,
						or just browse the latest photos from all over the world.
					</p>

					<div className="py-8 flex gap-2 justify-center">
						<input
							defaultValue={searchText}
							onChange={(event) => setSearchText(event.target.value)}
							placeholder="Search your thoughts..."
							type="text"
							className="block p-2 pl-4 text-md text-gray-900 bg-gray-50 rounded-lg outline-none"
						/>
						<button
							onClick={handleSubmit}
							type="submit"
							class=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
						>
							Search
						</button>
					</div>
				</div>

				<div className="flex flex-col justify-center  gap-4 py-4 text-xl w-full">
					<a href="https://twitter.com/shubh_saur" className="hover:text-blue-200 ease-in-out duration-100">
						Twitter
					</a>
					<div className="h-[1px] w-[100%] bg-[#2A2A2A]"></div>
					<a href="https://www.linkedin.com/in/shubhsaur/" className="hover:text-pink-400 ease-in-out duration-100">
						Instagram
					</a>
					<div className="h-[1px] w-[100%] bg-[#2A2A2A]"></div>
					<a href="mailto:shubhamsaurabh@outlook.com" className="hover:text-blue-600 ease-in-out duration-100">
						Email
					</a>
					<div className="h-[1px] w-[100%] bg-[#2A2A2A]"></div>
				</div>
				<footer>
					<p className="pt-2 text-gray-300 text-lg">Made in India with {"\u2764"}</p>
					<p className="pb-2 text-gray-300 text-[10px]">Copyright {"\u00A9"} Shubham Saurabh</p>
				</footer>
			</aside>

			<main className="basis-[85%] grow-0 flex-col">
				{photos.length === 0 && (
					<div className="text-white flex flex-col justify-center items-center py-24 ">
						<h1 className="text-[#fcf6bd] text-3xl sm:text-6xl font-bold">Welcome To Galleria!</h1>
						<p className="py-8 text-[#e5e5e5] text-base sm:text-lg w-[80%] sm:w-[50%]">
							Getting Inspired by an Art or Photography! Try using Galleria where you could find yours favourite arts or
							photos within one click.
						</p>
						<h2 className="text-[#fcf6bd] text-xl sm:text-3xl font-bold">About Me</h2>
						<p className="py-8 text-[#e5e5e5] text-base sm:text-lg w-[80%] sm:w-[50%]">
							Hi!👋 I'm Shubham, an aspiring Frontend Developer 🧑🏻‍💻 from India. Besides having a full time career in
							IT/Software industry, I also loves to do workouts in gym and read about trending financial stuffs.
						</p>
						<p className=" text-[#e5e5e5] text-base sm:text-lg w-[80%] sm:w-[50%]">
							In my free time, I'm currently exploring my interests around cryptocurrencies and blockchain technologies.
							Check out more of my works{" "}
							<a className="text-blue-300" href="https://github.com/shubhsaur">
								here
							</a>
							.
						</p>
						<div className="py-8 flex flex-col items-center">
							<h2 className="text-[#fcf6bd] text-xl sm:text-3xl font-bold">Tech used in this project</h2>
							<ul className="text-gray-300 text-3xl italic py-8 flex sm:flex-row flex-col gap-4">
								<li className="shadow-inner shadow-[#fca311] p-2">React</li>
								<li className="shadow-inner shadow-[#fca311] p-2">TailwindCSS</li>
								<li className="shadow-inner shadow-[#fca311] p-2">Unsplash API</li>
								<li className="shadow-inner shadow-[#fca311] p-2">Material UI</li>
							</ul>
						</div>
					</div>
				)}

				<div className="flex flex-wrap sm:items-center justify-center sm:px-4 sm:py-4 px-2 py-4 sm:gap-4 gap-2 ">
					{photos.map((photo, index) => {
						return (
							<>
								<div className={modal ? "modal open" : "modal"}>
									<img src={tempimgSrc} alt={photo.alt_description} />
									<CloseIcon fontSize="large" onClick={() => setModal(false)} />
								</div>
								<div
									key={index}
									onClick={() => getImg(photo.urls.regular)}
									className="w-[180px] h-[180px] sm:w-[340px] sm:h-[420px] border-gray-300 border-2 rounded-md zoomEffect"
								>
									<img src={photo.urls.regular} alt={photo.alt_description} className="w-full h-full object-cover" />
								</div>
							</>
						);
					})}
				</div>
				{photos.length > 0 && (
					<div className="self-end w-full px-16 py-8">
						<div className="bg-gray-300 w-full flex justify-center py-4 rounded-md">
							<Stack spacing={2}>
								<Pagination size="medium" color="primary" count={pageCount} page={page} onChange={handlePage} />
							</Stack>
						</div>
					</div>
				)}
			</main>
		</div>
	);
}

export default App;
