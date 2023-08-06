import { useEffect, useRef, useState } from "react"
import { View, Image, Animated } from 'react-native'

export function Helper() {
  const topImageRef = useRef(null)
  const bottomImageRef = useRef(null)
  const translateYValue = useRef(new Animated.Value(0)).current
  const translateXValue = useRef(new Animated.Value(0)).current
  const opacityValue = useRef(new Animated.Value(0)).current
  const [isSecondImageVisible, setSecondImageVisible] = useState(false)

  useEffect(() => {
    const fadeAnimation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    })

    const moveUpAnimation = Animated.timing(translateYValue, {
      toValue: -20,
      duration: 300,
      useNativeDriver: true,
    })

    const moveRightAnimation = Animated.timing(translateXValue, {
      toValue: 170,
      duration: 1000,
      useNativeDriver: true,
    })

    const animate = () => {
      fadeAnimation.start(() => {
        moveUpAnimation.start(() => {
          setSecondImageVisible(true)
          moveRightAnimation.start(() => {
            setSecondImageVisible(false)
            // Reset the animated values for the next animation loop
            opacityValue.setValue(0)
            translateYValue.setValue(0)
            translateXValue.setValue(0)
            animate()
          })
        })
      })
    }

    animate()
  }, [opacityValue, translateYValue, translateXValue])

  return (
    <View pointerEvents="none" style={{ width: 60, height: 70, position: "absolute", top: 200, left: 50 }} >
      <Animated.View
        style={{
          transform: [{ translateY: translateYValue }, { translateX: translateXValue }],
          opacity: opacityValue,
        }}
      >
        <Image
          ref={topImageRef}
          source={require('../images/pointer.webp')}
          style={{ width: 70, height: 70, position: 'absolute', top: 20 }}
        />
        {isSecondImageVisible && (
          <Image
            ref={bottomImageRef}
            source={require('../images/swipe.webp')}
            style={{ width: 70, height: 70, position: 'absolute', top: 0, right: 20 }}
          />
        )}
      </Animated.View>
    </View>
  )
}
