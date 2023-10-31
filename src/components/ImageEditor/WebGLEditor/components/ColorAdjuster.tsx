import { useEffect } from 'react';
import drawColor from '../draw/drawColor';
import useSliderStore from '../../store';
import { useParams } from 'next/navigation';
import { defaultBrightnessValue, defaultExposureValue } from '@/constants';

const ColorAdjusterComponent = () => {
  const params = useParams();

  const { brightness, exposure, imageState, setBrightness, setExposure } =
    useSliderStore((state) => state);

  useEffect(() => {
    if (imageState != 'loaded') {
      return;
    }

    drawColor({ brightness, exposure });
  }, [brightness, exposure, imageState]);

  useEffect(() => {
    setBrightness(defaultBrightnessValue);
    setExposure(defaultExposureValue);
  }, [params.name, setBrightness, setExposure]);

  return null;
};

export default ColorAdjusterComponent;
