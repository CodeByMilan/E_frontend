import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { ReactNode } from "react";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.auth);
  const token =user?.token
  const navigate = useNavigate();

  const isAuthenticated = token || localStorage.getItem("token");

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>You need to log in to access this page</h2>
        <button
          style={{
            padding: "10px 20px", 
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/login")}
        >
          Click here to log in
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
