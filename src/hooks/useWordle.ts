import { useState, useCallback, useEffect } from 'react'
import { WORDS, isValidWord, isValidWordSync } from '../data/words'

interface Letter {
  key: string
  color: 'green' | 'yellow' | 'grey'
}

type Guess = Letter[] | null

// Get a random word from the word list
function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export function useWordle() {
  const [solution, setSolution] = useState(() => getRandomWord())
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState<Guess[]>(Array(6).fill(null))
  const [history, setHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState<Record<string, 'green' | 'yellow' | 'grey'>>({})
  const [hintsUsed, setHintsUsed] = useState<number[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [message, setMessage] = useState('')

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Format a guess into colored letters
  const formatGuess = useCallback((guess: string): Letter[] => {
    const solutionArray = [...solution]
    const formattedGuess: Letter[] = [...guess].map((letter) => ({
      key: letter,
      color: 'grey' as const
    }))

    // Find green letters (correct position)
    formattedGuess.forEach((letter, i) => {
      if (solution[i] === letter.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = ''
      }
    })

    // Find yellow letters (wrong position)
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(letter.key)] = ''
      }
    })

    return formattedGuess
  }, [solution])

  // Add a new guess
  const addNewGuess = useCallback((formattedGuess: Letter[]) => {
    // Track if this guess is correct, but don't end the game
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prevHistory) => [...prevHistory, currentGuess])

    // Update used keys
    setUsedKeys((prevUsedKeys) => {
      const newUsedKeys = { ...prevUsedKeys }
      formattedGuess.forEach((letter) => {
        const currentColor = newUsedKeys[letter.key]
        if (letter.color === 'green') {
          newUsedKeys[letter.key] = 'green'
        } else if (letter.color === 'yellow' && currentColor !== 'green') {
          newUsedKeys[letter.key] = 'yellow'
        } else if (!currentColor) {
          newUsedKeys[letter.key] = 'grey'
        }
      })
      return newUsedKeys
    })

    setTurn((prevTurn) => prevTurn + 1)
    setCurrentGuess('')
  }, [currentGuess, solution, turn])

  // Handle keyup events
  const handleKeyup = useCallback(async (e: KeyboardEvent | { key: string }) => {
    if (turn >= 6 || isValidating) return // Only stop when all 6 rows are filled or validating

    if (e.key === 'Enter') {
      // Clear any previous message
      setMessage('')
      
      // Only allow submit if we have 5 characters
      if (turn >= 6) {
        setMessage('You used all your guesses!')
        return
      }
      if (history.includes(currentGuess)) {
        setMessage('You already tried that word.')
        return
      }
      if (currentGuess.length !== 5) {
        setMessage('Word must be 5 characters.')
        return
      }

      // First check sync validation (cache + predefined list)
      if (!isValidWordSync(currentGuess)) {
        // If not in cache/predefined list, do async validation
        setIsValidating(true)
        try {
          const isValid = await isValidWord(currentGuess)
          setIsValidating(false)
          
          if (!isValid) {
            setMessage('Not a valid word.')
            return
          }
        } catch (error) {
          console.error('Word validation failed:', error)
          setIsValidating(false)
          setMessage('Could not validate word. Please try a different word.')
          return
        }
      }

      const formatted = formatGuess(currentGuess)
      addNewGuess(formatted)
    }

    if (e.key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(e.key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + e.key.toUpperCase())
      }
    }
  }, [addNewGuess, currentGuess, formatGuess, history, turn, isValidating])

  // Get hint - reveals next letter position
  const getHint = useCallback(() => {
    if (turn >= 6) return
    
    // Find the next position that hasn't been hinted yet
    const availablePositions = [0, 1, 2, 3, 4].filter(pos => !hintsUsed.includes(pos))
    
    if (availablePositions.length === 0) return // No more hints available
    
    // Get the first available position
    const hintPosition = availablePositions[0]
    const hintLetter = solution[hintPosition]
    
    // Add the hint letter to current guess at the correct position
    setCurrentGuess(prev => {
      const newGuess = prev.padEnd(5, ' ').split('')
      newGuess[hintPosition] = hintLetter
      return newGuess.join('').trimEnd()
    })
    
    // Mark this position as hinted
    setHintsUsed(prev => [...prev, hintPosition])
  }, [solution, hintsUsed, turn])

  // Reset game
  const resetGame = useCallback(() => {
    setSolution(getRandomWord())
    setTurn(0)
    setCurrentGuess('')
    setGuesses(Array(6).fill(null))
    setHistory([])
    setIsCorrect(false)
    setUsedKeys({})
    setHintsUsed([])
    setIsValidating(false)
    setMessage('')
  }, [])

  // Check if board is complete (all 6 rows filled)
  const isBoardComplete = turn >= 6

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
    resetGame,
    solution,
    getHint,
    hintsUsed,
    isBoardComplete,
    isValidating,
    message
  }
}