import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Share2, RotateCcw } from 'lucide-react'

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  isWin: boolean
  turn: number
  onNewGame: () => void
  onShare: () => void
}

export function GameModal({ isOpen, onClose, isWin, turn, onNewGame, onShare }: GameModalProps) {
  const getTitle = () => {
    if (isWin) {
      switch (turn) {
        case 1: return 'Genius!'
        case 2: return 'Magnificent!'
        case 3: return 'Impressive!'
        case 4: return 'Splendid!'
        case 5: return 'Great!'
        case 6: return 'Phew!'
        default: return 'Well done!'
      }
    }
    return 'Board Complete!'
  }

  const getMessage = () => {
    if (isWin) {
      return `You found the word in ${turn} ${turn === 1 ? 'guess' : 'guesses'}!`
    }
    return 'You filled the entire board! Try again with a new word.'
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {getTitle()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">{getMessage()}</p>
          
          <div className="flex gap-2 justify-center">
            <Button onClick={onShare} variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            
            <Button onClick={onNewGame} className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              New Game
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Click "New Game" to play again with a different word!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}