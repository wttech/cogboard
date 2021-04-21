export function dashboardNameGen(name = 'Dashboard') {
  return `${name}_${Date.now().toString()}`;
}

export const columnEdgeValues = ['3', '4', '20', '21'];

export const switchIntervalEdgeValues = ['2', '3'];

export const dashboardTypes = {
  widgets: 'Widget Board',
  iframe: 'Iframe Board',
};
