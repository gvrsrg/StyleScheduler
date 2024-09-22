import { useState, useEffect, useContext } from "react";
import axios from "axios";

const Home = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      const response = await axios.get(`${baseURL}/api/users`, {
        headers: {
            "x-access-token": "token"
        },
        withCredentials: true,
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <h2>home</h2>
      {users.map((item) => {
        return(
          <div key={item.id}>
            {item.id} {item.phoneNumber}
          </div>
        );
      })}
    </>
  );
};
export default Home;
