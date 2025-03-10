// Updated: actions/users.js (Frontend)
export const submitUserDetails = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", { // Updated URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit user details");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return { error: error.message };
    }
};