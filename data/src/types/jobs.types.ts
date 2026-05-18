export interface JobVector {

  vector: number[];

  id: string;

  title: string;

  description?: string;

  company?: string;

  image?: string;

  remote?: boolean;

  salary?: {
    min?: number;
    max?: number;
  };

  skills: string[];

  experience?: number;

  locations?: string[];
}