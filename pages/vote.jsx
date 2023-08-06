import { Image, Text, View, TouchableHighlight, ScrollView } from 'react-native'
import style from '../style'
import { useState, useEffect } from 'react'
import { Error } from './error'
import { Swiper } from '../cmps/swiper'
import { Loader } from '../cmps/loader'
import { service } from '../service'

export function Vote({ user, setUpperPopup, voteState, event, loadCurrentEvent, handleChoice, swiped, setSwiped }) {
    const [error, setError] = useState(false)
    const [saved, setSaved] = useState({})
    const [currentData, setCurrentData] = useState({
        first: {},
        second: {},
        nextFirst: {},
        nextSecond: {},
        d: true
    })

    useEffect(() => {
        loadSaved()
        loadSwiped()
        loadCurrentEvent()
    }, [])

    useEffect(() => {
        try {
            let { currentTier } = voteState
            let first = event.participants[voteState[currentTier][0]]
            let second = event.participants[voteState[currentTier][1]]
            
            let nextFirst, nextSecond
            if (currentTier === Math.log2(voteState.totalParticipants) || currentTier === Math.log2(voteState.totalParticipants) - 1) {
                setCurrentData({
                    first,
                    second,
                    nextFirst: first,
                    nextSecond: second,
                    d: true
                })
                return
            }
            if (voteState[currentTier].length === 2 && voteState[currentTier + 1].length !== 0) {
                console.log('2')
                nextFirst = event.participants[voteState[currentTier + 1][0]]
                nextSecond = event.participants[voteState[currentTier + 1][1]]
            }
            else {
                console.log('3')
                nextFirst = event.participants[voteState[currentTier][2]]
                nextSecond = event.participants[voteState[currentTier][3]]
            }

            let opposite = !currentData.d

            setCurrentData({
                first,
                second,
                nextFirst,
                nextSecond,
                d: opposite
            })
        } catch (error) {

        }
    }, [voteState])

    const onChoice = (pick) => {
        handleChoice(pick)
    }

    const loadSwiped = async () => {
        try {
            const s = await service.loadFromStorage('swiped')
            if (!s) setSwiped(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    async function loadSaved() {
        try {
            const loadedSaved = await service.getSaved(user._id)
            setSaved(loadedSaved)
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }

    const handleSave = async (anime, image, spot, question) => {
        try {
            if (!saved[anime]) {
                const newAnime = await service.saveAnime(user._id, anime, image, spot, question)
                setSaved({ ...saved, [anime]: newAnime })
            }
            else {
                await service.deleteSaved(user._id, anime)
                const s = { ...saved }
                delete s[anime]
                setSaved(s)
            }
        }
        catch {
            setUpperPopup('error')
        }
    }

    const getImage = (idx) => {
        if (idx === 0) return <Image source={require('../images/1.webp')} />
        if (idx === 1) return <Image source={require('../images/2.webp')} />
        if (idx === 2) return <Image source={require('../images/3.webp')} />
    }

    if (error) return <Error />

    if (!voteState) return <Loader />

    if (voteState === 'voted') {
        try {
            const participants = Object.values(event.participants).sort((a, b) => b.votes - a.votes)
            return <ScrollView >
                <View style={style.saved}>
                    {participants.map((p, idx) => <TouchableHighlight underlayColor={style.action} onPress={() => handleSave(p.from, p.animeImage, idx + 1, event.title)} key={p.name} style={{ ...style.leadboardItem, borderColor: saved[p.from] ? '#699BF7' : 'rgba(255,255,255,0.6)' }}><>
                        <View style={style.savedWrapper}>
                            <View >{idx <= 2 ? getImage(idx) : <Text style={{ width: 30, textAlign: 'center', color: 'white' }}>{idx + 1}</Text>}</View>
                            <Image style={style.savedImage} source={{ uri: p.image }} />
                            <View style={style.savedDetails}>
                                <Text style={{ color: 'white', maxWidth: 130 }}>{p.name}</Text>
                                {p.name !== p.from && <Text style={{ opacity: 0.7, color: 'white', fontSize: 14, maxWidth: 130 }}>from {p.from}</Text>}
                            </View>
                        </View>
                        <Image style={style.saveButton} source={saved[p.from] ? require('../images/full.webp') : require('../images/empty.webp')} />
                        <Text>{p.votes} Votes</Text>
                    </></TouchableHighlight>)}
                </View>
            </ScrollView>
        }
        catch (err) {
            console.log('777', err)
            return <Error />
        }
    }

    try {
        return (
            <View style={style.vote}>
                <View style={style.progressWrapper}>
                    <View style={{ ...style.progress, width: `${(voteState.answeredQuestions / voteState.totalQuestions) * 100}%` }}></View>
                </View>
                    <Swiper
                        display={currentData.d}
                        left={currentData.d ? currentData.first.image : currentData.nextFirst.image}
                        right={currentData.d ? currentData.second.image : currentData.nextSecond.image}
                        onChoice={onChoice}
                        initialTimer={swiped ? 15000 : 3000} />
                    <Swiper
                        display={!currentData.d}
                        left={!currentData.d ? currentData.first.image : currentData.nextFirst.image}
                        right={!currentData.d ? currentData.second.image : currentData.nextSecond.image}
                        onChoice={onChoice}
                        initialTimer={swiped ? 15000 : 3000} />
                    <View style={style.randomize} ><Text onPress={() => onChoice(Math.random() > 0.5 ? 0 : 1)} style={style.randomizeText}>Randomize</Text></View>
            </View>
        )
    }

    catch (err) {
        console.log('222', err)
        return <Loader />
    }
}