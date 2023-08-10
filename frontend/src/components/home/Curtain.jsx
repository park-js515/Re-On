import React from "react";
import styles from "./Curtain.module.css";

function Curtain() {
  
    function slide() {
        document.getElementsByClassName(styles.curtainContainer)[0].style.transform =
            "translatex(-150vw) ";
        document.getElementsByClassName(styles.curtainContainer)[1].style.transform =
            "translatex(150vw)";
    }

    return (
        <div className={styles.curtainBody}>
            <div id="leftCurtain" className={styles.curtainContainer} onClick={slide}>
                {Array(12).fill().map((_, i) => <div key={i} className={styles.unCurtain}></div>)}
            </div>
            <div id="rightCurtain" className={styles.curtainContainer} onClick={slide}>
                {Array(12).fill().map((_, i) => <div key={i} className={styles.unCurtain}></div>)}
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
}

export default Curtain;
