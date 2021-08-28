import moment from "moment";
import { Component } from "react";
import { connect } from "react-redux";


class LogContainer extends Component {

    constructor() {
        super();
        this.formatDate = this.formatDate.bind(this);
    }

    formatDate(dateTime) {
        if (moment().diff(moment(dateTime), 'hours') > 0) {
            if(moment().diff(moment(dateTime), 'hours') === 1){
                return 'an hour ago';    
            }
            return `${moment().diff(moment(dateTime), 'hours')} hours ago`
        } else if (moment().diff(moment(dateTime), 'minutes') > 0) {
            if(moment().diff(moment(dateTime), 'minutes') === 1){
                return 'a minute ago'    
            }
            return `${moment().diff(moment(dateTime), 'minutes')} minutes ago`
        } else {
            if(moment().diff(moment(dateTime), 'seconds') === 1){
                return 'a second ago'    
            }
            return `${moment().diff(moment(dateTime), 'seconds')} seconds ago`
        }
    }

    render() {
        return (
            <div className="pt-4">
                {
                    this.props.state.length > 0 ?
                        this.props.state.slice(0, 10).map((item, key) => {

                            return item.task ? (<div key={key} className="px-4 py-2 mb-2 border-b-2">
                                <div className="text-sm py-0.5">{item.message}</div>
                                <div className="text-xs flex justify-between py-0.5">
                                    <span>Task {item.task.id}</span>
                                    <span> {this.formatDate(item.createAt)} </span>
                                </div>
                            </div>) : ''

                        }) :
                        <div className="h-96 flex items-center justify-center">
                            <p className="text-gray-400">no logs yet </p>
                        </div>
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