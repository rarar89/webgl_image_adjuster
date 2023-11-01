import Image from 'next/image';

const Head = () => (
  <div className='py-2 px-2 bg-gray-400 flex'>
    <Image priority src='/webgl.svg' width={100} height={41} alt='WebGL' />
    <div className='px-4 py-2'>
      <h1 className='font-semibold text-slate-800'>WEBGL IMAGE EDITOR</h1>
    </div>
  </div>
);

export default Head;
