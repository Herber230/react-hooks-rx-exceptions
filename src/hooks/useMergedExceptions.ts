import { useRef, useEffect } from 'react';
import { merge, Observable, Subject } from 'rxjs';
import { Exception } from '../utils';

export function useMergedException$(...exception$: Array<Observable<Exception>>) {
  const mergedException$ = useRef(new Subject<Exception>()).current;

  useEffect(() => {
    const mergedFlow$ = merge(...exception$);
    const subscription = mergedFlow$.subscribe(mergedException$);
    return () => subscription.unsubscribe();
  }, []);

  return mergedException$;
}
