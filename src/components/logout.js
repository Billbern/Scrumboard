import { useState, useEffect } from 'react';


// to handle session deletion
// todo
function Logout() {

    const [timeleft, setTimeleft] = useState(30);
    const [done, setDone] = useState("");

    useEffect(()=>{
        countDown();
    });

    function countDown(){
        let timedOut;
        if(timeleft > 0){
            timedOut = setTimeout(() => {
                setTimeleft(timeleft-1);
            }, 1000);
        }else{
            setDone("Done");
            clearTimeout(timedOut);
        }
    }
    
    return(
        <div className="h-full flex items-center justify-center">
            { done === "Done" ? 
                <h1 className="text-off-gray-dark text-2xl font-bold"> Bye Bye... </h1>
            :
                <h1 className="text-off-gray-dark text-2xl font-bold">logging out in {timeleft} seconds </h1>
            }
        </div>
    );
}

export default Logout;