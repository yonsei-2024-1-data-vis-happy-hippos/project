import { boxScatteredPlotCircleRadius } from "../constant.js";

export const drawBoxPlot = (root, data, ageScale, teamScale, team) => {
  const q1 = d3.quantile(data.sort(d3.ascending), 0.25);
  const median = d3.quantile(data.sort(d3.ascending), 0.5);
  const q3 = d3.quantile(data.sort(d3.ascending), 0.75);
  const interQuantileRange = q3 - q1;
  const min = q1 - 1.5 * interQuantileRange;
  const max = q3 + 1.5 * interQuantileRange;
  const notOutliers = data.filter((d) => d >= min && d <= max);
  const notOutlierMin = Math.min(...notOutliers);
  const notOutlierMax = Math.max(...notOutliers);

  const box = root.append("g").attr("class", "box");
  const yMiddle = teamScale(team) + teamScale.bandwidth() / 2;
  const yBottom = yMiddle - boxScatteredPlotCircleRadius;
  const yTop = yMiddle + boxScatteredPlotCircleRadius;

  // Draw center line
  box
    .append("line")
    .attr("x1", ageScale(notOutlierMin))
    .attr("x2", ageScale(notOutlierMax))
    .attr("y1", yMiddle)
    .attr("y2", yMiddle)
    .style("stroke", "black");

  // Draw box
  box
    .append("rect")
    .attr("x", ageScale(q1))
    .attr("width", ageScale(q3) - ageScale(q1))
    .attr("y", yBottom)
    .attr("height", boxScatteredPlotCircleRadius * 2)
    .attr("fill", "white")
    .attr("fill-opacity", 0.7)
    .attr("stroke", "black");

  // Draw median line
  box
    .append("line")
    .attr("x1", ageScale(median))
    .attr("x2", ageScale(median))
    .attr("y1", yBottom)
    .attr("y2", yTop)
    .style("stroke", "black");

  // Draw min line
  box
    .append("line")
    .attr("x1", ageScale(notOutlierMin))
    .attr("x2", ageScale(notOutlierMin))
    .attr("y1", yBottom)
    .attr("y2", yTop)
    .style("stroke", "black");

  // Draw max line
  box
    .append("line")
    .attr("x1", ageScale(notOutlierMax))
    .attr("x2", ageScale(notOutlierMax))
    .attr("y1", yBottom)
    .attr("y2", yTop)
    .style("stroke", "black");
};
