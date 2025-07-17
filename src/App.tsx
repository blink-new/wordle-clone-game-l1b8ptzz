import { useState, useEffect, useCallback } from 'react'
import { GameBoard } from './components/GameBoard'
import { Keyboard } from './components/Keyboard'
import { Header } from './components/Header'
import { GameModal } from './components/GameModal'
import { StatsModal } from './components/StatsModal'
import { HelpModal } from './components/HelpModal'
import { useWordle } from './hooks/useWordle'
import { useStats } from './hooks/useStats'
import { WORDS } from './data/words'

function App() {
  const [showGameModal, setShowGameModal] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    resetGame,
    getHint,
    hintsUsed,
    isBoardComplete,
    isValidating,
    message
  } = useWordle()
  
  const { stats, updateStats } = useStats()

  // Handle game completion - only when board is full
  useEffect(() => {
    if (turn >= 6) {
      setTimeout(() => {
        setShowGameModal(true)
        updateStats(isCorrect, turn)
      }, 2000)
    }
  }, [turn, updateStats, isCorrect])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyup(e)
    }
    
    window.addEventListener('keyup', handleKeyDown)
    return () => window.removeEventListener('keyup', handleKeyDown)
  }, [handleKeyup])

  const handleNewGame = useCallback(() => {
    setShowGameModal(false)
    resetGame()
  }, [resetGame])

  const handleShare = useCallback(() => {
    const shareText = generateShareText(guesses, isCorrect, turn)
    if (navigator.share) {
      navigator.share({
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
    }
  }, [guesses, isCorrect, turn])

  const handleHint = useCallback(() => {
    getHint()
  }, [getHint])

  const hintsRemaining = 5 - hintsUsed.length

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onStatsClick={() => setShowStatsModal(true)}
        onHelpClick={() => setShowHelpModal(true)}
        onHintClick={handleHint}
        onRestartClick={resetGame}
        hintsRemaining={hintsRemaining}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-lg mx-auto w-full">
        <GameBoard 
          guesses={guesses}
          currentGuess={currentGuess}
          turn={turn}
          hintsUsed={hintsUsed}
        />
        
        {isValidating && (
          <div className="mb-4 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
              Checking word...
            </div>
          </div>
        )}
        
        {message && !isValidating && (
          <div className="mb-4 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 rounded-lg">
              {message}
            </div>
          </div>
        )}
        
        <Keyboard 
          usedKeys={usedKeys}
          onKeyPress={handleKeyup}
        />
      </main>

      <GameModal
        isOpen={showGameModal}
        onClose={() => setShowGameModal(false)}
        isWin={isCorrect}
        turn={turn}
        onNewGame={handleNewGame}
        onShare={handleShare}
      />

      <StatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        stats={stats}
      />

      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  )
}

function generateShareText(guesses: any[], isCorrect: boolean, turn: number): string {
  const result = isCorrect ? turn : 'X'
  let shareText = `Wordle ${result}/6\\n\\n`
  
  guesses.forEach((guess) => {
    if (guess) {
      let row = ''
      guess.forEach((letter: any) => {
        if (letter.color === 'green') {
          row += '🟩'
        } else if (letter.color === 'yellow') {
          row += '🟨'
        } else {
          row += '⬜'
        }
      })
      shareText += row + '\\n'
    }
  })
  
  return shareText
}

export default App