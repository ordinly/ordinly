import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data }) => (
  <ResponsivePie
    data={data}
    colors={{ datum: "data.color" }}
    margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
    startAngle={0}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.2]],
    }}
    enableArcLinkLabels={false}
    arcLabel={(dataPoint) => `${dataPoint.id} (${dataPoint.value})`}
    arcLabelsSkipAngle={20}
    arcLabelsTextColor="white"
    transitionMode="pushIn"
    legends={[
      {
        anchor: "top-left",
        direction: "column",
        justify: false,
        translateX: 4,
        translateY: 0,
        itemWidth: 111,
        itemHeight: 20,
        itemsSpacing: 8,
        symbolSize: 20,
        itemDirection: "left-to-right",
      },
    ]}
  />
);

export default PieChart;
