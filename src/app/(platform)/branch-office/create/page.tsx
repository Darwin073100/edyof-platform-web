import Logo from "@/ui/assets/images/logologo.png"
import Image from "next/image";
import { CreateBranchForm } from "@/features/branch-office/ui/CreateBranchForm";

export default function (){
    return (
        <>
        <div className="flex w-full sm:flex-col md:flex-col lg:flex-row md:gap-2 justify-around items-center">
            <Image className="2xl:w-[500px] 2xl:h-[500px] xl:w-[400px] xl:h-[400px] lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] sm:w-[150px] sm:h-[150px] rounded-full" 
                alt="logo" src={Logo}/>
            <CreateBranchForm/>
        </div>
        </>
    )
}