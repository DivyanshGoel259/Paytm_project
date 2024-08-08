
import { Button } from "../components/ButtonCompo";
import { ButtonWarn } from "../components/ButtonWarningCompo";
import { Heading } from "../components/HeadingCompo";
import { InputBox } from "../components/InputBoxCompo";
import { SubHeading } from "../components/SubHeadingCompo";

export function SigninPage(){
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Login"}></Heading>
                <SubHeading label={"Enter your credentials to access your account"}></SubHeading>
                <InputBox label={"Email"} placeholder={"Div1234@gmail.com"}></InputBox>
                <InputBox label={"Password"} placeholder={"r63r6383"}></InputBox>
                <div className="pt-4">
                    <Button label={"Sign in"}></Button>
                </div>
                <ButtonWarn label={"Not Registered?"} buttontext={"Signup"} to={"/signup"}></ButtonWarn>
            </div>

        </div>

    </div>
}