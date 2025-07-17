import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Tile } from './Tile'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            How To Play
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <p>Guess the <strong>WORDLE</strong> in six tries.</p>
          
          <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
          
          <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
          
          <div className="border-t pt-4">
            <p className="font-semibold mb-3">Examples</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex gap-1 mb-2">
                  <Tile letter="W" color="green" />
                  <Tile letter="E" />
                  <Tile letter="A" />
                  <Tile letter="R" />
                  <Tile letter="Y" />
                </div>
                <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
              </div>
              
              <div>
                <div className="flex gap-1 mb-2">
                  <Tile letter="P" />
                  <Tile letter="I" color="yellow" />
                  <Tile letter="L" />
                  <Tile letter="L" />
                  <Tile letter="S" />
                </div>
                <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
              </div>
              
              <div>
                <div className="flex gap-1 mb-2">
                  <Tile letter="V" />
                  <Tile letter="A" />
                  <Tile letter="G" />
                  <Tile letter="U" color="grey" />
                  <Tile letter="E" />
                </div>
                <p>The letter <strong>U</strong> is not in the word in any spot.</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="font-semibold">A new WORDLE will be available each day!</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}