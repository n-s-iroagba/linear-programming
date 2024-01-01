import React, { useContext } from 'react'
import { MatrixContext } from '../../../features/solve_simplex/context/SimplexContext'
import '../tableauComponents.css'
const RRatio = () => {
    const { responseTableau } = useContext(MatrixContext)


    return <>
           <div className='right-tableau-wrapper'>
     <Empty position='inverse-bottom'/>
      <table className='single-column' >
        <thead>
          <tr>
            <th>Ratio</th>
          </tr>
        </thead>
        <tbody className='tableau-body'>
          {
            responseTableau.ratio.map((row, index) => {
              return (<tr key={index}>{row}</tr>)
            })
          }
        </tbody>
      </table>
      <Empty/>
    </div>
  
    </>
}
export default RRatio;