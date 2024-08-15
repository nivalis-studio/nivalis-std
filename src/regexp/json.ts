// https://github.com/fastify/secure-json-parse
// https://github.com/hapijs/bourne
export const RE_SUSPECT_JSON_PROTO =
  /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
export const RE_SUSPECT_CONSTRUCTOR_PROTO =
  /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
export const RE_JSON_SIG =
  /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?(e[+-]?\d+)?\s*$/i;

export const RE_DETECT_JSON = /^\s*[\d"[{-]/;
