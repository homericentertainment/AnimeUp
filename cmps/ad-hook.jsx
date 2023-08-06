import { useEffect, useState } from 'react'
import { TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads'

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true
})

export default function useInterstitialAd() {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false)

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true)
        console.log('Interstitial loaded')
      }
    )
  
    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false)
        interstitial.load()
        console.log('Interstitial closed')
      }
    )
  
    interstitial.load()
  
    return () => {
      unsubscribeClosed()
      unsubscribeLoaded()
    }
  }, [])

  const showInterstitialAd = () => {
    if (interstitialLoaded) {
      interstitial.show()
    }
  }

  return showInterstitialAd
}