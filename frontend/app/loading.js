import Image from 'next/image'
import loadingImg from '@/public/loading.gif'


const imageStyle = {
    marginTop: "16%",
    marginLeft: "35%"
}


export default function Loading() {
    return (
        <div>
            <Image src={loadingImg} width={100} height={100} style={imageStyle} />
        </div>
    )
}