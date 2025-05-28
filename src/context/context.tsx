import {createContext, type Dispatch, type SetStateAction, useContext} from "react";

export type ResultItem = {
    geometryId: number,
    area: number,
    timeStamp: string,
}

type ContextValuesType = {
    calculationResults: ResultItem[],
    setCalculationResults: Dispatch<SetStateAction<ResultItem[]>> ,
}

export const defaultValues: ContextValuesType = {
    calculationResults: [],
    setCalculationResults: () => null,
}

const GeneralContext = createContext(defaultValues)
const useGeneralContext = () => useContext(GeneralContext)

export { GeneralContext, useGeneralContext }