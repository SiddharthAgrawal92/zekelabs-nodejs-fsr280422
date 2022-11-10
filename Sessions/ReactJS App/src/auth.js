import axios from "axios";

const Auth = () => {
    let access_token = null;

    const setAccessToken = (token, expiresIn) => {
        access_token = token;
        // refreshAccessToken(expiresIn);
        return true;
    }

    const getAccessToken = () => {
        return access_token;
    }

    const deleteAccessToken = () => {
        access_token = null;
        return true;
    }

    const refreshAccessToken = (expiresIn) => {
        setTimeout(() => {
            axios.get('http://localhost:8080/auth/refresh', { headers: { authorization: access_token } }).then(res => {
                if (res.status === 200 && res.data && res.data.access_token && res.data.expiresIn) {
                    setAccessToken(res.data.access_token, res.data.expiresIn);
                }
            })
        }, expiresIn - 10000);
    }

    return {
        setAccessToken,
        getAccessToken,
        deleteAccessToken
    }
}

export default Auth();