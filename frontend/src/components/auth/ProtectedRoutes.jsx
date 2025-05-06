import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  
  const { authorization, loading } = useAuth();

  if (loading)
    return (
      <div className={"w-100 h-100 d-flex justify-content-center align-items-center"}>
        <div
          className={"spinner-border"}
          style={{width: "3rem", height: "3rem"}}
          role="status"
        >
          <span className={"sr-only"}></span>
        </div>
      </div>
    );

  if (!authorization) return <Navigate to="/" />;

  return children;
}
