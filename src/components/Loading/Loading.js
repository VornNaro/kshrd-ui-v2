import React from "react";
import { LoopCircleLoading } from "react-loadingg";

//TODO: This function is created for loading while waiting for data
export default function Loading() {
  return <LoopCircleLoading color="#0A5695" style={{ marginLeft: "30%" }} />;
}
