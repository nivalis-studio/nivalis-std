import type {Result} from './types';

export {Err, err} from './err';
export {Ok, ok} from './ok';
export type {Result} from './types';
export {wrap, wrapSync} from './catch';

export const unwrap = <R, E>(result: Result<R, E>): R => result.unwrap();
