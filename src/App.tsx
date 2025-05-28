import './App.scss'
import {Row} from "antd";

import CalculatingSection from "./components/CalculatingSection.tsx";
import ResultSection from "./components/ResultSection.tsx";


function App() {

    return (
        <div className={'calc-wrapper'}>
            <div className={'container'}>

                <Row justify={'center'}>
                    <CalculatingSection/>
                    <ResultSection/>
                </Row>
            </div>
        </div>
    )
}

export default App
