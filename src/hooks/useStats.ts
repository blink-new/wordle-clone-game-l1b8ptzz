import { useState, useEffect, useCallback } from 'react'

interface Stats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
  winPercentage: number
}

const defaultStats: Stats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0, 0],
  winPercentage: 0
}

export function useStats() {
  const [stats, setStats] = useState<Stats>(defaultStats)

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('wordle-stats')
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats)
        setStats(parsedStats)
      } catch (error) {
        console.error('Error parsing saved stats:', error)
      }
    }
  }, [])

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem('wordle-stats', JSON.stringify(stats))
  }, [stats])

  // Update stats after a game
  const updateStats = useCallback((isWin: boolean, guessCount: number) => {
    setStats((prevStats) => {
      const newStats = { ...prevStats }
      
      newStats.gamesPlayed += 1
      
      if (isWin) {
        newStats.gamesWon += 1
        newStats.currentStreak += 1
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
        newStats.guessDistribution[guessCount - 1] += 1
      } else {
        newStats.currentStreak = 0
      }
      
      newStats.winPercentage = Math.round((newStats.gamesWon / newStats.gamesPlayed) * 100)
      
      return newStats
    })
  }, [])

  // Reset stats
  const resetStats = useCallback(() => {
    setStats(defaultStats)
    localStorage.removeItem('wordle-stats')
  }, [])

  return {
    stats,
    updateStats,
    resetStats
  }
}