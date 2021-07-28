import {Component} from 'react';
import InfoBar from '../components/infobar';
import TaskView from '../components/taskview';

class Board extends Component {
    render(){
        return(
            <main className="bg-off-white h-full">
                <div className="py-4 px-8 relative h-full">
                    <InfoBar/>
                    <section className="h-9/10">
                        <div className="h-full grid grid-cols-9 gap-12">
                            <div className="col-span-2">
                                <TaskView name="To do" />
                            </div>
                            <div className="col-span-2">
                                <TaskView name="In progress"/>
                            </div>
                            <div className="col-span-2">
                                <TaskView name="In test / review"/>
                            </div>
                            <div className="col-span-1">
                                <div className="h-full flex justify-center">
                                    <div className="h-full absolute w-10 bg-off-gray-light">
                                        <div className="flex items-center justify-center my-2 py-6">
                                            <button className="transform -rotate-90 text-off-cyan-dark font-semibold">Done</button>
                                        </div>
                                        <div className="flex items-center justify-center m-2 py-6">
                                            <button className="transform -rotate-90 text-yellow-500 font-semibold">Backlog</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <TaskView name="Done"/>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
        )
    }
}


export default Board;