import { useEffect, useCallback } from 'react';
import { Subject } from 'rxjs';
import { Exception } from '../utils';

export function useException$(
  exception$: Subject<Exception>,
  exceptionHandler: (exception: Exception) => void
) {
  const fnExHandler = useCallback((e: Exception) => exceptionHandler(e), [exceptionHandler]);

  useEffect(() => {
    const subscripton = exception$.subscribe({ next: fnExHandler });
    return () => subscripton.unsubscribe();
  }, [exception$, fnExHandler]);
}
