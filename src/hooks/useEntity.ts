import { useEffect, useState } from 'react';
import { useRequest } from './useRequest';
import { useMergedException$ } from './useMergedExceptions';

export function useEntity<TEntity>(
  retrievePerformer: () => Promise<Array<TEntity>>,
  savePerformer: (entity: TEntity) => Promise<TEntity>
) {
  const [isOnTask, setIsOnTask] = useState(false);

  const {
    isOnTask: isLoading,
    response: entityCollection,
    performRequest: loadCollection,
    exception$: retrieveException$,
  } = useRequest<void, Array<TEntity>>(retrievePerformer);

  const {
    isOnTask: isSaving,
    response: entity,
    performRequest: saveEntity,
    exception$: saveException$,
  } = useRequest<TEntity, TEntity>(savePerformer);

  const exception$ = useMergedException$(retrieveException$, saveException$);

  useEffect(() => {
    setIsOnTask(isLoading || isSaving);
  }, [isLoading, isSaving]);

  return {
    isOnTask,
    isLoading,
    entityCollection,
    loadCollection,
    isSaving,
    entity,
    saveEntity,
    exception$,
  };
}
