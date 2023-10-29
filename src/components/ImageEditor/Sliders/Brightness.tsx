import { useShallow } from "zustand/react/shallow";
import useSliderStore from "../store";

const BrightnessSlider = () => {

  const {brightness, setBrightness } = useSliderStore(useShallow((state) => ({ brightness: state.brightness, setBrightness: state.setBrightness })));

  return <div className="rounded bg-slate-600 h-16 p-2 m-2">
    <div>Brightness:</div>
    <input 
      id="brightness-slider" 
      type="range" 
      min="-1" max="1" 
      value={brightness} 
      onChange={ev => setBrightness(parseFloat(ev.target.value))}
      step="0.1"/>
  </div>
}

export default BrightnessSlider;