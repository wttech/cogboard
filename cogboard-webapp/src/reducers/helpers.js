export const reorderItems = (items, sourceId, targetIndex) => {
    const withoutSource = items.filter(itemId => itemId !== sourceId);
    const sortedItems = [
      ...withoutSource.slice(0, targetIndex),
      sourceId,
      ...withoutSource.slice(targetIndex)
    ];

    return sortedItems
}