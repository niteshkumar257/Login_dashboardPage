import { display } from '@mui/system'
import React from 'react'
import "./widgest.scss"

const widgest = ({name,count,image}) => {
  return (
    <div className="widgest-container">
        <div className="left">
            <div className="title">
               {name}
            </div>
            <div className="count">
                 
                 {
                
                    Array.isArray(count)==false ? count :
                    <div className='count-container'>
                         { count.map((item)=>(
                            <div 
                            className='count-subContainer'
                            >
                                 <p>{item}</p>
                            </div>
                     
                    ))}
                    </div>

                  
                 }
            </div>
        </div>
        <div className="right">
            <div className="icon">
                <img src={image}></img>
            </div>
        </div>
    </div>
  )
}

export default widgest
