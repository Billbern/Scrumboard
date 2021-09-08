import moment from "moment";

export default function formatDate(dateTime) {
    if(moment().diff(moment(dateTime), 'days') > 0){
        if(moment().diff(moment(dateTime), 'days') === 1){
            return 'a day ago';    
        }
        return `${moment().diff(moment(dateTime), 'days')} days ago`
    }
    if (moment().diff(moment(dateTime), 'hours') > 0) {
        if(moment().diff(moment(dateTime), 'hours') === 1){
            return 'an hour ago';    
        }
        return `${moment().diff(moment(dateTime), 'hours')} hours ago`
    } 
    if (moment().diff(moment(dateTime), 'minutes') > 0) {
        if(moment().diff(moment(dateTime), 'minutes') === 1){
            return 'a minute ago'    
        }
        return `${moment().diff(moment(dateTime), 'minutes')} minutes ago`
    } 
    if(moment().diff(moment(dateTime), 'seconds') > 0) {
        if(moment().diff(moment(dateTime), 'seconds') === 1){
            return 'a second ago'    
        }
        return `${moment().diff(moment(dateTime), 'seconds')} seconds ago`
    }
}