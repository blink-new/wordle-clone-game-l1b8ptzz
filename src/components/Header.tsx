import { HelpCircle, BarChart3, Lightbulb, RotateCcw } from 'lucide-react'

interface HeaderProps {
  onStatsClick: () => void
  onHelpClick: () => void
  onHintClick: () => void
  onRestartClick: () => void
  hintsRemaining: number
}

export function Header({ onStatsClick, onHelpClick, onHintClick, onRestartClick, hintsRemaining }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onHelpClick}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
          
          <button
            onClick={onHintClick}
            disabled={hintsRemaining === 0}
            className="relative p-2 hover:bg-gray-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Get hint (${hintsRemaining} remaining)`}
          >
            <Lightbulb className="w-6 h-6" />
            {hintsRemaining > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {hintsRemaining}
              </span>
            )}
          </button>
        </div>
        
        <h1 className="text-3xl font-bold tracking-wide">Wordle</h1>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onRestartClick}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Restart Game"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          
          <button
            onClick={onStatsClick}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Statistics"
          >
            <BarChart3 className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  )
}