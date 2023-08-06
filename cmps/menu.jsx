import style from '../style'
import { useEffect, useRef, useState } from 'react'
import { Animated, View, Text, Dimensions, TouchableHighlight, Image, Linking } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function Menu({ setMenu, setPage }) {
  const slideAnimation = useRef(new Animated.Value(-windowWidth)).current;
  const [close, setClose] = useState(false)

  useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [])

  useEffect(() => {
    if (close) {
      Animated.timing(slideAnimation, {
        toValue: -windowWidth,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setTimeout(() => { setMenu(false) }, 200)
    }
  }, [close])

  const animatedStyle = {
    transform: [{ translateX: slideAnimation }],
    width: windowWidth,
    height: windowHeight,
  };

  return (
    <Animated.View style={[style.menu, animatedStyle]}>
      <View style={style.menuMain}>
        <View style={{ paddingLeft: 20 }}>
          <TouchableHighlight underlayColor={style.action} style={style.menuItem} onPress={() => { setMenu(false); setPage('vote'); }}>
            <>
              <Image style={style.menuIcon} source={require('../images/home.webp')} />
              <Text style={style.menuText}>Home</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={style.action} style={style.menuItem} onPress={() => Linking.openURL('https://www.privacypolicyonline.com/live.php?token=yku2ULyKjWaUHurviHfqNJ2N2MmRKlNz')}>
            <>
              <Image style={style.menuIcon} source={require('../images/privacy.webp')} />
              <Text style={style.menuText}>Privacy policy</Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={style.action} style={style.menuItem} onPress={() => Linking.openURL('https://www.privacypolicyonline.com/live.php?token=gnFj83oLzZ02icwJf8exlq4qMjBLnVid')}>
            <>
              <Image style={style.menuIcon} source={require('../images/privacy.webp')} />
              <Text style={style.menuText}>Terms & conditions</Text>
            </>
          </TouchableHighlight>
        </View>

        <View style={style.menuLine} />
      </View>
      <TouchableHighlight style={style.menuClose} onPress={() => setClose(true)}>
        <Image style={style.closeM} source={require('../images/closeMenu.webp')} />
      </TouchableHighlight>
    </Animated.View>
  );
}
