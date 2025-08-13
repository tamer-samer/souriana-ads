import * as React from "react";
const Arrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={1280} height={720} {...props}>
    <title>{"Arrow"}</title>
    <path
      d="M867.1 328.4c-129.5-51.6-281.4-45-405.4 18.8-32.5 16.8-66.2 41.7-70.7 78"
      style={{
        fill: "none",
        stroke: "#fff",
        strokeMiterlimit: 10,
        strokeWidth: 4,
        strokeDasharray: "12,12",
      }}
    />
    <path
      d="M889.3 338c-12.1-.6-27.9.5-38.9 4.1l13.8-14.8 1.1-20.2c5 10.4 15.2 22.5 24 30.9z"
      style={{
        fill: "#fff",
      }}
    />
  </svg>
);
export default Arrow;
