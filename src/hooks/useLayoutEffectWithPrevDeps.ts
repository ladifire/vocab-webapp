import { useLayoutEffect } from 'react'
import usePrevious from './usePrevious'

const useLayoutEffectWithPrevDeps = <T extends readonly any[]>(
  cb: (args: T | readonly []) => void,
  dependencies: T,
) => {
  const prevDeps = usePrevious<T>(dependencies)
  return useLayoutEffect(() => {
    return cb(prevDeps || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

export default useLayoutEffectWithPrevDeps
