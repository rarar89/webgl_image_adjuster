import BrightnessSlider from './Sliders/Brightness';
import ExposureSlider from './Sliders/Exposure';
import DefaultButton from '../Button/Default';
import { canvasElementId } from '@/constants';
import { useRouter } from 'next/navigation';
import drawContrastStrech from './WebGLEditor/draw/drawContrastStrech';

const EditorControls = () => {
  const router = useRouter();

  const downloadHandler = () => {
    const canvas = document.getElementById(
      canvasElementId
    ) as HTMLCanvasElement | null;
    const filename = 'image.png';

    if (!canvas) {
      throw new Error('Canvas not found');
    }

    const dataURL = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const contrastStrechHandler = () => drawContrastStrech();

  return (
    <>
      <div className='absolute flex flex-col flex-wrap'>
        <BrightnessSlider />
        <ExposureSlider />
        <div className='p-2'>
          <DefaultButton onClick={contrastStrechHandler}>
            Contrast Strech
          </DefaultButton>
        </div>
        <div className='p-2'>
          <DefaultButton onClick={downloadHandler}>Download</DefaultButton>
        </div>
        <div className='p-2'>
          <DefaultButton onClick={() => router.push('/')}>
            To Image List
          </DefaultButton>
        </div>
      </div>
    </>
  );
};

export default EditorControls;
