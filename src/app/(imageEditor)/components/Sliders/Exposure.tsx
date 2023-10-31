import { useShallow } from 'zustand/react/shallow';
import useSliderStore from '../../store';
import Slider from '@/components/Slider';

const ExposureSlider = () => {
  const { exposure, setExposure } = useSliderStore(
    useShallow((state) => ({
      exposure: state.exposure,
      setExposure: state.setExposure,
    }))
  );

  return (
    <Slider
      label='Exposure:'
      id='brightness-slider'
      min='0'
      max='2'
      step='0.1'
      value={exposure}
      onChange={setExposure}
    />
  );
};

export default ExposureSlider;
