import { useContext } from "react";
import { AuthContext } from "@/app/_layout";
export function useAuth(){
    const context = useContext(AuthContext);
    return context;
}