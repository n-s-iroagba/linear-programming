import React, { useContext, useEffect } from "react";
import HistoryBasicCoefficients from "../../tableau_components/history/HistoryBasicCoefficients";
import Ratio from "../../tableau_components/input/Ratio";
import HistoryBasicVariables from  "../../tableau_components/history/HistoryBasicVariables";
import HistoryConstraintEquations from  "../../tableau_components/history/HistoryConstraintEquations";
import HistoryConstants from  "../../tableau_components/history/HistoryConstants";
import '../Tableau.css'
import { MatrixContext } from "../../../context/SimplexContext";

const FirstIterationTableau = () => {
const {tableau,iTableau, setITableau} = useContext(MatrixContext)
useEffect(() => {
    let tempTab = iTableau
    tempTab.crow = tableau.crow
    setITableau(tempTab)
})


    return (
        <div  className='tableau'>
            <HistoryBasicCoefficients basicCoefficients ={tableau.basicCoefficients}/>
            <HistoryBasicVariables basicVariables = {tableau.basicVariables}/>
            <HistoryConstraintEquations crow = {'iteration'} constraintEquations ={tableau.constraintEquations}/>
            <HistoryConstants fValue ={'iteration'} constants ={tableau.constants}/>
            <Ratio/>
        </div>
    )
}
export default FirstIterationTableau; 