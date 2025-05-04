import Logo from "@/presentation/assets/images/logo.png"
import Image from "next/image";
import { CreateBranchForm } from "@/features/branch-office/ui/CreateBranchForm";

export default function (){
    return (
        <>
        <div className="flex w-full justify-around items-center">
            <Image className="w-[600px] h-[600px]" 
                alt="logo" src={Logo}/>
            <CreateBranchForm/>
        </div>
        </>
    )
}