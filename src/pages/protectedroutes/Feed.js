import { Component } from "react";
import { connect } from "react-redux";
import BoardHead from "../../components/boardhead";
import HistoChart from "../../components/charts/histogram";
import PieChart from "../../components/charts/piechart";

// display history of user actions
class Feed extends Component {


    render() {

        return (
            <main className="relative bg-off-white h-full">
                <div className="py-4 px-12 h-full">
                    {/* display global state data on all tasks */}
                    <BoardHead select="text" />
                    <section className="h-sub">
                        <div className="h-full grid grid-cols-8 gap-12 pb-12">
                            
                            <div className="col-span-6">
                                <div className="h-full flex flex-col gap-8">
                                    <div className="h-1/2 flex justify-between gap-12">
                                        <div className="w-1/2 h-full bg-white border-2 border-off-gray-light rounded-lg">
                                            <PieChart />
                                        </div>
                                        <div className="w-1/2 h-full bg-white border-2 border-off-gray-light rounded-lg">
                                            <HistoChart />
                                        </div>
                                    </div>
                                    <div className="h-1/2 bg-white border-2 border-off-gray-light rounded-lg">

                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="h-full">
                                    <div className="h-full border-2 border-off-gray-light bg-white h-full rounded-lg">

                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </section>

                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.scrumer.tasks
    }
}

export default connect(mapStateToProps, )(Feed);