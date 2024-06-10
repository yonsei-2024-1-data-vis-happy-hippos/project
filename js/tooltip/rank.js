import {
  ageIndex,
  positionIndex,
  ratingIndex,
  tooltipHeight,
} from "../common/constant.js";

function statMetadataObject(statPicker, color, ranker) {
  return {
    picker: (standardRow, defenseRow, passingRow, shootingRow) =>
      ranker(statPicker(standardRow, defenseRow, passingRow, shootingRow)),
    color: color,
  };
}

const statMetadata = {
  "슈팅당 득점율": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) =>
      shootingRow["G/Sh"] == "" ? 0 : parseFloat(shootingRow["G/Sh"]),
    "#00BFFF",
    (value) => {
      if (value >= 0.11) return 1;
      if (value >= 0.105) return 2;
      if (value >= 0.1) return 3;
      if (value >= 0.095) return 4;
      if (value >= 0.09) return 5;
      if (value >= 0.085) return 6;
      if (value >= 0.08) return 7;
      if (value >= 0.075) return 8;
      return 9;
    }
  ),
  유효슈팅률: statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => (
      shootingRow["G/Sot"] == "" ? 0 : parseFloat(shootingRow["G/Sot"]),
      standardRow[positionIndex]
    ),
    "#DC143C",
    (value, position) => {
      if (position == "FW" || position == "MF") {
        if (value >= 0.495) return 1;
        if (value >= 0.485) return 2;
        if (value >= 0.475) return 3;
        if (value >= 0.465) return 4;
        if (value >= 0.455) return 5;
        if (value >= 0.445) return 6;
        if (value >= 0.435) return 7;
        if (value >= 0.425) return 8;
        return 9;
      } else {
        if (value >= 0.399) return 1;
        if (value >= 0.378) return 2;
        if (value >= 0.358) return 3;
        if (value >= 0.337) return 4;
        if (value >= 0.317) return 5;
        if (value >= 0.296) return 6;
        if (value >= 0.276) return 7;
        if (value >= 0.255) return 8;
        return 9;
      }
    }
  ),
};

const positionToStat = {
  FW: ["슈팅당 득점율", "유효슈팅률"],
  MF: ["슈팅당 득점율", "유효슈팅률"],
  DF: ["슈팅당 득점율", "유효슈팅률"],
  GK: ["슈팅당 득점율"],
};

export const drawRank = (
  root,
  ageScale,
  standardData,
  defenseData,
  passingData,
  shootingData
) => {
  const rankScale = getScale();

  // Draw axis
  root.append("g").call(d3.axisLeft(rankScale));

  const positions = Array.from(
    new Set(standardData.flatMap((row) => row[positionIndex].split(",")))
  );

  const stats = Array.from(
    new Set(positions.flatMap((position) => positionToStat[position]))
  );

  for (const stat of stats) {
    const metadata = statMetadata[stat];

    // Draw dots
    root
      .append("g")
      .selectAll("circle")
      .data(standardData)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (d) => ageScale(d[ageIndex]) + ageScale.bandwidth() / 2)
      .attr("cy", (d, i) =>
        rankScale(
          metadata.picker(d, defenseData[i], passingData[i], shootingData[i])
        )
      )
      .attr("fill", metadata.color);

    // Draw line
    const line = getLine(
      ageScale,
      rankScale,
      standardData,
      defenseData,
      passingData,
      shootingData,
      metadata.picker
    );
    root
      .append("path")
      .attr("d", line)
      .attr("stroke", metadata.color)
      .attr("fill", "transparent");
  }
};

function getLine(
  ageScale,
  rankScale,
  standardData,
  defenseData,
  passingData,
  shootingData,
  picker
) {
  return d3
    .line()
    .x((d) => ageScale(d[ageIndex]) + ageScale.bandwidth() / 2)
    .y((d, i) =>
      rankScale(picker(d, defenseData[i], passingData[i], shootingData[i]))
    )(standardData);
}

function getScale() {
  return d3.scaleLinear().domain([1, 9]).range([0, tooltipHeight]);
}
