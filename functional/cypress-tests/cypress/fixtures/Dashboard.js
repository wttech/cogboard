export function dashboardNameGen(name = "Dashboard") {
  return name + Date.now().toString();
}

export let columnEdgeValues = ["3", "4", "20", "21"];

export let switchIntervalEdgeValues = ["2", "3"];

export let dashboardNames = [
  dashboardNameGen(),
  "Long Dashboard Name Input. It has exactly 51 chars."
];
