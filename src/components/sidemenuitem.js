import { NavLink } from "react-router-dom";

function SideMenuItem({name, link, icon}){
    
    return(
        <div className="w-full">
            {/* Links for the various pages with class & active class */}
            <NavLink className="inline-block w-full py-3" exact to={link} activeClassName="text-white bg-off-blue">
                <div className="flex flex-col items-center justify-center">
                    {icon}
                    {name}
                </div>
            </NavLink>
        </div>
    );
}


export default SideMenuItem;