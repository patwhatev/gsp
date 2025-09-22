'use client'

import { createContext, useContext, useState, useRef, useEffect } from 'react'

const AudioContext = createContext()

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export default function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioSupported, setAudioSupported] = useState(true)
  const audioRef = useRef(null)

  const testAudioSupport = () => {
    const audio = new Audio()
    const formats = {
      mp3: audio.canPlayType('audio/mpeg'),
      ogg: audio.canPlayType('audio/ogg'),
      wav: audio.canPlayType('audio/wav'),
      m4a: audio.canPlayType('audio/mp4')
    }
    console.log('Supported audio formats:', formats)
    return formats
  }

  useEffect(() => {
    console.log('AudioProvider initializing...')
    testAudioSupport()

    audioRef.current = new Audio()
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    audioRef.current.preload = 'metadata'

    const audio = audioRef.current

    const handleEnded = () => setIsPlaying(false)
    const handlePause = () => setIsPlaying(false)
    const handlePlay = () => setIsPlaying(true)
    const handleError = (e) => {
      console.log('Audio error details:', {
        error: e.target.error,
        code: e.target.error?.code,
        message: e.target.error?.message,
        src: e.target.src,
        networkState: e.target.networkState,
        readyState: e.target.readyState
      })
      setIsPlaying(false)
      setAudioSupported(false)
    }
    const handleLoadStart = () => console.log('Audio load started')
    const handleCanPlay = () => console.log('Audio can play - ready to use')
    const handleLoadedData = () => console.log('Audio data loaded successfully')

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadeddata', handleLoadedData)

    // Test with the correct file format
    const testSources = [
      'https://archive.org/download/takashi-kokubo-gaudis-dream/takashi%20kokubo%20-%20gaudis%20dream.m4a'
    ]

    let currentSourceIndex = 0
    const tryNextSource = () => {
      if (currentSourceIndex < testSources.length) {
        const url = testSources[currentSourceIndex]
        console.log(`Testing audio source ${currentSourceIndex + 1}/${testSources.length}:`, url)
        audio.src = url
        audio.load()
        currentSourceIndex++
      } else {
        console.log('All audio sources failed')
        setAudioSupported(false)
      }
    }

    // Start with first source
    tryNextSource()

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => {
        console.log('Audio play failed', e)
      })
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, audioSupported }}>
      {children}
    </AudioContext.Provider>
  )
}