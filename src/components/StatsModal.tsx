import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

interface Stats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
  winPercentage: number
}

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
  stats: Stats
}

export function StatsModal({ isOpen, onClose, stats }: StatsModalProps) {
  const maxGuesses = Math.max(...stats.guessDistribution)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Statistics
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{stats.gamesPlayed}</div>
              <div className="text-xs text-gray-600">Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.winPercentage}</div>
              <div className="text-xs text-gray-600">Win %</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.currentStreak}</div>
              <div className="text-xs text-gray-600">Current Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{stats.maxStreak}</div>
              <div className="text-xs text-gray-600">Max Streak</div>
            </div>
          </div>

          {/* Guess Distribution */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-center">GUESS DISTRIBUTION</h3>
            <div className="space-y-1">
              {stats.guessDistribution.map((count, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 text-sm font-bold">{i + 1}</div>
                  <div className="flex-1 bg-gray-200 h-5 relative">
                    <div
                      className="bg-wordle-correct h-full flex items-center justify-end pr-2 text-white text-xs font-bold min-w-[20px]"
                      style={{
                        width: maxGuesses > 0 ? `${Math.max((count / maxGuesses) * 100, count > 0 ? 10 : 0)}%` : '0%'
                      }}
                    >
                      {count > 0 && count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Wordle */}
          <div className="text-center">
            <div className="text-sm text-gray-600">NEXT WORDLE</div>
            <div className="text-lg font-bold">{getTimeUntilMidnight()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getTimeUntilMidnight(): string {
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  
  const diff = tomorrow.getTime() - now.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}