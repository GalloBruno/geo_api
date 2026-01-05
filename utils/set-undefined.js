export const checkIfUndefined = (fx) => {
  return typeof navigator !== 'undefined' ? fx : null
}
