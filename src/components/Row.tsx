import { Tile } from './Tile'

interface Letter {
  key: string
  color: 'green' | 'yellow' | 'grey'
}

interface RowProps {
  guess?: Letter[]
  currentGuess?: string
  hintsUsed?: number[]
}

export function Row({ guess, currentGuess, hintsUsed = [] }: RowProps) {
  if (guess) {
    return (
      <div className="grid grid-cols-5 gap-1">
        {guess.map((letter, i) => (
          <Tile key={i} letter={letter.key} color={letter.color} />
        ))}
      </div>
    )
  }

  if (currentGuess) {
    const letters = currentGuess.split('')
    
    return (
      <div className="grid grid-cols-5 gap-1">
        {[...Array(5)].map((_, i) => (
          <Tile 
            key={i} 
            letter={letters[i] || ''} 
            isHint={hintsUsed.includes(i)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-1">
      {[...Array(5)].map((_, i) => (
        <Tile key={i} />
      ))}
    </div>
  )
}