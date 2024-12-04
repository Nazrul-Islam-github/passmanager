import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Home() {
  return (
    <>
<div className="flex flex-wrap justify-center items-center my-16 gap-6"  >

  <div className="w-auto  p-4 flex flex-col items-center justify-center ">
  <Image src="/lock.png" alt="lock" width={300} height={300}/>
    <Button className="mt-5" size="lg">Get Started</Button>
  </div>

</div>



  
    </>
  );
}
