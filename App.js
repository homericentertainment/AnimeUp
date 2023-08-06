// import Root from './root'
import { Text, I18nManager } from 'react-native'
import 'expo-dev-client'

export default function App() {
  I18nManager.forceRTL(false)
  I18nManager.allowRTL(false)

  Text.defaultProps = {
    ...Text.defaultProps,
    style: { color: 'white' },
  };

  return (<>
    <Text>sdfsdf</Text>
    <Text>sdfsdf</Text>
    <Text>sdfsdf</Text>
    <Text>sdfsdf</Text>
    <Text>sdfsdf</Text>
    <Text style={{color:'black'}}>sdfsdf</Text>
    <Text>sdfsdf</Text></>
  )
}