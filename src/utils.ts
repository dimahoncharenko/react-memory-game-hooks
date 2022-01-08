export const addIndex = (
  indexes: number[],
  foundedPairs: number[],
  newIndex: number
) => {
  if (indexes.length === 0) {
    return [newIndex];
  } else if (indexes.length === 1) {
    // It handles a situation when one of the chosen cards has already been found
    if (foundedPairs.includes(newIndex)) {
      return indexes;
    }
    return [...indexes, newIndex];
  } else {
    // It handles a situation when two cards are the same
    if (indexes.includes(newIndex)) {
      return indexes;
    }
    return [newIndex];
  }
};
