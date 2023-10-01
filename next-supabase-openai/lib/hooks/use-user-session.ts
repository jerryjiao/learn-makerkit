import { useContext } from "react";
import UserSessionContext from "@/components/UserSessionContext";
 
function useUserSession() {
  const { session } = useContext(UserSessionContext);
 
  return session;
}
 
export default useUserSession;