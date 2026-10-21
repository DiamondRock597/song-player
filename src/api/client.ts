// Simulated network transport. `songs.json` is treated as a remote backend,
// so every endpoint resolves through `simulateRequest` to get realistic
// latency and cancellation instead of returning data synchronously.

import { LATENCY_MS } from './constants';

export type RequestOptions = {
  signal?: AbortSignal;
};

export class AbortError extends Error {
  name = 'AbortError';
}

const randomLatency = () =>
  LATENCY_MS.min + Math.random() * (LATENCY_MS.max - LATENCY_MS.min);

export const simulateRequest = <T>(
  handler: () => T,
  { signal }: RequestOptions = {},
): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AbortError('Request aborted'));
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      reject(new AbortError('Request aborted'));
    };

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      try {
        resolve(handler());
      } catch (error) {
        reject(error);
      }
    }, randomLatency());

    signal?.addEventListener('abort', onAbort, { once: true });
  });
};
