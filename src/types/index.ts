export type UnifyIntersection<T> = {
  [K in keyof T]: T[K];
};

export type TypesFromSet<T extends Set<unknown>> =
  T extends Set<infer U> ? U : never;

// eslint-disable-next-line sonarjs/no-useless-intersection
export type StringWithAutocomplete<T extends string> = T | (string & {});
