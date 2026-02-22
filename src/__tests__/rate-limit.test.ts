import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimit } from '@/lib/rate-limit';

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should allow the first request and return remaining = limit - 1', () => {
    const result = rateLimit('192.168.1.1', 5, 60000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
  });

  it('should allow multiple requests within the limit', () => {
    const ip = '10.0.0.1';
    const limit = 3;

    const r1 = rateLimit(ip, limit, 60000);
    expect(r1.success).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = rateLimit(ip, limit, 60000);
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = rateLimit(ip, limit, 60000);
    expect(r3.success).toBe(true);
    expect(r3.remaining).toBe(0);
  });

  it('should reject requests once the limit is exceeded', () => {
    const ip = '10.0.0.2';
    const limit = 2;

    rateLimit(ip, limit, 60000);
    rateLimit(ip, limit, 60000);

    const result = rateLimit(ip, limit, 60000);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should maintain separate limits for different IPs', () => {
    const ip1 = '172.16.0.1';
    const ip2 = '172.16.0.2';
    const limit = 1;

    const r1 = rateLimit(ip1, limit, 60000);
    expect(r1.success).toBe(true);

    // ip1 is now at its limit
    const r1Again = rateLimit(ip1, limit, 60000);
    expect(r1Again.success).toBe(false);

    // ip2 should still be allowed
    const r2 = rateLimit(ip2, limit, 60000);
    expect(r2.success).toBe(true);
  });

  it('should reset the counter after the window expires', () => {
    const ip = '10.0.0.3';
    const limit = 2;
    const windowMs = 60000;

    rateLimit(ip, limit, windowMs);
    rateLimit(ip, limit, windowMs);

    // Should now be at the limit
    const blocked = rateLimit(ip, limit, windowMs);
    expect(blocked.success).toBe(false);

    // Advance time past the window
    vi.advanceTimersByTime(windowMs + 1);

    // Should be allowed again after the window resets
    const afterReset = rateLimit(ip, limit, windowMs);
    expect(afterReset.success).toBe(true);
    expect(afterReset.remaining).toBe(limit - 1);
  });

  it('should use default limit of 5 and window of 60000ms when not specified', () => {
    const ip = '10.0.0.4';

    // Make 5 requests with defaults
    for (let i = 0; i < 5; i++) {
      const result = rateLimit(ip);
      expect(result.success).toBe(true);
    }

    // 6th request should fail
    const result = rateLimit(ip);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should correctly decrement remaining count with each request', () => {
    const ip = '10.0.0.5';
    const limit = 5;

    for (let i = 0; i < limit; i++) {
      const result = rateLimit(ip, limit, 60000);
      expect(result.remaining).toBe(limit - 1 - i);
    }
  });
});
