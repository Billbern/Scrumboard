import moment from "moment";
import { Component } from "react";
import { connect } from "react-redux";


class LogContainer extends Component {

    render() {
        return (
            <div className="overflow-y-auto pt-4">
                {
                    this.props.state.map((item, key) => {

                        return item.task ? (<div key={key} className="px-4 py-2 mb-2 border-b-2">
                            <div className="text-sm py-0.5">{item.message}</div>
                            <div className="text-xs flex justify-between py-0.5">
                                <span>Task {item.task.id}</span>
                                <span>{moment().diff(moment(item.createAt), 'hours')} hrs ago</span>
                            </div>
                        </div>) : ''

                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        state: state.scrumer.logs
    }
}

export default connect(mapStateToProps,)(LogContainer);