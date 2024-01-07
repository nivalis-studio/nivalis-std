import {Err} from './err';
import {Ok} from './ok';

export {Err} from './err';
export {Ok} from './ok';

export type Result<T = unknown, E = unknown> = Ok<T> | Err<E>;
