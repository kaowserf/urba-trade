import { scoreToColor } from '@/lib/utils'

interface AIScoreBarProps { score: number; showLabel?: boolean }

export function AIScoreBar({ score, showLabel = true }: AIScoreBarProps) {
  const color = scoreToColor(score)
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 score-bar-track">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && <span className="text-sm font-bold w-8 text-right" style={{ color }}>{Math.round(score)}</span>}
    </div>
  )
}
