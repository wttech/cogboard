import {amber, blue, green, red} from "@material-ui/core/colors/index";

export const mapVariantToColor = (variant) => {
  switch(variant){
    case 'success':
      return green[300];
    case 'error':
      return red[800];
    case 'warning':
      return amber[700];
    default:
      return blue[100];
  }
};
