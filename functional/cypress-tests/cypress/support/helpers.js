export const renewConfig = (config, newConfig) => {
  const {
    boards: { allBoards },
    widgets: { allWidgets }
  } = config;

  const filteredBoards = allBoards.filter(
    id => !newConfig.boards.allBoards.includes(id)
  );
  const filteredWidgets = allWidgets.filter(
    id => !newConfig.widgets.allWidgets.includes(id)
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
      },
      allWidgets: [...filteredWidgets, ...newConfig.widgets.allWidgets]
    }
  };
  return result;
};
