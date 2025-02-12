import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Userfollowing() {
    let {userid} = useParams();
    let nav = useNavigate();
  let userData = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState([]);
  


    async function getUser() {
        try {
          let result = await axios.get(
            `${import.meta.env.VITE_API}/api/v1/user/${userid}`,
            {
              headers: {
                Authorization: `Bearer ${userData.token}`, // ✅ Correct Header Format
              },
            }
          );
          setUser(result.data.users.following);
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        getUser();
      }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
        User Following
      </h1>
      <div className="container mx-auto px-4">
        {user.map((user1, index) => (
            <div onClick={()=>{
                nav(`/profile/${user1?._id}`)
            }} key={index} className="flex cursor-pointer flex-col sm:flex-row items-center bg-white rounded-lg shadow-md mb-6 p-4 transition-transform duration-300 hover:scale-[1.01]">
            {/* User Image */}
            <img
              src={user1.imageurl}
              alt={`${user1.name}'s profile`}
              className="w-32 h-32 object-cover rounded-full sm:mr-6 mb-4 sm:mb-0"
            />
            {/* User Details */}
            <div className="text-left">
              <h2 className="text-xl font-bold capitalize text-gray-800 mb-2">{user1.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{user1.email}</p>
              <p className="capitalize text-gray-700">{user1.userdescription}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Userfollowing