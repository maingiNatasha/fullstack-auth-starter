import { useState, useEffect } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

function ThemeToggle () {
    const [isDarkMode, setIsDarkMode] = useState(() => {
		// Check local storage first
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) return savedTheme === "dark";
	
		// Check system preference
		return window.matchMedia("prefers-color-scheme: dark").matches;
	});

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

    return (
        <div className='absolute top-4 left-4'>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className='mb-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition'>
                {isDarkMode ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
            </button>
        </div>
    )
}

export default ThemeToggle;