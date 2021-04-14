export const renewConfig = (config, newConfig) => {
  const {
    boards: { allBoards }
  } = config;

  const filteredBoards = allBoards.filter(
    id => !newConfig.boards.allBoards.includes(id)
  );

  const result = {
    ...config,
    boards: {
      ...config.boards,
      boardsById: {
        ...config.boards.boardsById,
        ...newConfig.boards.boardsById
      },
      allBoards: [...filteredBoards, ...newConfig.boards.allBoards]
    },
    widgets: {
      ...config.widgets,
      widgetsById: {
        ...config.widgets.widgetsById,
        ...newConfig.widgets.widgetsById
      }
    }
  };
  return result;
};
