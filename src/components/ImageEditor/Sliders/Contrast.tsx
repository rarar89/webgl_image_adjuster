import { useShallow } from "zustand/react/shallow";
import useSliderStore from "../store";

const ContrastSlider = () => {

  const {contrast, setContrast } = useSliderStore(useShallow((state) => ({ contrast: state.contrast, setContrast: state.setContrast })));

  return <div className="rounded bg-slate-600 h-16 p-2 m-2">
    <div>Contrast:</div>
    <input 
      id="contrast-slider" 
      type="range" 
      min="0" max="2" 
      value={contrast} 
      onChange={ev => setContrast(parseFloat(ev.target.value))}
      step="0.1"/>
  </div>
}

export default ContrastSlider;