import useLoginModal from "@/hooks/useLoginModal"
import {useState, useCallback} from 'react'
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";


const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onToggle = useCallback(() =>{
        if(isLoading){
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    },[isLoading,registerModal,loginModal])

    const onSubmit = useCallback(async() =>{
        try{
            setIsLoading(true);


            loginModal.onClose();

        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }

    },[loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} />
        </div>
    )
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>First time using twitter? &nbsp;
                <span onClick={onToggle} className="text-white cursor-pointer hover:underline ">Sign Up</span>
            </p>

        </div>
    )

    return (
        <div>
            <Modal disabled={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Sign In" onClose={loginModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent}/>
        </div>
    )
}

export default LoginModal