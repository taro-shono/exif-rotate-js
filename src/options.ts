export interface TOptions {
  maxSize?: number;
  type?: 'image/png' | 'image/jpeg' | 'image/webp';
}

export const defaultOptions = {
  maxSize: 720,
  type: 'image/jpeg',
} as const;
