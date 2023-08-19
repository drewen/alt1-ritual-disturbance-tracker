import React, { EventHandler, ChangeEvent, useState, useEffect } from "react";
import * as a1lib from "alt1";
import ChatboxReader from "alt1/chatbox";
import { useSetAttraction, useSetTier, useSetDisturbances, RitualTier, DEFAULT_DISTURBANCES } from "./hooks";
import { keys, map, range } from "lodash";

const EVENT_TEXT = {
  "wandering soul has spawned": "wandering",
  "cloud of sparkles has taken over": "sparkling",
  "shambling horror has spawned": "shambling",
  "corrupt glyphs have appeared": "corrupt",
  "corrupt giyphs have appeared": "corrupt",
  "storm of souls has taken over": "storm",
  "pool of miasma has appeared": "defile",
  "deathshead moth is drawn": "moth",
  "complete the ritual": "ritual",
  "is added to your backpack: 1 x Necromancer": "tome",
}

export default () => {
  const [attraction, setAttraction] = useSetAttraction();
  const [tier, setTier] = useSetTier();
  const [disturbances, setDisturbances] = useSetDisturbances();
  const [exportUrl, setExportUrl] = useState("");
  const [exportFilename, setExportFilename] = useState("");
  const [reader, setReader] = useState<ChatboxReader>();
  const [activeChatbox, setActiveChatbox] = useState<number>();

  const chooseActiveCheckbox: EventHandler<ChangeEvent<HTMLSelectElement>> = (event) => {
    setActiveChatbox(parseInt(event.target.value))
  }

  const chooseTier: EventHandler<ChangeEvent<HTMLSelectElement>> = (event) => {
    setTier(event.target.value as RitualTier)
  }

  const chooseAttraction: EventHandler<ChangeEvent<HTMLInputElement>> = (event) => {
    setAttraction(parseInt(event.target.value))
  }

  const resetDisturbances = () => {
    setDisturbances({});
  }

  useEffect(() => {
    const reader = new ChatboxReader();

    reader.readargs = {
      colors: [
        a1lib.mixColor(255, 255, 255), // White text
        a1lib.mixColor(0, 255, 0), // Green ritual Text
      ],
    };

    setReader(reader);
    const findChat = () => {
      if (reader) {
        if (!reader.pos) {
          reader.find();
          window.setTimeout(findChat, 500);
        } else if (activeChatbox === undefined) {
          setActiveChatbox(0);
        }
      }
    }

    window.setTimeout(findChat, 500)
  }, []);

  useEffect(() => {
    if (reader && reader.pos && activeChatbox !== undefined) {
      reader.pos.mainbox = reader.pos.boxes[activeChatbox];
      alt1.overLayRect(
        a1lib.mixColor(255, 255, 255),
        reader.pos.mainbox.rect.x - 4,
        reader.pos.mainbox.rect.y - 25,
        reader.pos.mainbox.rect.width + 20,
        reader.pos.mainbox.rect.height + 20,
        2000,
        2
      );

      setReader(reader);
    }
  }, [activeChatbox]);

  useEffect(() => {
    let timeout
    const readChatbox = () => {
      if (reader && reader.pos && activeChatbox !== undefined) {
        const chatLines = reader.read();
        const eventMessages = keys(EVENT_TEXT);
        const disturbancesForTier = disturbances[tier] ?? {};
        const disturbancesForAttraction = disturbancesForTier[attraction] ?? DEFAULT_DISTURBANCES;
        let newEvents = false;
        chatLines?.forEach(chatline => {
          if ((window as any).DEBUG) {
            console.log(chatline.text)
          }
          const message = eventMessages.find(eventMessage => chatline.text.includes(eventMessage));
          if (EVENT_TEXT[message]) {
            disturbancesForAttraction[EVENT_TEXT[message]] += 1;
            newEvents = true;
          }
        });

        if (newEvents) {
          disturbancesForTier[attraction] = disturbancesForAttraction;
          disturbances[tier] = disturbancesForTier;
          setDisturbances(disturbances);
        }
      }

      timeout = window.setTimeout(readChatbox, 1000);
    }

    readChatbox();

    return () => window.clearTimeout(timeout);
  }, [reader, activeChatbox, disturbances, setDisturbances]);

  useEffect(() => {
    const filedata = new Blob([JSON.stringify(disturbances)], { type: "application/json" });
    setExportUrl(URL.createObjectURL(filedata));
    const currentTimestamp = (new Date()).toISOString();
    setExportFilename(`disturbances-${currentTimestamp}.json`)
  }, [disturbances])

  const chatboxOptions = map(range(0, reader?.pos?.boxes?.length ?? 0), (index) => {
    return <option key={index} value={index}>Chat {index}</option>;
  })

  return (
    <div>
      <table>
        <tbody>

          <tr>
            <td>Ritual Tier</td>
            <td>
              <select className="nisdropdown" value={tier} onChange={chooseTier}>
                <option>lesser</option>
                <option>greater</option>
                <option>powerful</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Soul Attraction</td>
            <td>
              <input className="nisinput" value={attraction} onChange={chooseAttraction} type="number" min="100" max="2000" />%
            </td>
          </tr>
          <tr>
            <td>Active Chatbox</td>
            <td>
              <select className="nisdropdown" value={activeChatbox} onChange={chooseActiveCheckbox}>
                {chatboxOptions}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <a href={exportUrl} download={exportFilename}>
          <button className="nisbutton nissmallbutton">Export</button>
        </a>
        <button onClick={resetDisturbances} className="nisbutton nissmallbutton">Reset</button>
        Rituals: {disturbances?.[tier]?.[attraction]?.ritual}
      </div>
    </div>
  );
};
