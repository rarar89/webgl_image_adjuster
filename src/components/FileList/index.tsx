import Link from 'next/link'

async function getData() {
  const res = await fetch(process.env.BACKEND_URL +'/api/image', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export type FileListProps = {
  onClick: (e: any) => void;
}

const FileList = async () => {

  const fileList = await getData();

  return <div className="flex w-full flex-wrap">{fileList.map((file:any, i:number)=><div className="p-2 w-1/4 rounded bg-gray-700 m-4" key={i}><Link href={`/image/${file.name}`}>{file.name}</Link></div>)}</div>
}

export default FileList;