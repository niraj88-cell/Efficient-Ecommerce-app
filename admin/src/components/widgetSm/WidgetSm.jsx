import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../../requestMethod";

export default function WidgetSm() {
  const [users,setUsers]=useState([]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/user/total");
        setUsers(res.data); // Update state with the fetched users
      } catch (err) {
        console.error("Error fetching users:", err); // Log the error for debugging
      }
    };
  
    getUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run once on mount
  
  console.log("users",users);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>


      <ul className="widgetSmList">
      { users.map((user)=>( <li className="widgetSmListItem">
          <img
            src={users.img}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
            <span className="widgetSmUserTitle">{user.email}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>))}
      
      </ul>
    </div>
  );
}
