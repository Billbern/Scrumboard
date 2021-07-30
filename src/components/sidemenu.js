import { useState } from "react";
import SideMenuItem from "./sidemenuitem";

function SideMenu(){
    // menu for accessing pages
    const [sideitems] = useState([
            {name: "Board", link: "/"}, 
            {name: "Feed", link: "/feed"}, 
            {name: "Settings", link: "/settings"}, 
            {name: "Logout", link: "/logout"}
        ]);
    return(
        <div className="w-full text-sm h-full bg-off-gray-light">
            <ul>
                {
                    sideitems.map((item, key)=>{
                       return <li key={key}><SideMenuItem name={item.name} link={item.link}/></li>
                    })
                }
                
            </ul>
        </div>
    );
}

export default SideMenu;