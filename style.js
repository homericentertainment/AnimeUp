import { Dimensions } from "react-native"
import { StyleSheet } from "react-native"

const back = 'rgba(105,155,247,0.4)'
const action = '#699BF7'
const words = 'white'

const style = StyleSheet.create({
  action,
  back,
  words,
  main: {
    minHeight: Dimensions.get('window').height - 100,
    boxSizing: "border-box",
    color: words,
    marginTop: 100,
  },
  backImg: {
    width: Dimensions.get('window').width + 1,
    height: '100%',
    overflow: 'hidden',
  },
  menu: {
    position: 'absolute',
    top: -20,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 100,
    display: 'flex',
    flexDirection: 'row',
    zIndex: 2,
    marginTop: 50,
  },
  menuMain: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height,
    backgroundColor: '#151729',
    paddingTop: 20,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
    marginBottom: 20,
  },
  menuLine: {
    width: '100%',
    height: 1,
    backgroundColor: action,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menuText: {
    color: words,
    opacity: 0.6,
    fontSize: 16
  },
  menuClose: {
    height: Dimensions.get('window').height,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeM: {
    width: 30,
    height: 30,
  },
  splash: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 100,
    backgroundColor: '#168903',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingBottom: 150,
    paddingTop: '40%',
  },
  splashFrom: {
    color: words,
    fontSize: 22,
    textAlign: 'center',
  },
  splashHomeric: {
    color: action,
    fontSize: 26,
    textAlign: 'center',
  },
  vote: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    height: '90%',
    paddingLeft: 18,
    paddingRight: 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingBottom: 20,
  },
  randomize: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    backgroundColor: back,
  },
  randomizeText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: words,
  },
  progressWrapper: {
    width: '100%',
    height: 20,
    borderRadius: 10,
    backgroundColor: back,
    marginBottom: 20
  },
  progress: {
    height: 20,
    borderRadius: 10,
    minWidth: 20,
    backgroundColor: action,
  },
  leadboardItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,

  },
  saveButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 30,
    height: 30,
  },
  saved: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    paddingLeft: 18,
    paddingRight: 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 25,
    paddingBottom: 20,
  },
  savedItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savedImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  savedWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7
  },
  savedDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 0,
    minHeight: 50,
  },
  savedName: {
    fontSize: 18,
    color: words,
    fontWeight: 'bold',
    maxWidth: 200
  },
  loaderText: {
    fontSize: 18,
    color: words,
    textAlign: 'center',
    padding: 20
  },
  savedSpot: {
    fontSize: 14,
    color: words,
    opacity: 0.5,
  },
  remove: {
    opacity: 0.5,
    fontSize: 14,
    color: words,
  },
  noSaved: {
    fontSize: 18,
    color: words,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 20
  },
  header: {
    backgroundImage: 'url(./images/background.webp)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    paddingTop: 50,
    zIndex: 1,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    fontSize: 20,
    color: words,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  error: {
    marginTop: 140,
  },
  errorText: {
    fontSize: 20,
    color: words,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorImage: {
    width: 140,
    height: 140,
    margin: 'auto',
    marginBottom: 25,
    alignSelf: 'center',
  },
  underline: {
    textDecorationLine: "underline",
  },
  hidden: {
    display: "none",
  },
  screen: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: "100%",
    opacity: 0.5,
    backgroundColor: "black",
    zIndex: 10,
  },
  question: {
    position: "absolute",
    zIndex: 100,
    top: Dimensions.get('window').height / 2 - 200,
    height: 400,
    borderRadius: 20,
    left: 0,
    width: "100%",
    backgroundColor: 'rgb(105,155,247)'
  },
  questionImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  questionText: {
    color: words,
    fontSize: 20,
    textAlign: "center",
    paddingLeft:20,
    paddingRight:20,
  },
  landing: {
    color: words,
  },
  landingImg: {
    width: '100%',
    height: parseInt(Dimensions.get('window').width * 47 / 39),
  },
  landingTxt: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: words,
  },
  play: {
    width: '85%',
    backgroundColor: action,
    borderRadius: 10,
    margin: 'auto',
    padding: 10,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  upperPopupWrapper: {
    position: "absolute",
    zIndex: 1000,
    top: 40,
    borderRadius: 10,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  upperPopup: {
    width: "90%",
    padding: 10,
    backgroundColor: action,
    zIndex: 1000,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
  },
  upperPopupText: {
    color: words,
    fontSize: 20,
    textAlign: "center",
  },
  words: {
    color: words,
    textAlign: "center",
  }
})

export default style;