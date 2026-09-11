"use client";

// import ReactECharts, { EChartsOption } from "echarts-for-react";

// interface EChartsCommonProps {
//   option: EChartsOption;
// }

// const EChartsCommon: React.FC<EChartsCommonProps> = ({ option }) => {
//   const chartContainerStyle = {
//     width: "100%",
//     height: "400px",
//     padding: "20px",
//     border: "1px solid #fff", // Add a white border around the chart
//     backgroundColor: "white", // Set a white background color for the chart
//     borderRadius: "10px",
//   };
//   const modifiedOption = {
//     ...option,
//     yAxis: {
//       ...option.yAxis,
//       name: "Traffic",
//       nameTextStyle: {
//         fontWeight: "bold",
//         color: "#FF6A18",
//         align: "center", // Center the label text
//         verticalAlign: "middle", // Vertically center the label text
//         padding: [0, 0, 10, 0], // Add padding to position the label
//       },
//     },
//     series: option.series.map((seriesItem: any) => ({
//       ...seriesItem,
//       barWidth: 18,
//       itemStyle: {
//         color: "#FF6A18", // Set the bar color to #FF6A18
//       },
//     })),
//   };
//   return (
//     <div style={chartContainerStyle}>
//       <ReactECharts option={modifiedOption} />
//     </div>
//   );
// };

// export default EChartsCommon;
