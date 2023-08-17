import React, { EventHandler, ChangeEvent, useState, useEffect } from "react";
import * as a1lib from "alt1";
import ChatboxReader from "alt1/chatbox";
import { useGetAttraction, useGetTier, useSetDisturbances, DEFAULT_DISTURBANCES } from "./hooks";
import { keys, map, range } from "lodash";

const EVENT_TEXT = {
  "wandering soul has spawned": "wandering",
  "cloud of sparkles has taken over": "sparkling",
  "shambling horror has spawned": "shambling",
  "corrupt glyphs have appeared": "corrupt",
  "storm of souls has taken over": "storm",
  "pool of miasma has appeared": "defile",
  "deathshead moth is drawn": "moth",
  "complete the ritual": "ritual",
  "tome of experience": "tome",
}

export default () => {
  const attraction = useGetAttraction();
  const tier = useGetTier();
  const [disturbances, setDisturbances] = useSetDisturbances();
  const [reader, setReader] = useState<ChatboxReader>();
  const [activeChatbox, setActiveChatbox] = useState<number>();

  const chooseActiveCheckbox: EventHandler<ChangeEvent<HTMLSelectElement>> = (event) => {
    setActiveChatbox(parseInt(event.target.value))
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

    findChat();
  }, []);

  useEffect(() => {
    if (reader && reader.pos && activeChatbox !== undefined) {
      reader.pos.mainbox = reader.pos.boxes[activeChatbox];
      alt1.overLayRect(
        a1lib.mixColor(255, 255, 255),
        reader.pos.mainbox.rect.x - 5,
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
    const readChatbox = () => {
      if (reader && reader.pos && activeChatbox !== undefined) {
        const chatLines = reader.read();
        const eventMessages = keys(EVENT_TEXT);
        const disturbancesForTier = disturbances[tier] ?? {};
        const disturbancesForAttraction = disturbancesForTier[attraction] ?? DEFAULT_DISTURBANCES;
        chatLines?.forEach(chatline => {
          const message = eventMessages.find(eventMessage => chatline.text.includes(eventMessage));
          if (EVENT_TEXT[message]) {
            disturbancesForAttraction[EVENT_TEXT[message]] += 1;
          }
        });

        disturbancesForTier[attraction] = disturbancesForAttraction;
        
        disturbances[tier] = disturbancesForTier;
        setDisturbances(disturbances);
      }
    }

    const interval = window.setInterval(readChatbox, 500);

    return () => window.clearInterval(interval);
  }, [reader, activeChatbox, disturbances, setDisturbances]);

  const chatboxOptions = map(range(0, reader?.pos?.boxes?.length ?? 0), (index) => {
    return <option key={index} value={index}>Chat {index}</option>;
  })

  return (
    <div>
      <div>
        <label>Active Chatbox:
          <select value={activeChatbox} onChange={chooseActiveCheckbox}>
            {chatboxOptions}
          </select>
        </label>
      </div>
      <div>
        <button disabled>Export</button>
        <button onClick={resetDisturbances}>Reset</button>
        Total Rituals: {disturbances?.[tier]?.[attraction]?.ritual}
      </div>
    </div>
  );
};
