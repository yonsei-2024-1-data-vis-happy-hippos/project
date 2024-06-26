import { ageIndex, positionIndex, tooltipHeight } from "../common/constant.js";

function statMetadataObject(statPicker, color, ranker) {
  return {
    picker: (standardRow, defenseRow, passingRow, shootingRow) =>
      ranker(statPicker(standardRow, defenseRow, passingRow, shootingRow)),
    color: color,
  };
}

const statMetadata = {
  "Goals/Shot": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) =>
      parseCsvFloat(shootingRow["G/Sh"]),
    "#1f77b4",
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
  "Shot on Target %": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => [
      parseCsvFloat(shootingRow["SoT%"]) / 100,
      standardRow[positionIndex].split(",")[0],
    ],
    "#ff7f0e",
    ([value, position]) => {
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
  "Goals/Shot on Target": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) =>
      parseCsvFloat(shootingRow["G/SoT"]),
    "#2ca02c",
    (value) => {
      if (value >= 0.495) return 1;
      if (value >= 0.485) return 2;
      if (value >= 0.475) return 3;
      if (value >= 0.465) return 4;
      if (value >= 0.455) return 5;
      if (value >= 0.445) return 6;
      if (value >= 0.435) return 7;
      if (value >= 0.425) return 8;
      return 9;
    }
  ),
  "Assists/Matches Played": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => {
      const assists = parseCsvFloat(standardRow["Ast"]);
      const matchesPlayed = parseCsvFloat(standardRow["MP"]);
      return [
        matchesPlayed == 0 ? 0 : assists / matchesPlayed,
        standardRow[positionIndex].split(",")[0],
      ];
    },
    "#d62728",
    ([value, position]) => {
      if (position == "FW") {
        if (value >= 0.196) return 1;
        if (value >= 0.185) return 2;
        if (value >= 0.175) return 3;
        if (value >= 0.164) return 4;
        if (value >= 0.154) return 5;
        if (value >= 0.143) return 6;
        if (value >= 0.133) return 7;
        if (value >= 0.012) return 8;
        return 9;
      } else {
        if (value >= 0.065) return 1;
        if (value >= 0.06) return 2;
        if (value >= 0.056) return 3;
        if (value >= 0.051) return 4;
        if (value >= 0.047) return 5;
        if (value >= 0.042) return 6;
        if (value >= 0.038) return 7;
        if (value >= 0.033) return 8;
        return 9;
      }
    }
  ),
  "Passes Completed/Passes Attempted": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => {
      const completed = parseCsvFloat(passingRow["Cmp"]);
      const attempted = parseCsvFloat(passingRow["Att"]);
      return [
        attempted == 0 ? 0 : completed / attempted,
        standardRow[positionIndex].split(",")[0],
      ];
    },
    "#9467bd",
    ([value, position]) => {
      if (position == "FW" || position == "MF") {
        if (value >= 0.763) return 1;
        if (value >= 0.759) return 2;
        if (value >= 0.755) return 3;
        if (value >= 0.751) return 4;
        if (value >= 0.747) return 5;
        if (value >= 0.743) return 6;
        if (value >= 0.739) return 7;
        if (value >= 0.735) return 8;
        return 9;
      } else {
        if (value >= 0.793) return 1;
        if (value >= 0.788) return 2;
        if (value >= 0.783) return 3;
        if (value >= 0.778) return 4;
        if (value >= 0.773) return 5;
        if (value >= 0.768) return 6;
        if (value >= 0.763) return 7;
        if (value >= 0.758) return 8;
        return 9;
      }
    }
  ),
  "Shots Blocked/Matches Played": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => {
      const blocked = parseCsvFloat(defenseRow["Sh"]);
      const matches = parseCsvFloat(standardRow["MP"]);
      return [
        matches == 0 ? 0 : blocked / matches,
        standardRow[positionIndex].split(",")[0],
      ];
    },
    "#8c564b",
    ([value, position]) => {
      if (position == "FW" || position == "MF") {
        if (value >= 0.073) return 1;
        if (value >= 0.068) return 2;
        if (value >= 0.063) return 3;
        if (value >= 0.058) return 4;
        if (value >= 0.053) return 5;
        if (value >= 0.048) return 6;
        if (value >= 0.043) return 7;
        if (value >= 0.038) return 8;
        return 9;
      } else {
        if (value >= 0.426) return 1;
        if (value >= 0.411) return 2;
        if (value >= 0.395) return 3;
        if (value >= 0.38) return 4;
        if (value >= 0.364) return 5;
        if (value >= 0.349) return 6;
        if (value >= 0.333) return 7;
        if (value >= 0.318) return 8;
        return 9;
      }
    }
  ),
  "Passes Blocked/Matches Played": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => {
      const blocked = parseCsvFloat(defenseRow["Pass"]);
      const matches = parseCsvFloat(standardRow["MP"]);
      return [
        matches == 0 ? 0 : blocked / matches,
        standardRow[positionIndex].split(",")[0],
      ];
    },
    "#e377c2",
    ([value, position]) => {
      if (position == "FW") {
        if (value >= 2.27) return 1;
        if (value >= 2.192) return 2;
        if (value >= 2.114) return 3;
        if (value >= 2.036) return 4;
        if (value >= 1.958) return 5;
        if (value >= 1.88) return 6;
        if (value >= 1.802) return 7;
        if (value >= 1.724) return 8;
        return 9;
      } else if (position == "MF") {
        if (value >= 4.55) return 1;
        if (value >= 4.541) return 2;
        if (value >= 4.533) return 3;
        if (value >= 4.524) return 4;
        if (value >= 4.516) return 5;
        if (value >= 4.507) return 6;
        if (value >= 4.499) return 7;
        if (value >= 4.49) return 8;
        return 9;
      } else {
        if (value >= 9.771) return 1;
        if (value >= 9.614) return 2;
        if (value >= 9.457) return 3;
        if (value >= 9.3) return 4;
        if (value >= 9.143) return 5;
        if (value >= 8.986) return 6;
        if (value >= 8.829) return 7;
        if (value >= 8.671) return 8;
        return 9;
      }
    }
  ),
  "Interceptions/Matches Played": statMetadataObject(
    (standardRow, defenseRow, passingRow, shootingRow) => {
      const intercepted = parseCsvFloat(defenseRow["Int"]);
      const matches = parseCsvFloat(standardRow["MP"]);
      return [
        matches == 0 ? 0 : intercepted / matches,
        standardRow[positionIndex].split(",")[0],
      ];
    },
    "#7f7f7f",
    ([value, position]) => {
      if (position == "FW") {
        if (value >= 0.835) return 1;
        if (value >= 0.804) return 2;
        if (value >= 0.774) return 3;
        if (value >= 0.743) return 4;
        if (value >= 0.713) return 5;
        if (value >= 0.682) return 6;
        if (value >= 0.652) return 7;
        if (value >= 0.621) return 8;
        return 9;
      } else {
        if (value >= 1.748) return 1;
        if (value >= 1.72) return 2;
        if (value >= 1.691) return 3;
        if (value >= 1.662) return 4;
        if (value >= 1.634) return 5;
        if (value >= 1.605) return 6;
        if (value >= 1.577) return 7;
        if (value >= 1.548) return 8;
        return 9;
      }
    }
  ),
};

