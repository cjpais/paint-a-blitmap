import create from "zustand";

type PainterData = {
  selectedBlitmap: number;
  colors: string[];
  setColor: (color: string, index: number) => void;
  setColors: (colors: string[]) => void;
  setSelectedBlitmap: (index: number) => void;
};

export const usePainterizer = create<PainterData>((set) => ({
  selectedBlitmap: 0,
  colors: ["ff0cd3", "000000", "0000ff", "00ff00"],
  setColor: (color: string, index: number) =>
    set((state) => {
      state.colors[index] = color;
      return state;
    }),
  setColors: (colors: string[]) =>
    set((state) => ({
      colors,
    })),
  setSelectedBlitmap: (blitmap: number) =>
    set((state) => ({
      selectedBlitmap: blitmap,
    })),
}));
