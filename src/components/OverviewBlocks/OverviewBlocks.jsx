import { Button, Placeholder, Steps } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import WelcomeTgs from './../../assets/tgs/welcome.tgs';
import WorldwideTgs from './../../assets/tgs/word_wide.tgs';
import ApplePayTgs from './../../assets/tgs/ap_gp.tgs';
import PaymentsTgs from './../../assets/tgs/payments.tgs';
import KycTgs from './../../assets/tgs/kyc.tgs';
import Loader from "../../helpers/Loader";

const OverviewBlocks = () => {
    const [step, setStep] = useState(1);

    const getTgsSrcForStep = (step) => {
        switch (step) {
            case 1:
                return WelcomeTgs;
            case 2:
                return WorldwideTgs;
            case 3:
                return ApplePayTgs;
            case 4:
                return PaymentsTgs;
            case 5:
                return KycTgs;
            default:
                return WelcomeTgs; 
        }
    };

    return (
        <div className="overview__blocks">
            <div className="overview__blocks__steps" onClick={() => setStep(prev => {
                        if (prev === 1) return 1;
                        return prev - 1;
                    })}>
                <Steps
                    count={4}
                    progress={step}
                />
            </div>

            {step === 1 ? (
                <Placeholder 
                    action={<Button onClick={() => setStep(2)}>Let’s go!</Button>}
                    description="SatbayevLearn is a learning platform right in Telegram! Let's tell you more about it"
                    header={`Welcome!`}
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : step === 2 ? ( 
                <Placeholder 
                    action={<Button onClick={() => setStep(3)}>Wow! Next?</Button>}
                    description="We provide over 50 courses on a variety of topics"
                    header="Learn anything"
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : step === 3 ? (
                <Placeholder 
                    action={<Button onClick={() => setStep(4)}>Nice</Button>}
                    description="Get rewarded for every module and course you complete. Withdraw directly to your TON wallet."
                    header="SatbayevLearn points"
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : step === 4 ? (
                <Placeholder 
                    action={<Button onClick={() => window.location.reload()}>Okay. Take me to the app</Button>}
                    description="Get on the leaderboard which is built from the number of points"
                    header="Leaderboard"
                >
                    <tgs-player key={step} autoplay loop mode="normal" src={getTgsSrcForStep(step)} style={{width: 150, height: 150}}></tgs-player>
                </Placeholder>
            ) : <Loader />}
        </div>
    );
};

export default OverviewBlocks;
