import Image from "next/image"
import notfound from "../../public/notfound.png"

export default function NotFound(){
    return(
        <div className="notfound">
            <Image src={notfound} alt="not found" width={500} height={500} />
        </div>
    )
}