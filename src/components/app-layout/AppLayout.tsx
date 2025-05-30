import './AppLayout.scss'
import {notification, Row} from "antd";

import CalculatingSection from "../calculation-section/CalculatingSection.tsx";
import ResultSection from "../result-section/ResultSection.tsx";
import {defaultValues, GeneralContext} from '../../context/context.tsx';
import {useState} from "react";
import { NotificationProvider } from '../../context/notificationContext.tsx';

function AppLayout() {

    const [calculationResults, setCalculationResults] = useState(defaultValues.calculationResults)

    return (
        <NotificationProvider>
            <GeneralContext.Provider
                value={{
                    calculationResults,
                    setCalculationResults
                }}>
                <div className={'app-wrapper'}>
                    <div className={'container'}>
                        <Row justify={'center'} className={'calc-wrapper'}>
                            <CalculatingSection/>
                            <ResultSection/>
                        </Row>
                    </div>
                </div>
            </GeneralContext.Provider>
        </NotificationProvider>
    )
}

export default AppLayout
