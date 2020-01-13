export function dashboardNameGen(name = "Dashboard") {
  return name + Date.now().toString();
}

export const columnEdgeValues = ["3", "4", "20", "21"];

export const switchIntervalEdgeValues = ["2", "3"];

export const dashboardNames = [
  dashboardNameGen(),
  "Long Dashboard Name Input. It has exactly 51 chars."
];
