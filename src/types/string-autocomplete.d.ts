// eslint-disable-next-line sonarjs/no-useless-intersection
export type StringWithAutocomplete<T extends string> = T | (string & {});
