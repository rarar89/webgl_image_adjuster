import { useShallow } from "zustand/react/shallow";
import useSliderStore from "../store";

const ExposureSlider = () => {

  const {exposure, setExposure } = useSliderStore(useShallow((state) => ({ exposure: state.exposure, setExposure: state.setExposure })));

  return <div className="rounded bg-slate-600 h-16 p-2 m-2">
    <div>Exposure:</div>
    <input 
      id="exposure-slider" 
      type="range" 
      min="-1" max="1" 
      value={exposure} 
      onChange={ev => setExposure(parseFloat(ev.target.value))}
      step="0.1"/>
  </div>
}

export default ExposureSlider;