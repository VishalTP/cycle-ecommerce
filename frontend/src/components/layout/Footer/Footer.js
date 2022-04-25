import React from 'react'
import "./Footer.css"
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/appstore.png"

const Footer = () => {
  return (
    <div id="footer">
        <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>from</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>CYCLE STORE</h1>
        <p>Shop Here for Quality Cycles</p>

        <p>Copyrights 2022 &copy; VishalTP</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://instagram.com">Facebook</a>
      </div>
    </div>
  )
}

export default Footer