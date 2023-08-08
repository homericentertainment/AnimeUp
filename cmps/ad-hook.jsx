// useInterstitialAd.js
import { useEffect, useState, useRef } from 'react'
import { TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads'

const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-7417791312056885~9528124470'

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true
})

export default function useInterstitialAd() {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false)
  
  const interstitialRef = useRef(interstitial)

  useEffect(() => {
    const unsubscribeLoaded = interstitialRef.current.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Interstitial loaded1')
      }
    )

    const unsubscribeClosed = interstitialRef.current.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('Interstitial closed1')
        loadInterstitialAd()
      }
    )

    interstitialRef.current.load()

    return () => {
      unsubscribeLoaded()
      unsubscribeClosed()
    }
  }, [])

  const loadInterstitialAd = () => {
    interstitialRef.current.load()
    setInterstitialLoaded(true)
  }

  const showInterstitialAd = () => {
    if (interstitialLoaded) {
      interstitial.show()
      return true
    }
    return false
  }

  return { showInterstitialAd, loadInterstitialAd }
}