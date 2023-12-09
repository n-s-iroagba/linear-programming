import React from 'react'
import { useContext } from 'react'
import { MatrixContext } from '../../features/solve_simplex/context/SimplexContext'
import '../pages.css'
import { checkLastTableau } from '../../utils/iteration/checkTableau'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TResponseTableau from '../../features/solve_simplex/components/TResponseTableau'

const TResponse2 = () => {
    const navigate = useNavigate()
    const { setIteration, iteration, iTableau, setITableau, index, setIndex, dimensions,solvedArray, rTableau, setRTableau, setPage, length } = useContext(MatrixContext)
    const id = localStorage.getItem('optiUserId');
    const url = `http://localhost:5000/solve/${id}`
    const iterationNumber=localStorage.getItem('iteration')
    const responseSolve = async () => {
        const shouldAdvance = await checkLastTableau(iTableau, solvedArray, index, dimensions, rTableau, setRTableau, setITableau)
        if (shouldAdvance) {
            axios.patch(url,{
                iteration:iterationNumber
            })
            setPage(2)
        } else {
            setPage(7)
        }

    }

    return (
        <>
            <div className='solve-wrapper'>
                <div className="is-wrap">
                    <div><p style={{ width: '100vw', marginTop: '1cm' }}>Some of the Values were wrong and are highlighted in red for iteration number: {iteration}</p></div>
                    <div className='initial-solve'><TResponseTableau /></div>
                    <br />
                    <div className='s-button'><button onClick={responseSolve}>Solve</button></div>
                </div>
            </div>
        </>
    )
}

export default TResponse2