import style from '../style'
import { View, Text, Image, ImageBackground } from "react-native"

export function Splash({ setUpperPopup }) {

    return (
        <ImageBackground source={require('../images/background.webp')} style={style.splash}>
            <Image source={require('../images/logo.webp')} style={style.logo} />
            <View>
                <Text style={style.splashFrom}>From</Text>
                <Text style={style.splashHomeric}>Homeric entertainment</Text>
            </View>
        </ImageBackground>
    )
}