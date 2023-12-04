import React, { useEffect } from 'react'
import { useContext } from 'react'
import { MatrixContext } from '../features/solve_simplex/context/SimplexContext'
import './pages.css'
import FResponseTableau from '../features/solve_simplex/components/FResponseTableau'
import { checkTableau } from '../utils/iteration/checkTableau'
import { useNavigate } from 'react-router-dom'

const FirstSolve = () => {
    const navigate = useNavigate()
    const { setPage, iTableau, setITableau,tableau, rTableau, setRTableau} = useContext(MatrixContext)
    const tempdimensions=JSON.parse(localStorage.getItem('localDimensions'))
    const iteration = localStorage.getItem('iteration')
    const id = localStorage.getItem('optiUserId')
    const token = localStorage.getItem('optiUserToken')
    const solvedArray = JSON.parse(localStorage.getItem('solution'))
    const url = `http://localhost:5000/solve/${id}`
    const index = 0
    const tempCRow = JSON.parse(localStorage.getItem('iCrow'))
    const tempRatio =JSON.parse(localStorage.getItem('iRatio'))
    const ratioRows = []
    const cRowColumns = []
    const dimensions = {numberOfColumns:parseInt(tempdimensions.numberOfColumns),numberOfRows:parseInt(tempdimensions.numberOfRows)}

    useEffect(() => {

        console.log(token)
        if (!token || token === '') {

            navigate('/login')
        }
        
        const temp = tableau
        const tempItab = iTableau
        tempItab.constraintEquations = temp.constraintEquations
        tempItab.basicVariables = temp.basicVariables
        tempItab.basicCoefficients = temp.basicCoefficients
        tempItab.constants = temp.constants
        tempItab.cRow = temp.cRow
        tempItab.ratio= temp.ratio
        setITableau(tempItab)


    }, [])
    const firstSolve = async () => {
        console.log(solvedArray)
        console.log(iTableau)
        console.log(dimensions)
        const shouldAdvance = await checkTableau(iTableau, solvedArray, index, dimensions, rTableau, setRTableau, setITableau)
        if (!shouldAdvance) {
            setPage(3)
        } else {

            setPage(2)
            localStorage.setItem('iteration', 2)

        }
    }


    return (
        <>
            <div className='solve-wrapper'>
                <div className="is-wrap">
                    <div><p style={{ width: '100vw', marginTop: '1cm' }}> Fill in the simplex Tableau for the first Iteration</p></div>
                    <div className='initial-solve'><FResponseTableau /></div>
                    <br />
                    <div className='s-button'><button onClick={firstSolve}>Solve</button></div>
                </div>
            </div>
        </>
    )
}
export default FirstSolve