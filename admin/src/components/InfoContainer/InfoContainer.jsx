import React from 'react'
import "./InfoContainer.scss";
import s4 from "../../assest/school4.png";

const InfoContainer = ({data}) => {
  return (
    <div className='top'>
      <div className='school-image'>
    <img src={s4}></img>
</div>
<div className="basic-info">
    <div className='Name-of-school'>
        <li>
            <span> {data.school_name}</span>
        </li>

    </div>
    <div className="basic-info-container">
        <div className='basic-info-container-components'>
            <div className="info-container">
                <li>
                    <label>Owner Name : </label>
                    <span> {data.admin_name && ((data.admin_name).replace(/_/g, " ")).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</span>
                </li>
            </div>
            <div className="info-container">
                <li>
                    <label>City : </label>
                    <span>{data.city_name && ((data.city_name).replace(/_/g, " ")).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</span>
                </li>
            </div>
        </div>
        <div className='basic-info-container-components'>
            <div className="info-container">
                <li>
                    <label>Owner Email :</label>
                    <span>{data.email}</span>
                </li>
            </div>
            <div className="info-container">
                <li>
                    <label>Phone : </label>
                    <span>{data.mobile}</span>
                </li>
            </div>
        </div>

    </div>
</div> 
    </div>
    
  )
}

export default InfoContainer
