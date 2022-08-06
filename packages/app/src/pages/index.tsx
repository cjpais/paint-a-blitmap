import { getSVG } from "@exquisite-graphics/js";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import chroma from "chroma-js";
import type { NextPage } from "next";
import { useState } from "react";
import { gql } from "urql";

import { useBlitmapsQuery } from "../../codegen/subgraph";
import { Button } from "../Button";
import ColorPicker from "../components/ColorPicker";
import { MintButton } from "../MintButton";

// XQSTMAP
// BlitmapPaint
// XQSTBLITMAP
// use https://api.blitmap.com/v1/png/1 for image selector thing
// maybe entire preview of the color palette?

gql`
  query Blitmaps {
    blitmaps(first: 100, orderBy: tokenID, orderDirection: asc) {
      id
      name
      creator
      creatorName
      data
    }
  }
`;

const BLITMAP_PNG_URL = "https://api.blitmap.com/v1/png/";

type ColorData = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
};

const HomePage: NextPage = () => {
  const [blitmapIndex, setBlitmapIndex] = useState(0);

  const [query] = useBlitmapsQuery();
  const XQST_HEADER = "0120200004000000";

  const [colors, setColors] = useState<ColorData>({
    color1: "ff0cd3",
    color2: "000000",
    color3: "0000ff",
    color4: "00ff00",
  });

  const getPalette = () => {
    return `${colors.color1}${colors.color2}${colors.color3}${colors.color4}`;
  };

  const selectedBlitmap = query.data?.blitmaps[blitmapIndex];
  const selectedBlitmapData =
    selectedBlitmap?.data &&
    `${XQST_HEADER}${getPalette()}${selectedBlitmap?.data.slice(
      26 // take off 0x and then all of the colors which is 4 x 3 bytes = 12 * 2 = 24 for hex
    )}`;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="self-end p-2">
        <ConnectButton />
      </div>
      <div className="flex-grow flex flex-col gap-4 items-center justify-center p-8 pb-[50vh]">
        <h1 className="text-6xl font-bowlby-one">Paint a Blitmap</h1>

        <div className="flex gap-4">
          <h3 className="text-xl">Title: {selectedBlitmap?.name}</h3>
          <h3 className="text-xl">Artist: {selectedBlitmap?.creatorName}</h3>
          <h3 className="text-xl">Minted: 0/16</h3>
        </div>

        <div className="flex md:flex-row flex-col gap-5">
          <div className="grid grid-cols-5 gap-3 overflow-y-scroll w-128 h-128">
            {/* TODO: change to opacity-10 if minted out, disable button? */}
            {Array.from(Array(100).keys()).map((i) => (
              <div
                key={i}
                className={`${
                  i === Number(blitmapIndex) ? "border-4 border-green-400" : ""
                }`}
              >
                <img
                  src={`${BLITMAP_PNG_URL}${i}`}
                  width="100%"
                  height="100%"
                  onClick={() => setBlitmapIndex(i)}
                  className=""
                  alt={`image ${i} from blitmap`}
                ></img>
              </div>
            ))}
          </div>

          {selectedBlitmapData && (
            <div>
              <img
                src={`data:image/svg+xml;base64,${Buffer.from(
                  getSVG(selectedBlitmapData)
                ).toString("base64")}`}
                className="h-128 w-128"
                alt={`the image of the painted blitmap`}
              ></img>
            </div>
          )}
        </div>

        {/* <div>
          <label>Blitmap ID</label>
          <input
            type="number"
            id="blitid"
            name="blitid"
            min="0"
            max="99"
            onChange={(v) => setBlitmapIndex(v.target.value)}
          />
        </div> */}

        <div className="flex gap-6">
          <ColorPicker
            color={colors.color1}
            onChange={(c) => setColors({ ...colors, color1: c.slice(1) })}
          />
          <ColorPicker
            color={colors.color2}
            onChange={(c) => setColors({ ...colors, color2: c.slice(1) })}
          />
          <ColorPicker
            color={colors.color3}
            onChange={(c) => setColors({ ...colors, color3: c.slice(1) })}
          />
          <ColorPicker
            color={colors.color4}
            onChange={(c) => setColors({ ...colors, color4: c.slice(1) })}
          />
        </div>

        {/* Use isMounted to temporarily workaround hydration issues where
        server-rendered markup doesn't match the client due to localStorage
        caching in wagmi. See https://github.com/holic/web3-scaffold/pull/26 */}
        {/* <p>
          {(isMounted ? totalSupply.data?.toNumber().toLocaleString() : null) ??
            "??"}
          /
          {(isMounted ? maxSupply.data?.toNumber().toLocaleString() : null) ??
            "??"}{" "}
          minted
        </p> */}

        <div className="flex gap-4">
          <Button
            className="bg-slate-200"
            onClick={() => {
              setColors({
                color1: chroma.random().hex().replace("#", ""),
                color2: chroma.random().hex().replace("#", ""),
                color3: chroma.random().hex().replace("#", ""),
                color4: chroma.random().hex().replace("#", ""),
              });
            }}
          >
            <img src="dice.svg" className="w-12 h-12" alt="an image of dice" />
          </Button>
          <MintButton />
        </div>
        {/* <Inventory /> */}
      </div>
    </div>
  );
};

export default HomePage;
