import React, { useEffect } from 'react'
import styles from '../../styles/Layout/studentscomments.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {Spinner} from 'reactstrap'
import "slick-carousel/slick/slick.css"; 
import { getFeedBack } from '../../actions/userActions'
const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    autoplay: true,
    cssEase: "linear",
    autoplaySpeed: 3000,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 3
  };
const StudentsComments = () => {
    const dispatch = useDispatch()
    const {feedBackArray} = useSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(getFeedBack())
    },[])

    return (
        <div className={styles.commentsContainer}>
            <div className={styles.commentContent}>
                <h2 className="text-center">Đánh Giá Của Học Viên</h2>
                <div className={styles.feedBackContent}>
                    <Slider {...settings}>
                    {feedBackArray.length !== 0 ? (feedBackArray.map((item,index) => (
                        <div className="pr-2 pl-2" key={index}>
                        <div className={styles.feedBackContentItem}>
                            <div className={styles.feedBackContentText}>
                                <p>{item.content}</p>
                        
                            </div>
                            <div className={`d-flex ${styles.feedBackContentInfo}`}>
                                <div className={styles.feedBackContentImage}>
                                    <img src="./img/userfeedback.jpg" alt="images" height={55} width={55} className="mr-3"/>
                                </div>
                                <div className={styles.feedBackContentName}>
                                    <h5 className="mb-2">{item.hoTen}</h5>
                                    <p className={styles.feedBackContentAccount}>{item.taiKhoan}</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        ))) : (<div className="text-center"> <Spinner type="grow" color="danger" />
                         <Spinner type="grow" color="danger" /></div>)}
                    </Slider>
                    
                    
                </div>
            </div>
        </div>
    )
}
export default StudentsComments
