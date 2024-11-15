import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { account } from "../../appwrite/appwriteConfig";

export default function OAuthCallback() {
  const history = useHistory();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const session = await account.getSession(); // Get the session after redirect
        console.log("OAuth session:", session);
        // Handle session (store in local state or redirect)
        history.push("/dashboard"); // Redirect to the user's dashboard or home page
      } catch (error) {
        console.error("OAuth callback error:", error.message);
      }
    };

    handleOAuthCallback();
  }, [history]);

  return (
    <div>
      <h2>Logging in...</h2>
    </div>
  );
}
