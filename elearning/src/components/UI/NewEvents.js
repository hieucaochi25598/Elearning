import React from 'react'
import styles from '../../styles/Layout/newsevent.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getNews } from '../../actions/userActions'

const NewEvents = () => {
    const dispatch = useDispatch()
    const { newsArray } = useSelector(state => state.userReducer)
    useEffect(() => {
        dispatch(getNews())
    }, [])
    return (
        <div className={styles.newsEventContainer}>
            <h2 className="text-center mb-4">TIN TỨC VÀ SỰ KIỆN</h2>
            <div className={styles.newsEventContent}>
                {newsArray.map(item => (
                    <div className="row mb-3" key={item.id}>
                    <div className="col-2">
                <div className={styles.imgNew}>
                    <img src={item.hinhAnh} alt="images" width="100%" height={130}/>
                </div>
                    </div>
                    <div className="col-10">
                        <div className={styles.newsText}>
                <h5>{item.tieuDe}</h5>
                <p className="mb-0 font-weight-bold text-danger">{item.ngayTao}</p>
                <p className={`mb-0 ${styles.contentNews}`}>{item.noiDung}</p>
                <p className="mb-0 text-danger">Đọc thêm</p>
                        </div>
                    </div>
                </div>
                ))}
                
            </div>
        </div>
    )
}
export default NewEvents
