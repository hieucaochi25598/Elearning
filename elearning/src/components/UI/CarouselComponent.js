import React from 'react'
import styles from '../../styles/Layout/carousel.module.scss'
const CarouselComponent = () => {
    return (
        <div>
            <div className={styles.myCarousel}></div>
            <div className={styles.myIntroCarousel}>
                <div className="row m-0">
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className={styles.introItem}>
                            <i className="fa fa-code"></i>
                            <div className={styles.introItemText}>
                                <h4>100,000 online courses</h4>
                                <p>Explore a variety of fresh topics</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className={styles.introItem}>
                            <i className="fa fa-check"></i>
                            <div className={styles.introItemText}>
                                <h4>Expert instruction</h4>
                                <p>Find the right instructor for you</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                        <div className={styles.introItem}>
                            <i className="fa fa-clock"></i>
                            <div className={styles.introItemText}>
                                <h4>Lifetime access</h4>
                                <p>Learn on your schedule</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CarouselComponent
