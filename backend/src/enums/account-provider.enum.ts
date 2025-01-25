export const ProviderEnum = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
  GITHUB: "GITHUB",
  EMAIL: "EMAIL",
};

export type ProviderEnum = keyof typeof ProviderEnum;
