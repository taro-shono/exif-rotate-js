export interface TOptions {
  maxSize?: number;
  /** The quality to be used when resizing using a lossy compression algorithm. */
  quality?: number;
  type?: 'image/png' | 'image/jpeg' | 'image/webp';
}

export const defaultOptions = {
  maxSize: 720,
  quality: undefined,
  type: 'image/jpeg',
} as const;
