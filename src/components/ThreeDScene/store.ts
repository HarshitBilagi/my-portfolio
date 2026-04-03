import { create } from "zustand";

export interface AppState {
  powerOn: boolean;
  setPowerOn: (state: boolean) => void;
  zoomLevel: number;
  setZoomLevel: (zoom: number) => void;
  fullZoomed: boolean;
  setFullZoomed: (zoomed: boolean) => void;
  isIntroFinished: boolean;
  setIsIntroFinished: (finished: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  powerOn: false,
  setPowerOn: (state) => set({ powerOn: state }),
  zoomLevel: 0,
  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
  fullZoomed: false,
  setFullZoomed: (zoomed) => set({ fullZoomed: zoomed }),
  isIntroFinished: false,
  setIsIntroFinished: (finished) => set({ isIntroFinished: finished }),
}));
