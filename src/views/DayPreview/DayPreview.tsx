import React from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  date: string;
}

const DayPreview = () => {
  const { date } = useParams<ParamTypes>();

  return <div>{date}</div>;
};

export default DayPreview;
