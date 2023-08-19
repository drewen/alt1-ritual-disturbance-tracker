
import { useLocalStorage } from "usehooks-ts";

export const DEFAULT_DISTURBANCES = {
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

export type Disturbance = keyof typeof DEFAULT_DISTURBANCES

export const useGetDisturbances = (attraction: number, tier: RitualTier) => {
  const [ritualDisturbances] = useLocalStorage('ritualDisturbances', {});

  const disturbancesForTier = ritualDisturbances[tier] ?? {};
  const disturbancesForAttraction = disturbancesForTier[attraction] ?? {...DEFAULT_DISTURBANCES};

  return disturbancesForAttraction
}

export const useSetDisturbances = () => {
  return useLocalStorage('ritualDisturbances', {});
}

export const useGetAttraction = () => {
  const [attraction] = useLocalStorage('ritualSoulAttraction', 100);

  return attraction
}

export const useSetAttraction = () => {
  return useLocalStorage('ritualSoulAttraction', 100);
}


export type RitualTier = "lesser" | "greater" | "powerful"
export const useGetTier = () => {
  const [tier] = useLocalStorage<RitualTier>('ritualTier', "lesser");

  return tier
}

export const useSetTier = () => {
  return useLocalStorage<RitualTier>('ritualTier', "lesser");
}