export type V = boolean | number | string | undefined | null;
export type Response = { [key: string]: V };
export type Parser = (value?: string[]) => Response;
