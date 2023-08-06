import { Text, View, Image,TouchableHighlight } from 'react-native'
import style from '../style'
import { service } from '../service'
export function Landing({ setPage }) {

    const endLanding = async () => {
        try {
            await service.saveToStorage('landing', 'true')
            setPage('vote')
        }
        catch (err){
            console.log(err)
            setPage('vote')
        }
    }

    return (
        <View style={style.landing}>
            <Image style={style.landingImg} source={require('../images/landing.webp')} />
            <Text style={style.landingTxt}>Share your anime opinion</Text>
            <TouchableHighlight onPress={endLanding} style={style.play}><Text style={{ fontSize: 30, ...style.words }}>Play</Text></TouchableHighlight>
        </View>
    )
}
