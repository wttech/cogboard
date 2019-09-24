import React from "react";
import { CheckCircle, Error, Info, Warning } from "@material-ui/icons";

const IconVariant = ({ variant }) => {
  const iconByVariant = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info,
  };

  const Icon = variant in iconByVariant ? iconByVariant[variant] : iconByVariant['info'];

  return <Icon />;
};

export default IconVariant;