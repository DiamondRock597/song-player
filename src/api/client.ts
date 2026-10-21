// Simulated network transport. `songs.json` is treated as a remote backend,
// so every endpoint resolves through `simulateRequest` to get realistic
// latency and cancellation instead of returning data synchronously.

export type RequestOptions = {
  signal?: AbortSignal;
};

const LATENCY_MS = { min: 300, max: 900 };

export class AbortError extends Error {
  name = 'AbortError';
}

const randomLatency = () =>
  LATENCY_MS.min + Math.random() * (LATENCY_MS.max - LATENCY_MS.min);

export function simulateRequest<T>(
  handler: () => T,
  { signal }: RequestOptions = {},
): Promise<T> {
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
}
