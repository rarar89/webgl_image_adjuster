import { useShallow } from 'zustand/react/shallow';
import useSliderStore from '../store';
import Slider from '@/components/Slider';

const BrightnessSlider = () => {
  const { brightness, setBrightness } = useSliderStore(
    useShallow((state) => ({
      brightness: state.brightness,
      setBrightness: state.setBrightness,
    }))
  );

  return (
    <Slider
      label='Brightness:'
      id='brightness-slider'
      min='-1'
      max='1'
      step='0.1'
      value={brightness}
      onChange={setBrightness}
    />
  );
};

export default BrightnessSlider;
