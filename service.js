import { httpService } from "./http.service"
import AsyncStorage from '@react-native-async-storage/async-storage'

export const service = {
    getUser,
    createUser,
    getSaved,
    saveAnime,
    deleteSaved,
    getCurrentEvent,
    addVote,
    createEvent,
    loadFromStorage,
    saveToStorage,
    imageLink
}

async function getUser(id) {
    const user = await httpService.get('get-user/' + id)
    return user
}

async function createUser(user) {
    const newUser = await httpService.post('create-user', { user })
    return newUser
}

async function getSaved(userId) {
    const saved = await httpService.get('get-saved/' + userId)
    return saved
}

async function saveAnime(id, animeName, image, spot, question) {
    const confirm = await httpService.post('save-anime', { id, animeName, image, spot, question })
    return confirm
}

async function deleteSaved(id, animeName) {
    const confirm = await httpService.delete('delete-saved-anime', { id, animeName })
    return confirm
}

async function getCurrentEvent() {
    const currentEvent = await httpService.get('get-current-event')
    return currentEvent
}

async function addVote(userId, chosen, eventId) {
    const confirm = await httpService.put('vote/' + userId, { chosen, eventId })
    return confirm
}

async function createEvent() {
    const newEvent = await httpService.post('create-event')
    return newEvent
}

async function loadFromStorage(key) {
    const data = await AsyncStorage.getItem(key)
    return JSON.parse(data)
}

async function saveToStorage(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value))
}

function imageLink(link) {
    const idStartIndex = link.lastIndexOf('/');
    const fileId = link.substring(idStartIndex + 1);

    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}


