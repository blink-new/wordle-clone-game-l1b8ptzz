import { cn } from '../lib/utils'

interface TileProps {
  letter?: string
  color?: 'green' | 'yellow' | 'grey'
  isHint?: boolean
}

export function Tile({ letter, color, isHint = false }: TileProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-wordle-correct border-wordle-correct text-white'
      case 'yellow':
        return 'bg-wordle-present border-wordle-present text-white'
      case 'grey':
        return 'bg-wordle-absent border-wordle-absent text-white'
      default:
        if (isHint && letter) {
          return 'bg-wordle-hint border-wordle-hint text-white'
        }
        return letter 
          ? 'bg-white border-wordle-tbd border-2' 
          : 'bg-white border-wordle-empty'
    }
  }

  return (
    <div
      className={cn(
        'w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-all duration-300',
        getColorClasses(),
        color && 'animate-flip'
      )}
    >
      {letter}
    </div>
  )
}