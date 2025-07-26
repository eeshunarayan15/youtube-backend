import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const AllUsers = () => {
    const navigate = useNavigate();
const[users, updateUsers] = useState([])
    useEffect(()=>{
      const fetchAllUsers=async ()=>{
try{
  const response = await fetch("http://localhost:3000/read",{
    method:"GET",
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  })
  const data=await response.json();
  updateUsers(data.data);
  console.log(users)
}catch (e) {
  console.error("Error in /read:", e.message);

}
      }
 fetchAllUsers();
        },[])

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const res = await fetch(`http://localhost:3000/delete/${id}`, {
                method: "DELETE",
              
            });
            const response = await res.json();
            console.log(response)
        updateUsers((prev) => prev.filter((user) => user._id !== id));
        } catch (error) {
            
        }
        
    }
    useEffect(() => {
      console.log("Updated user list:", users);
    }, [users]);




    const handleUpdate = async (users) => {
        navigate("/register",{state:users})
      

        
    }
  return (
    <div className=" p-10 flex flex-wrap  gap-9">
      {users.map((val, index) => (
        <div key={index} className="w-52 rounded-lg bg-amber-400 h-72 flex flex-col items-center gap-4">
          <div className="w-32 bg-red-200 h-32 rounded-full mt-5 overflow-hidden">
              <img src={val.imgurl} alt="" />
          </div>
          <div>
            <h1>{val.name}</h1>
            <h1>{val.email}</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>handleUpdate(val)} className="bg-blue-600 px-3 py-[2px] rounded-md">
              edit
            </button>
            <button onClick={()=>handleDelete(val._id)} className="bg-red-400 px-3 py-[2px] rounded-mdd">
              delete user
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
