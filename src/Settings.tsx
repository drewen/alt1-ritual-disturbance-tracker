import React, { EventHandler, ChangeEvent } from "react";
import { RitualTier, useSetAttraction, useSetTier } from "./hooks";

export default () => {
  const [tier, setTier] = useSetTier();
  const [attraction, setAttraction] = useSetAttraction();

  const chooseTier: EventHandler<ChangeEvent<HTMLSelectElement>> = (event) => {
    setTier(event.target.value as RitualTier)
  }

  const chooseAttraction: EventHandler<ChangeEvent<HTMLInputElement>> = (event) => {
    setAttraction(parseInt(event.target.value))
  }

  return (
    <div>
      {/* <div>
        <label>Active Chatbox:
          <select>
            <option value="0">Chat 0</option>
          </select>
        </label>
      </div> */}
      <div>
        <label>Ritual Tier:
          <select value={tier} onChange={chooseTier}>
            <option>lesser</option>
            <option>greater</option>
            <option>powerful</option>
          </select>
        </label>
      </div>
      <div>
        <label>Soul Attraction:
          <input value={attraction} onChange={chooseAttraction} type="number" min="100" max="2000" />%
        </label>
      </div>
    </div>
  );
};