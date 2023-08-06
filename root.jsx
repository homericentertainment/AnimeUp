import { View, ImageBackground, Image } from 'react-native'
import { Splash } from './pages/splash-screen'
import { Error } from './pages/error'
import { useState, useEffect } from 'react'
import * as Font from 'expo-font'
import style from './style.js'
import { Vote } from './pages/vote'
import { Saved } from './pages/saved'
import { Landing } from './pages/landing'
import { Header } from './cmps/header'
import { Question } from './cmps/question'
import { UpperPopup } from './cmps/upper-popup'
import { service } from './service'

export default function Root() {
    const [user, setUser] = useState(null)
    const [upperPopup, setUpperPopup] = useState('')
    const [page, setPage] = useState('vote')
    const [error, setError] = useState(false)
    const [header, setHeader] = useState('')
    const [miniQuestion, setMiniQuestion] = useState(false)

    const [event, setEvent] = useState(null)
    const [voteState, setVoteState] = useState(null)
    const [swiped, setSwiped] = useState(true)
    

    useEffect(() => {
        loadFont()
        handleUser()
    }, [])

    useEffect(() => {
        if (user) loadCurrentEvent()
    }, [user])

    useEffect(() => {
        if (voteState && voteState.answeredQuestions === voteState.totalParticipants / 2) setMiniQuestion(event.miniQuestion)
    }, [voteState])

    const loadCurrentEvent = async (ev = false) => {
        try {
            let loadedEvent = await service.getCurrentEvent()
            if (!ev) loadedEvent = await service.getCurrentEvent()
            else loadedEvent = ev
            setHeader(loadedEvent.title + '?')
            setEvent(loadedEvent)
            if (loadedEvent.voters[user._id]) {
                setVoteState('voted')
                return
            }
            const prevId = await service.loadFromStorage('prevId')
            if (!voteState) {
                const state = await createNewState(loadedEvent)
                setVoteState(state)
            }
            let state
            if (prevId === loadedEvent._id) {
                const stateFromStorage = await service.loadFromStorage('voteState')
                if (!stateFromStorage) state = createNewState(loadedEvent)
                else state = stateFromStorage
            }
            else {
                state = await createNewState(loadedEvent)
                await service.saveToStorage('prevId', loadedEvent._id)
            }
            setVoteState(state)
        }
        catch (er) {
            console.log('345', er)
            setError(true)
        }
    }

    const createNewState = async (loadedEvent) => {
        try {
            const participants = Object.keys(loadedEvent.participants)
            setVoteState(null)
            let state = {
                currentTier: 1,
                totalParticipants: participants.length,
                1: participants,
                totalQuestions: participants.length - 1,
                answeredQuestions: 0
            }
            for (i = 2; i <= Math.log2(participants.length) + 1; i++) state[i] = []
            await service.saveToStorage('voteState', state)
            return state
        }
        catch (e) {
            console.log('567', e)
            setError(true)
        }
    }

    const handleChoice = async (chosenIdx) => {
        setVoteState(async (prevState) => {
            const currentTier = prevState.currentTier
            if (currentTier === Math.log2(prevState.totalParticipants)) {
                vote(prevState[currentTier][chosenIdx])
                return prevState
            }
            const nextTier = prevState[currentTier + 1]
            nextTier.push(prevState[currentTier][chosenIdx])
            const current = prevState[currentTier].slice(2)
            let tier = prevState.currentTier
            if (current.length === 0) tier++
            const newState = {
                ...prevState,
                [currentTier + 1]: nextTier,
                [currentTier]: current,
                answeredQuestions: prevState.answeredQuestions + 1,
                currentTier: tier
            }
            await service.saveToStorage('voteState', newState)
            if (!swiped) {
                await service.saveToStorage('swiped', 'true')
                setSwiped(true)
            }
            setVoteState(newState)
            return newState
        })
    }

    const vote = async (chosen) => {
        try {
            const newEvent = await service.getCurrentEvent()
            if (event._id != newEvent._id) {
                loadCurrentEvent(newEvent)
                setTimeout(() => setUpperPopup('new-event'), 2000)
                return
            }
            await service.addVote(user._id, chosen, event._Id)
            await service.saveToStorage('prevId', '')
            await service.saveToStorage('voteState', '')
        }
        catch (err) {
            console.log(err)
            setUpperPopup('error')
        }
        finally {
            loadCurrentEvent()
        }
    }

    async function loadFont() {
        await Font.loadAsync({
            'custom-font': require('./assets/Roboto-Medium.ttf')
        })
        const landing = await service.loadFromStorage('landing')
        if (!landing) setPage('landing')
    }

    const handleUser = async () => {
        try {
            const userFromStorage = await service.loadFromStorage('user')
            if (!userFromStorage) {
                const newUser = await service.createUser({ name: 'user' + Math.random() })
                await service.saveToStorage('user', newUser)
                setUser(newUser)
            }
            else setUser(userFromStorage)
        }
        catch (err) {
            console.log(err)
            setError(true)
        }
    }

    if (error) return <Error />

    if (!user || !event || !voteState) return <Splash setUpperPopup={setUpperPopup} />

    try {
        return <ImageBackground source={require('./images/background.webp')} style={style.backImg}>
            {page !== 'landing' && <Header header={header} setPage={setPage} />}
            <View style={style.main}>
                {page === 'saved' && <Saved style={style} user={user} setUpperPopup={setUpperPopup} setPage={setPage} setHeader={setHeader} />}
                {page === 'vote' && <Vote style={style} user={user} swiped={swiped} setSwiped={setSwiped} setHeader={setHeader} setUpperPopup={setUpperPopup} handleChoice={handleChoice} setPage={setPage} loadCurrentEvent={loadCurrentEvent} voteState={voteState} setVoteState={setVoteState} event={event} />}
                {page === 'landing' && <Landing setPage={setPage} />}
            </View>
            <UpperPopup tyle={style} upperPopup={upperPopup} setUpperPopup={setUpperPopup} />
        </ImageBackground>
    }
    catch (err) {
        return <Error />
    }
}         
