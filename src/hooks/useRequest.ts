import { useState, useCallback, useRef } from 'react';
import { Subject } from 'rxjs';
import { Exception } from '../utils';

export function useRequest<TParms, TResponse>(performer: (params: TParms) => Promise<TResponse>) {
  const [isOnTask, setIsOnTask] = useState(false);
  const [response, setResponse] = useState<TResponse>();

  //Create the Exception flow one time in the hook instance
  const exception$ = useRef(new Subject<Exception>()).current;

  const performRequest = useCallback(
    (params: TParms) => {
      setIsOnTask(true);
      performer(params)
        .then(response => {
          setResponse(response);
        })
        .catch(e => {
          //Send the exception
          exception$.next(new Exception().setOriginalException(e).setType('RequestException'));
        })
        .finally(() => {
          setIsOnTask(false);
        });
    },
    [performer]
  );

  return {
    isOnTask,
    performRequest,
    response,
    exception$,
  };
}
