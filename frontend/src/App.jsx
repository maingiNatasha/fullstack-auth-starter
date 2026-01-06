import ThemeToggle from './ThemeToggle';
import Login  from './Login';

function App() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 dark:bg-gradient-to-r dark:from-blue-950 dark:via-blue-950 dark:to-gray-900 transition-colors'>
			{/* Toggle Button */}
			<ThemeToggle />

			{/* Login Component */}
			<Login />
		</div>
	);
}

export default App;
