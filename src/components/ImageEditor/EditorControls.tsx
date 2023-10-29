import BrightnessSlider from "./Sliders/Brightness";
import ContrastSlider from "./Sliders/Contrast";
import ExposureSlider from "./Sliders/Exposure";
import DefaultButton from "../Button/Default";
import { canvasElementId } from "@/constants";

const EditorControls = () => {

  const downloadHandler = () => {
      var link = document.createElement('a');
      link.download = 'filename.png';
      const canvas = document.getElementById(canvasElementId) as HTMLCanvasElement | null;
      if (canvas) {
        link.href = canvas.toDataURL();
        link.click();
      }
  }

  return (<><div className="p-2">
      <DefaultButton onClick={()=>{}}>All Images</DefaultButton>
    </div>
    <div className="absolute flex flex-col flex-wrap">
      <BrightnessSlider />
      <ContrastSlider />
      <ExposureSlider />
      <div className="p-2">
        <DefaultButton onClick={downloadHandler}>Download</DefaultButton>
      </div>
    </div>
    </>);
}

export default EditorControls;