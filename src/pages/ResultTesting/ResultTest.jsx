import React from 'react';
import Footer from "../../components/Footer";

import "./restest.css"
import {Button} from "@telegram-apps/telegram-ui";

const ResultTest = () => {
    return (
        <div>
            <div className="container">
                <div className="center-block">
                    <img src="https://s3-alpha-sig.figma.com/img/6a2a/853e/eadb9f3adf723d24d949575084d05423?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jCKVOmMEaoOTS9qKssWnLvtWArcH8YQg8LIbD-gTAvK74PG21CEDA3Wh68G1HfDUKyO8Zl8LgRuFRKntnDMhQ8EvDy7MQpu9UmfnoOnCBJPr5lMGwYckIlliCtaLA95G4xTnj~fVKdEnM0Y5aDGkB9LVeIYkUqcBYOECXvT8QyARGj-KZiZ8lt6eS-yO5mqnDCmnuUFlQRsFlWkK5qxCP2BudKYQCdZS94PWolBR1PTsGyPqFxVG8fmcvNEYGcc5ilXMrQlTyHfFeIZA1nR7PtdCLnBP0cweOdxNGQqrBJQmbfGECv9OzndLSEOtJTM7Dl8dhd57P05ZAWp0bqlSdA__" alt="" id="res-img"/>

                    <span id={'balls'}>10 / 10</span>
                    <span id="comment">You're a handsome, man! Keep up the good work</span>
                    <Button
                        mode="plain"
                        size="m"
                        id={'res-but'}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResultTest;