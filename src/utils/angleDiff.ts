// Shortest signed angular difference from `angle` to `target`, always within [-PI, PI].
// Plain modulo wrapping ((target - angle + 3PI) % TAU) - PI is wrong for negative
// dividends in JS and yields diffs outside [-PI, PI], making smooth angle
// followers spin the long way around.
export function angleDiff(target: number, angle: number): number {
  return Math.atan2(Math.sin(target - angle), Math.cos(target - angle));
}
