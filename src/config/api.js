import { ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";

const globalFetch = async ({endpoint = '', body = '', method = 'GET', headers = { 'Content-Type': 'application/json' }}) => {
    const response = await fetch(`https://apptest.hizlirandevu.com.tr/api${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body)
    })

    const data = await response.json()

        
        Toast.show(data.message, {
            duration: Toast.durations.SHORT,
        });

    return data
}

export default globalFetch