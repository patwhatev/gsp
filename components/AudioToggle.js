'use client'

import { useAudio } from './AudioProvider'

export default function AudioToggle() {
  const { isPlaying, togglePlay } = useAudio()

  return (
    <button
      onClick={togglePlay}
      className={`audio-toggle ${isPlaying ? 'playing' : ''}`}
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {isPlaying ? (
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        ) : (
          <path d="M8 5v14l11-7z" />
        )}
      </svg>

      <style jsx>{`
        .audio-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #FFF;
          opacity: 1;
          transition: opacity 0.2s ease;
        }

        .audio-toggle:hover {
          opacity: 0.7;
        }

        .audio-toggle.playing {
          opacity: 0.5;
        }

        .audio-toggle svg {
          display: block;
        }
      `}</style>
    </button>
  )
}