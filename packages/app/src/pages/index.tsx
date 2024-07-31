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
import { usePainterizer } from "../useColor";

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

const getRandomColor = () => chroma.random().hex().toString().replace("#", "");

const BLITMAP_PNG_URL = "https://api.blitmap.com/v1/png/";
const XQST_HEADER = "0120200004000000";

const HomePage: NextPage = () => {
  const [query] = useBlitmapsQuery();
  const { colors, selectedBlitmap, setColor, setColors, setSelectedBlitmap } =
    usePainterizer();

  const getPalette = () => {
    return `${colors.join("")}`;
  };

  const blitmap = query.data?.blitmaps[selectedBlitmap];
  const selectedBlitmapData =
    blitmap?.data &&
    `${XQST_HEADER}${getPalette()}${blitmap?.data.slice(
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
          <h3 className="text-xl">Title: {blitmap?.name}</h3>
          <h3 className="text-xl">Artist: {blitmap?.creatorName}</h3>
          <h3 className="text-xl">Minted: 0/16</h3>
        </div>

        <div className="flex md:flex-row flex-col gap-5">
          <div className="">
            <h4 className="text-xl font-bowlby-one">Select a Blitmap</h4>
            <div className="grid grid-cols-5 gap-3 w-128 h-128 overflow-y-auto ">
              {/* TODO: change to opacity-10 if minted out, disable button? */}
              {Array.from(Array(100).keys()).map((i) => (
                <div
                  key={i}
                  className={`${
                    i === selectedBlitmap ? "border-8 border-green-400" : ""
                  }`}
                >
                  <img
                    src={`${BLITMAP_PNG_URL}${i}`}
                    width="100%"
                    height="100%"
                    onClick={() => setSelectedBlitmap(i)}
                    className=""
                    alt={`image ${i} from blitmap`}
                  ></img>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h4 className="text-xl font-bowlby-one">Repainterizer</h4>
            <div className="flex gap-4">
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
              <div className="flex flex-col gap-6">
                <ColorPicker
                  color={colors[0]}
                  onChange={(c) => {
                    setColor(c, 0);
                  }}
                />
                <ColorPicker
                  color={colors[1]}
                  onChange={(c) => setColor(c, 1)}
                />
                <ColorPicker
                  color={colors[2]}
                  onChange={(c) => setColor(c, 2)}
                />
                <ColorPicker
                  color={colors[3]}
                  onChange={(c) => setColor(c, 3)}
                />

                <Button
                  className="bg-slate-300"
                  onClick={() => {
                    setColors([
                      getRandomColor(),
                      getRandomColor(),
                      getRandomColor(),
                      getRandomColor(),
                    ]);
                  }}
                >
                  <img
                    src="dice.svg"
                    className="w-16 h-16"
                    alt="an image of dice"
                  />
                </Button>
              </div>
            </div>
          </div>
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
          <MintButton />
        </div>
        {/* <Inventory /> */}
      </div>
    </div>
  );
};

export default HomePage;
