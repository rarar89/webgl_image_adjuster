import { useEffect } from 'react';
import drawColor from '@/app/(imageEditor)/draw/drawColor';
import useSliderStore from '@/app/(imageEditor)/store';
import { useParams } from 'next/navigation';
import { defaultBrightnessValue, defaultExposureValue } from '@/constants';

const ColorAdjuster = () => {
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

export default ColorAdjuster;
