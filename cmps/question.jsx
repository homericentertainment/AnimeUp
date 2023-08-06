import { View, Text, Image, TouchableHighlight } from "react-native"
import style from '../style'

export function Question({ miniQuestion, setMiniQuestion }) {
    const submitAnswer = (answer = false) => {
        console.log(miniQuestion)
        if (answer !== miniQuestion.correct) {
            console.log('wrong answer')
        }
        else {
            console.log('correct answer')
        }
        setMiniQuestion(false)
    }

    let answers = miniQuestion.answers
    const rotations = Math.floor(Math.random() * 5)
    for (let i = 0; i < rotations; i++) {
        const element = answers.pop()
        answers.unshift(element)
    }

    return (<>
        <View style={style.screen} onClick={() => submitAnswer()} />
        <View style={style.question}>
            <Image style={style.questionImage} source={{uri:miniQuestion.image}}/>
            <Text style={style.questionText}>Who is that character?</Text>
            {answers.map((a => <TouchableHighlight underlayColor={style.action} onPress={() => submitAnswer(a)} key={a} style={style.answer}>
                <Text style={style.answerText}>{a}</Text>
            </TouchableHighlight>))}
        </View>
    </>)
}