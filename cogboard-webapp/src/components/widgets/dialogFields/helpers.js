import { sortByKey } from '../../../utils/components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { StyledList } from './styled';
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React from 'react';

export const parseTypes = elementTypes => {
  if (!elementTypes) {
    return;
  }

  const sortedElementTypes = sortByKey(elementTypes, 'name');

  return Object.entries(sortedElementTypes).reduce((obj, [type, { name }]) => {
    return [
      ...obj,
      {
        display: name,
        value: type
      }
    ];
  }, []);
};

export const transformMinValue = minValue => {
  const minimum = minValue > 1 || !minValue ? 1 : minValue;
  let prevValue;

  return value => {
    if (value < minimum) {
      return (prevValue = minimum);
    }

    return (prevValue =
      value < prevValue ? Math.floor(value) : Math.ceil(value));
  };
};

export const prepareChangeEvent = (value, type) => {
  return {
    target: {
      value: value,
      type: type
    }
  };
};

export const RenderDragableList = ({
  items,
  setEvent,
  onChange,
  prepareChangeEvent,
  editMode,
  handleEdit,
  handleDelete
}) => {
  const getTextName = item => {
    return item.itemText || item.bucketName || item.linkTitle || '';
  };

  const handleOnDragEnd = result => {
    if (!result.destination) return;

    const tempItems = items;
    const [reorderedItem] = tempItems.splice(result.source.index, 1);
    tempItems.splice(result.destination.index, 0, reorderedItem);

    setEvent(tempItems);
    onChange(prepareChangeEvent(tempItems, 'array'));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {provided => (
          <StyledList {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {provided => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={item.id}
                    dense
                    button
                    selected={editMode === item.id}
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                  >
                    <ListItemText primary={getTextName(item)} />
                    <ListItemSecondaryAction>
                      <Tooltip title="Edit" placement="bottom">
                        <IconButton
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          aria-label="Edit"
                          disabled={editMode === item.id}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" placement="bottom">
                        <IconButton
                          aria-label="Delete"
                          disabled={editMode === item.id}
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StyledList>
        )}
      </Droppable>
    </DragDropContext>
  );
};
