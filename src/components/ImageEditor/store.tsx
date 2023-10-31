import { defaultBrightnessValue, defaultExposureValue } from '@/constants';
import { create } from 'zustand';

type ImageState = 'loading' | 'loaded';

interface EditorState {
  brightness: number;
  exposure: number;
  imageState: ImageState;
  setBrightness: (value: number) => void;
  setExposure: (value: number) => void;
  setImageState: (value: ImageState) => void;
}

const useEditorStore = create<EditorState>((set) => ({
  brightness: defaultBrightnessValue,
  exposure: defaultExposureValue,
  imageState: 'loading',
  setBrightness: (value: number) => set(() => ({ brightness: value })),
  setExposure: (value: number) => set({ exposure: value }),
  setImageState: (value: ImageState) => set({ imageState: value }),
}));

export default useEditorStore;
