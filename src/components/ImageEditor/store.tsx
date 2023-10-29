import { create } from 'zustand'

interface SliderState {
  brightness: number;
  contrast: number;
  exposure: number;
  setBrightness: (value: number) => void;
  setContrast: (value: number) => void;
  setExposure: (value: number) => void;
}

const useSliderStore = create<SliderState>((set) => ({
  brightness: 0,
  contrast: 1,
  exposure: 1,
  setBrightness: (value: number) => set(() => ({ brightness: value })),
  setContrast: (value: number) => set({ contrast: value }),
  setExposure: (value: number) => set({ exposure: value }),
}))

export default useSliderStore;