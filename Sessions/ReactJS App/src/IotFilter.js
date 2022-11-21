import axios from 'axios';
import { useRef, useState } from 'react';
import DatePicker from 'react-date-picker';
const apiUrl = 'http://localhost:8080';

const IotFilter = () => {

    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2022-11-17'));
    const [endDate, setEndDate] = useState(new Date());
    const sortOrder = useRef(-1);

    const getIotPacket = () => {
        setData([]);
        axios.get(`${apiUrl}/iot?limit=20&sortOrder=${sortOrder.current}&startDate=${startDate}&endDate=${endDate}`).then(res => {
            if (res.status === 200 && res.data && res.data.iotList && res.data.iotList.length) {
                setData(res.data.iotList);
            }
        })
    }

    return (
        <>
            <h1>Welcome to IOT Packet Simulation </h1>
            <div>
                Start Date: <DatePicker onChange={setStartDate} value={startDate} /> &nbsp;&nbsp;&nbsp;
                End Date: <DatePicker onChange={setEndDate} value={endDate} /> &nbsp;&nbsp;&nbsp;
                <button onClick={getIotPacket}>Submit</button>
            </div>
            <br />
            {data.length} Latest Records Shown
            {
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Temperature</th>
                            <th>Battery Level</th>
                            <th>Date & Time <i><button onClick={() => {
                                sortOrder.current = sortOrder.current === -1 ? 1 : -1;
                                getIotPacket();
                            }}>Sort Asc/Desc</button></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length ?
                                data.map(iotPacket => {
                                    return (
                                        <tr>
                                            <td>{iotPacket.temperature}</td>
                                            <td>{iotPacket.batteryLevel}</td>
                                            <td>{iotPacket.timeStamp}</td>
                                        </tr>
                                    )
                                }) :
                                'No Data Found'
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default IotFilter;