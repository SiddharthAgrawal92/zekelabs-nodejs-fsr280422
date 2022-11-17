import axios from 'axios';
import { useEffect, useState } from 'react';
import socketClient from 'socket.io-client';
const socket = socketClient('http://localhost:9000')
const apiUrl = 'http://localhost:8080';

const Iot = () => {

    const [data, setData] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        subscribeIotPacket();
    }, []);

    const subscribeIotPacket = () => {
        setData([]);
        axios.get(`${apiUrl}/iot`).then(res => {
            if (res.status === 200 && res.data && res.data === 'Success') {
                setIsSubscribed(true);
                socket.on('iot-packet', iotPacket => {
                    setData(prevVal => {
                        prevVal = [iotPacket, ...prevVal];
                        return prevVal;
                    })
                })
            }
        })
    }

    return (
        <>
            <h1>Welcome to IOT Packet Simulation </h1>
            {
                isSubscribed
                    ?
                    <button onClick={() => {
                        axios.put(`${apiUrl}/iot`).then(res => {
                            if (res.status === 200 && res.data) {
                                setData(res.data);
                                setIsSubscribed(false);
                            } else {
                                alert('You have not subscribed to IOT packcet yet')
                            }
                        })
                    }}>Cancel Subscription</button>
                    :
                    <button onClick={subscribeIotPacket}>Subscribe</button>
            }
            <br />
            {JSON.stringify(data)}
        </>
    )
}

export default Iot;