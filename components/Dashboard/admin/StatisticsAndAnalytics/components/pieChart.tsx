"use client";

// import ReactECharts from "echarts-for-react";

const EChartsPieChart = ({ option }: any) => {
  const chartContainerStyle = {
    width: "100%",
    height: "400px",
    border: "1px solid #fff",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "start", // Agregar espacio entre el gráfico y la leyenda
  };

  return (
    <div style={chartContainerStyle}>
      {/* <ReactECharts option={option} style={{ flex: 1 }} /> */}
    </div>
  );
};



export default EChartsPieChart;
