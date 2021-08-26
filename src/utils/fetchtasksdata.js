import axios from 'axios';


async function getData(props) {
    try {
        const { data, status } = await axios.get('/tasks');
        if (status === 200 && (data.length > 0)) {
            props.addTasks(data);
            props.setEndate();
            props.setRewards();
        }
    } catch (err) {
        console.error(err);
    }
}
async function getLogs(props, n=0) {
    try {
        const { data, status } = await axios.get(`/logs/${n}`);
        if (status === 200 && (data.length > 0)) {
            props.addLogs(data);
        }
    } catch (err) {
        console.error(err);
    }
}

export { getData, getLogs };
