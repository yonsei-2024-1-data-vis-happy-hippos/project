import {
  ageIndex,
  salaryIndex,
  tooltipHeight,
  tooltipWidth,
} from "../constant.js";

export const drawSalary = (root, ageScale, data) => {
  const salaryScale = d3
    .scaleLinear()
    .domain([0, 10000000])
    .range([tooltipHeight, 0]);

  root
    .append("g")
    .attr("transform", `translate(${tooltipWidth}, 0)`)
    .call(d3.axisRight(salaryScale));

  root
    .append("g")
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d) => ageScale(d[ageIndex]))
    .attr("y", (d) => salaryScale(d[salaryIndex]))
    .attr("width", ageScale.bandwidth())
    .attr("height", (d) => tooltipHeight - salaryScale(d[salaryIndex]))
    .attr("fill", "#69b3a2");
};
