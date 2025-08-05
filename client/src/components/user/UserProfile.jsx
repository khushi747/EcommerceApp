import { useUserDetails } from "../../context/user/UserDetailsContext";
import { backendUrl } from "../../shared";
const UserProfile = () => {
  const { isUserLoggedIn, isAdmin, setIsUserLoggedIn, setIsAdmin } =
    useUserDetails();
  const handleLogoutClick = () => {
    // Logic for logging out the user
    fetch(`${backendUrl}logoutUser`, {
      method: "GET",
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (response.ok) {
          setIsUserLoggedIn(false);
          setIsAdmin(false);
          console.log("User logged out");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h1>User Profile</h1>
      <div className="  cursor-pointer" onClick={() => handleLogoutClick()}>
        <a className="btn">Log out</a>
      </div>
    </div>
  );
};

export default UserProfile;
