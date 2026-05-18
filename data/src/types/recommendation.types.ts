export interface UserProfile {

  id: number;

  skills: string[];

  localization: string;

  permanent_contract: boolean;

  experience: number;

  vector?: number[];
}