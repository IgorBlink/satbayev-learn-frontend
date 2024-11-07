import React from 'react';
import Footer from "../../components/Footer";
import {Button, Cell, Placeholder, Radio} from "@telegram-apps/telegram-ui";

import "./question.css"

const Question = () => {
    return (
        <div>
            <div className="container">
                <div className="page-title">Question 1</div>

                <img src="https://s3-alpha-sig.figma.com/img/99e5/a687/4991d4d3b2c786b13f5a4d2087819ed2?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=P-11~5qP91Vc9DrBaExvepdfAjcbk4oiLbCqqfeun6nPiLCrQ5jolgA-2qcro7VZymK0V-mhTxt~NLtdbeLaQe2S0GpcebeyYBFCKmavDwDV0pYk-wkKfN-~5sJZya0SInDGncNbd1UhZl2rB0fgQeG76FBp7b-bPg3btLrUvKLy5XTHgutYBVBXu5L6~3obY9b9HZoIenHhLggwWVppzebBdSaw5cDcwPTNDubHs7gz0w9UiWEJ5oM5LXECh3jL1Y~19LdqaRogIrY6u7zizcZPO5UN36ip9YPgL0VGElRv1G~TrgijN3MD3f8L4sjPCZ9h0gwJRy7jjKdbCBE4GQ__" className={'quest-img'} alt=""/>

                <p className="question">Question description Question description Question
                    description Question description Question description Question
                    description </p>

                <form className={'answer-list'}>
                    <Cell
                        Component="label"
                        before={<Radio name="radio" value="1"/>}
                        multiline
                        className={'answer-item'}
                    >
                        Answer first
                    </Cell>
                    <Cell
                        Component="label"
                        before={<Radio name="radio" value="2"/>}
                        multiline
                        className={'answer-item'}
                    >
                        Answer second
                    </Cell>
                    <Cell
                        Component="label"
                        before={<Radio name="radio" value="2"/>}
                        multiline
                        className={'answer-item'}
                    >
                        Answer second
                    </Cell>
                </form>

                <Button
                    mode="gray"
                    size="m"
                    id={'question-submit'}
                >
                    Action
                </Button>
            </div>

            <Footer/>
        </div>
    );
};

export default Question;