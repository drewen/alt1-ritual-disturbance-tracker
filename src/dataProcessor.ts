import * as _ from "lodash";
import { Parser } from '@json2csv/plainjs';
import * as data from "../data/reports.json";
import { writeFileSync } from "fs";
import { join } from "path";

const DEFAULT_DISTURBANCES = {
  wandering: 0,
  sparkling: 0,
  shambling: 0,
  corrupt: 0,
  storm: 0,
  defile: 0,
  moth: 0,
  ritual: 0,
  tome: 0,
};

type RitualTier = "lesser" | "greater" | "powerful"

const consolidateDisturbancesByTierAttraction = (data: typeof DEFAULT_DISTURBANCES, disturbances: typeof DEFAULT_DISTURBANCES) => {
  const accumulator = {...DEFAULT_DISTURBANCES, ...data}
  _.forEach(disturbances, (count, disturbance) => {
    accumulator[disturbance] += count;
  });

  return accumulator;
}

const consolidateDisturbancesByTier = (data: Record<string, typeof DEFAULT_DISTURBANCES>, disturbancesForAttraction: Record<string, typeof DEFAULT_DISTURBANCES>) => {
  const accumulator = {...data}
  _.forEach(disturbancesForAttraction, (disturbances, attraction) => {
    accumulator[attraction] = consolidateDisturbancesByTierAttraction(accumulator[attraction], disturbances);
  });

  return accumulator;
}

const consolidateDisturbances = (data: Record<RitualTier, Record<string, typeof DEFAULT_DISTURBANCES>>, disturbancesForTier: Record<RitualTier, Record<string, typeof DEFAULT_DISTURBANCES>>) => {
  const accumulator = {...data};
  _.forEach(disturbancesForTier, (disturbances, tier) => {
    accumulator[tier] = consolidateDisturbancesByTier(accumulator[tier], disturbances);
  });

  return accumulator;
}

const consolidateData = (disturbances: Record<RitualTier, Record<string, typeof DEFAULT_DISTURBANCES>>[]) => {
  const data = _.reduce(disturbances, consolidateDisturbances, {} as any);

  const flattenedData = _.flatten(_.map(data, (disturbancesForTier, tier) => {
    return _.map(disturbancesForTier, (disturbancesForAttraction, attraction) => {
      disturbancesForAttraction.attraction = attraction;
      disturbancesForAttraction.tier = tier;
      return disturbancesForAttraction;
    });
  }));

  try {
    const opts = {};
    const parser = new Parser(opts);
    const csv = parser.parse(flattenedData);
    writeFileSync(join(__dirname, "../data/output.csv"), csv, 'utf8')
  } catch (err) {
    console.error(err);
  }
}

consolidateData(data as Record<RitualTier, Record<string, typeof DEFAULT_DISTURBANCES>>[])