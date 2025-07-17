import { cn } from '../lib/utils'

interface KeyboardProps {
  usedKeys: Record<string, 'green' | 'yellow' | 'grey'>
  onKeyPress: (e: { key: string }) => void
}

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
]

export function Keyboard({ usedKeys, onKeyPress }: KeyboardProps) {
  const getKeyColor = (key: string) => {
    const color = usedKeys[key]
    switch (color) {
      case 'green':
        return 'bg-wordle-correct text-white'
      case 'yellow':
        return 'bg-wordle-present text-white'
      case 'grey':
        return 'bg-wordle-absent text-white'
      default:
        return 'bg-gray-200 hover:bg-gray-300 text-black'
    }
  }

  const getKeySize = (key: string) => {
    if (key === 'Enter' || key === 'Backspace') {
      return 'px-3 py-4 text-sm font-semibold min-w-[65px]'
    }
    return 'w-10 h-12 text-lg font-semibold'
  }

  return (
    <div className="w-full max-w-lg">
      {keyboardRows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress({ key })}
              className={cn(
                'rounded flex items-center justify-center transition-colors uppercase',
                getKeySize(key),
                getKeyColor(key)
              )}
            >
              {key === 'Backspace' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}