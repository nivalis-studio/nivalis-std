export type UnifyIntersection<T> = {
  [K in keyof T]: T[K];
};

export type TypesFromSet<T extends Set<unknown>> =
  T extends Set<infer U> ? U : never;

export type StringWithAutocomplete<T extends string> = T | (string & {});
