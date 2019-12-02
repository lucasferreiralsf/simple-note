export enum Provider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  LOCAL = 'local',
}

export interface IGoogleProfileJson {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  email: string;
}

export interface IToken {
  userId: string;
  token: string;
  userEmail: string;
  firstName: string;
  lastName: string;
}
