import { Text, View, Image, TouchableHighlight, ImageBackground } from 'react-native'
import { useState } from 'react'
import { Menu } from './menu'
import style from '../style'

export function Header({ header, setPage }) {
    const [menu, setMenu] = useState(false)
    navigate = () => {
        if (header === 'My List') setPage('vote')
        else setPage('saved')
    }
    try {
        return (<>
            <ImageBackground style={style.header} source={require('../images/background.webp')}>
                <View style={style.header}>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={() => setMenu(true)} ><Image style={style.menuIcon} source={require('../images/menu.webp')} /></TouchableHighlight>
                    <Text style={style.headerText}>{header}</Text>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={navigate} ><Image style={style.menuIcon} source={header === 'My List' ? require('../images/play.webp') : require('../images/list.webp')} /></TouchableHighlight>
                </View>
            </ImageBackground>
            {menu && <Menu setMenu={setMenu} setPage={setPage} />}
        </>)
    }
    catch (err) {
        console.log(err)
        return <View></View>
    }

}
