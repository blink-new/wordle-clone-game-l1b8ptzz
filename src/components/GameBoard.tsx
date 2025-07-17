import { Row } from './Row'

interface Letter {
  key: string
  color: 'green' | 'yellow' | 'grey'
}

type Guess = Letter[] | null

interface GameBoardProps {
  guesses: Guess[]
  currentGuess: string
  turn: number
  hintsUsed: number[]
}

export function GameBoard({ guesses, currentGuess, turn, hintsUsed }: GameBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-1 mb-8">
      {guesses.map((guess, i) => {
        if (guess) {
          return <Row key={i} guess={guess} />
        }
        
        if (i === turn) {
          return <Row key={i} currentGuess={currentGuess} hintsUsed={hintsUsed} />
        }
        
        return <Row key={i} />
      })}
    </div>
  )
}