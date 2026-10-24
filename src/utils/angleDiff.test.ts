import { describe, expect, it } from 'vitest';
import { angleDiff } from './angleDiff';

describe('angleDiff', () => {
  it('always returns the shortest path within [-PI, PI]', () => {
    for (let target = -20; target <= 40; target += 0.7) {
      for (let angle = -20; angle <= 40; angle += 1.3) {
        const d = angleDiff(target, angle);
        expect(Math.abs(d)).toBeLessThanOrEqual(Math.PI + 1e-12);
        expect(Math.abs(target - angle)).toBeGreaterThanOrEqual(Math.abs(d) - 1e-9);
      }
    }
  });

  it('regression: mouse-enter case that made the specular glow spin the wrong way', () => {
    // idleAngle grows unbounded; pointer flips target to a small atan2 value.
    const idleAngle = 2.4 + 0.35 * 600; // 212.4 after ~10 min idle
    const angle = 211.9;                // trailing idle rotation
    const pointerAngle = 1.0;           // mouse to the right of the button

    // Old formula returned -3.555 (outside [-PI, PI]); correct shortest path is +2.728
    const d = angleDiff(pointerAngle, angle);
    expect(Math.abs(d)).toBeLessThanOrEqual(Math.PI);
    expect(d).toBeCloseTo(2.728, 2);
    expect(angleDiff(idleAngle, 1.2)).toBeCloseTo(-2.428, 2);
  });

  it('handles equal angles and half-turns', () => {
    expect(angleDiff(1.5, 1.5)).toBe(0);
    expect(Math.abs(angleDiff(Math.PI, 0))).toBeCloseTo(Math.PI, 6);
  });
});
