import React from "react";
import { useGetDisturbances, useGetAttraction, useGetTier } from "./hooks";
import { map, sum } from "lodash";

const DISTURBANCE_MAP = {
  wandering: "Wandering Soul",
  sparkling: "Sparkling Glyph",
  shambling: "Shambling Horror",
  corrupt: "Corrupt Glyph",
  storm: "Soul Storm",
  defile: "Defile",
}

export default () => {
  const attraction = useGetAttraction();
  const tier = useGetTier();
  const disturbances = useGetDisturbances(attraction, tier);

  const total = sum(map(DISTURBANCE_MAP, (_name: string, key: string) => disturbances[key]));
  const disturbanceRows = map(DISTURBANCE_MAP, (textName: string, key: string) => {
    const count = disturbances[key];

    return (
      <tr key={key}>
        <td>{textName}</td>
        <td>{count}</td>
        <td>{(count / (total || 1) * 100).toFixed(2)}%</td>
      </tr>
    );
  });

  return (
    <>
      <table className="nistable">
        <thead>
          <tr>
            <th>Event</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {disturbanceRows}
          <tr>
            <td>Necromancer's Tome</td>
            <td>{disturbances.tome}</td>
            <td>{(disturbances.tome / (disturbances.defile || 1) * 100).toFixed(2)}%</td>
          </tr>
          <tr>
            <td>Deathshead Moth</td>
            <td>{disturbances.moth}</td>
            <td>{(disturbances.moth / (disturbances.ritual || 1) * 100).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
      
    </>
  );
};
