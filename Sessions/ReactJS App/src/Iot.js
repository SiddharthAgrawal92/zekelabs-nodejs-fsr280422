import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import socketClient from 'socket.io-client';
const socket = socketClient('http://localhost:9000');
const apiUrl = 'http://localhost:8080';

const Iot = () => {

    const [data, setData] = useState([]);
    const sortOrder = useRef(-1);

    useEffect(() => {
        getIotPacket();
        socket.on('new-iot-value', values => {
            if (values && values.length) {
                setData(prevVal => {
                    prevVal = [...values, ...prevVal];
                    // uncomment this code if total records has to be shown as latest 20 always
                    // if (prevVal.length > 20) {
                    //     //index no. 19 --> record no. 20
                    //     prevVal.splice(20, (prevVal.length - 20));
                    // }
                    return prevVal;
                });
            }
        })
    }, []);

    const getIotPacket = () => {
        setData([]);
        axios.get(`${apiUrl}/iot?limit=20&sortOrder=${sortOrder.current}`).then(res => {
            if (res.status === 200 && res.data && res.data.iotList && res.data.iotList.length) {
                setData(res.data.iotList);
            }
        })
    }

    return (
        <>
            <h1>Welcome to IOT Packet Simulation </h1>
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

export default Iot;