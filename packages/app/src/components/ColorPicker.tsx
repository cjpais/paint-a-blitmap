import React, { useCallback, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

import useClickOutside from "../useClickOutside";

const ColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (c: string) => void;
}) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  console.log(color);

  return (
    <div className="picker">
      <div
        className={`w-16 h-16 border-3 border-slate-100`}
        style={{ backgroundColor: `#${color}` }}
        onClick={() => toggle(true)}
      />

      {isOpen ? (
        <div
          style={{
            position: "absolute",
            borderRadius: "9px",
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          }}
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      ) : (
        <HexColorInput
          color={`#${color}`}
          onChange={onChange}
          className="w-16 font-bold"
        />
      )}
    </div>
  );
};

export default ColorPicker;