const positionToStat = {
  FW: [
    "Goals/Shot",
    "Shot on Target %",
    "Goals/Shot on Target",
    "Assists/Matches Played",
    "Passes Completed/Passes Attempted",
    "Shots Blocked/Matches Played",
    "Passes Blocked/Matches Played",
    "Interceptions/Matches Played",
  ],
  MF: [
    "Goals/Shot",
    "Shot on Target %",
    "Goals/Shot on Target",
    "Assists/Matches Played",
    "Passes Completed/Passes Attempted",
    "Shots Blocked/Matches Played",
    "Passes Blocked/Matches Played",
    "Interceptions/Matches Played",
  ],
  DF: [
    "Goals/Shot",
    "Shot on Target %",
    "Goals/Shot on Target",
    "Assists/Matches Played",
    "Passes Completed/Passes Attempted",
    "Shots Blocked/Matches Played",
    "Passes Blocked/Matches Played",
    "Interceptions/Matches Played",
  ],
  GK: [
    "Goals/Shot",
    "Goals/Shot on Target",
    "Passes Completed/Passes Attempted",
  ],
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

  const statScale = getStatScale(stats, statMetadata);
  drawLegend(root.append("g"), statScale);

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
      .attr("fill", statScale(stat));

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
      .attr("stroke", statScale(stat))
      .attr("fill", "transparent");
  }
};

function getStatScale(stats, statMetadata) {
  return d3
    .scaleOrdinal()
    .domain(stats)
    .range(stats.map((stat) => statMetadata[stat].color));
}

function drawLegend(root, statScale) {
  const legend = d3
    .legendColor()
    .shape("square")
    .shapePadding(100)
    .orient("horizontal")
    .scale(statScale);

  const legendAxis = root.call(legend).attr("transform", `translate(0, 300)`);

  legendAxis
    .selectAll(".label")
    .attr("transform", `translate(20, 10)`)
    .attr("style", null)
    .style("font-size", "12px");

  legendAxis
    .selectAll(".swatch")
    .style("width", "12px")
    .style("height", "12px");
}

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

function parseCsvFloat(value) {
  return value == "" ? 0 : parseFloat(value);
}
