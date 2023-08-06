import React, { useRef, useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, PanResponder, Animated, Dimensions } from 'react-native'
import { Helper } from './helper'
import { service } from '../service'

const totalWidth = Dimensions.get('window').width - 36

export function Swiper({ left, right, onChoice, initialTimer = 15000, display }) {
    const [isHelper, setIsHelper] = useState(false)
    const [widthLeft, setWidthLeft] = useState(totalWidth / 2)
    const [widthRight, setWidthRight] = useState(totalWidth / 2)
    const [zIndexLeft, setZIndexLeft] = useState(90)
    const [zIndexRight, setZIndexRight] = useState(90)
    let timeOut

    useEffect(() => {
        clearTimeout(timeOut)
        timeOut = setTimeout(() => { setIsHelper(true) }, initialTimer)
        return () => clearTimeout(timeOut)
    }, [left])

    const panResponderLeft = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dx > 0) {
                    setWidthLeft(totalWidth / 2 + gesture.dx)
                    setZIndexLeft(100)
                    resetTimer()
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx > totalWidth * 0.3) onChoice(0)
                setWidthLeft(totalWidth / 2)
                setZIndexLeft(0)
            },
        })
    ).current

    const panResponderRight = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dx < 0) {
                    setWidthRight(totalWidth / 2 - gesture.dx)
                    setZIndexRight(100)
                    resetTimer()
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (-gesture.dx > totalWidth * 0.3) onChoice(1)
                setWidthRight(totalWidth / 2)
                setZIndexRight(0)
            },
        })
    ).current

    const resetTimer = () => {
        setIsHelper(false)
        clearTimeout(timeOut)
        timeOut = setTimeout(() => { setIsHelper(true) }, 15000)
    }

    try {
        return (<>
            <View style={{ ...styles.swipeHolder, display: display ? 'flex' : 'none' }}>
                <Animated.View style={[styles.left, { width: widthLeft, zIndex: zIndexLeft }]}{...panResponderLeft.panHandlers}>
                    <Image source={{ uri: left }} style={{ ...styles.left, width: widthLeft }} />
                </Animated.View>
                <Animated.View style={[styles.right, { width: widthRight, zIndex: zIndexRight }]}{...panResponderRight.panHandlers}>
                    <Image source={{ uri: right }} style={{ ...styles.right, width: widthRight }} />
                </Animated.View>
            </View>
            {(isHelper && display) && <Helper panResponderLeft={panResponderLeft} />}
        </>)
    }
    catch (err) {
        console.log(err)
        return <Text>Error</Text>
    }
}

const styles = StyleSheet.create({
    swipeHolder: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        maxWidth: totalWidth
    },
    right: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height: '100%',
        resizeMode: 'cover',
        maxWidth: totalWidth
    },
})
