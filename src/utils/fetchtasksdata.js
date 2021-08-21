import axios from 'axios';


export default async function getData(addTasks, setEndate, setRewards) {
    try {
        const { data, status } = await axios.get('/tasks');
        if (status === 200 && (data.length > 0)) {
            addTasks(data);
            setEndate();
            setRewards();
        }
    } catch (err) {
        console.error(err);
    }
}