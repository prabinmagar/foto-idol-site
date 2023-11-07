import { staticImages } from "../../images";

export default function Loader (){
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-40 default-transition">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 default-transition">
        <img src={staticImages.ripple} alt="loader image" />
      </div>
    </div>
  );
}
