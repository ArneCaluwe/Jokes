export interface JokeModel {
  error: boolean;
  category: string;
  type: 'single' | 'twoPart';
  joke: string;
  id: number;
  safe: boolean;
  lang: string;
}
