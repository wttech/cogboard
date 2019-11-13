import { sortByKey } from '../../../helpers';

export const parseWidgetTypes = ( widgetTypes ) => {
  const sortedWidgetTypes = sortByKey(widgetTypes, 'name')

  return Object.entries(sortedWidgetTypes).reduce((obj, [type, { name }]) => {
    return [
      ...obj, 
      {
        display: name,
        value: type
      }
    ]
  }, [])
}