import SideMenuItem from "./sidemenuitem";

function SideMenu(){
    return(
        <div className="w-24 text-sm h-full bg-off-gray-light">
            <ul>
                <li>
                    <SideMenuItem name="Board" link="/"/>
                </li>
                <li>
                    <SideMenuItem name="Feed" link="/feed"/>
                </li>
                <li>
                    <SideMenuItem name="Settings" link="/settings"/>
                </li>
                <li>
                    <SideMenuItem name="Logout" link="/logout"/>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;