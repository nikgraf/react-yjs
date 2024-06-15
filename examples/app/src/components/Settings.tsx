import React from "react";
import { useY } from "react-yjs";
import * as Y from "yjs";

export const Settings: React.FC = () => {
  const [ySettings] = React.useState(() => {
    // initialize a Y.Doc and get the settings
    // when the component mounts
    const yDoc = new Y.Doc();
    const ySettings = yDoc.getMap("settings");
    ySettings.set("weeklyReminderEmail", true);
    return ySettings;
  });

  const settings = useY(ySettings);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={settings.weeklyReminderEmail}
          onChange={(event) => {
            ySettings.set("weeklyReminderEmail", event.currentTarget.checked);
          }}
        />
        Weekly Reminder Email
      </label>
      <div>Result: {JSON.stringify(settings, null, 2)}</div>
    </>
  );
};
