import { View, Text } from 'react-native'
import { useEffect } from "react"
import style from '../style'

export function UpperPopup({ upperPopup, setUpperPopup }) {
    useEffect(() => {
        if (upperPopup) reset()
    }, [upperPopup])

    const reset = () => {
        setTimeout(() => { setUpperPopup('') }, 4000)
    }

    if (!upperPopup) return <></>

    return (
        <View style={style.upperPopupWrapper}>
            <View style={style.upperPopup}>
                {upperPopup === 'error' && <Text style={style.upperPopupText}>Something went wrong, please try again later.</Text>}
                {upperPopup === 'saved' && <Text style={style.upperPopupText}>Saved!</Text>}
                {upperPopup === 'new-event' && <Text style={style.upperPopupText}>OOPS, it seems we have a new question already.</Text>}
                {upperPopup === 'no-connection' && <Text style={style.upperPopupText}>No internet connection, please try again later.</Text>}
            </View>
        </View>
    )
}