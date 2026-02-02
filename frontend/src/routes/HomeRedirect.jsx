import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.js";

function HomeRedirect() {
	const { loading, isAuthenticated } = useAuth();

	if (loading) return <div>Loading...</div>;

	return isAuthenticated ? (
		<Navigate to="/home" replace />
	) : (
		<Navigate to="/login" replace />
	);
}

export default HomeRedirect;