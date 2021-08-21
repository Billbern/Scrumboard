import { useState } from "react";
import FeedIcon from "./icons/feed";
import TasksIcon from "./icons/tasks";
import SettingIcon from "./icons/settings";
import SideMenuItem from "./sidemenuitem";


function SideMenu() {
    // menu for accessing pages
    const [sideitems] = useState([
        { name: "Feed", link: "/", icon: <FeedIcon /> },
        { name: "Tasks", link: "/tasksboard", icon: <TasksIcon/> },
        { name: "Settings", link: "/settings", icon: <SettingIcon/> }
    ]);
    return (
        <div className="w-full text-sm h-full">
            <ul>
                {
                    sideitems.map((item, key) => {
                        return <li key={key}>
                                    <SideMenuItem name={item.name} link={item.link} icon={item.icon} />
                                </li>
                    })
                }

            </ul>
        </div>
    );
}


export default SideMenu;