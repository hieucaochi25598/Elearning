import React from 'react'
import styles from '../../styles/Layout/stateshome.module.scss'
import PersonIcon from '@material-ui/icons/Person';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalLibraryOutlinedIcon from '@material-ui/icons/LocalLibraryOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const StatesHome = () => {
    return (
        <div className={styles.statesHome}>
            <div className={styles.ourStates}>
                <div className="container">
                <div className="row m-0">
                    <div className="col-3">
                        <PersonOutlineOutlinedIcon className={styles.statesIcons}/>
                        
                        <p className="mb-1">+ 10000</p>
                        <p className={styles.contentStates}>Học Viên</p>
                    </div>
                    <div className="col-3">
                    <LocalLibraryOutlinedIcon className={styles.statesIcons}/>
                        
                        <p className="mb-1">+ 100</p>
                        <p className={styles.contentStates}>Khóa Học</p>
                    </div>
                    <div className="col-3">
                    <AccessAlarmIcon className={styles.statesIcons}/>
                        
                        <p className="mb-1">+ 1000</p>
                        <p className={styles.contentStates}>Truy Cập</p>
                    </div>
                    <div className="col-3">
                    <FavoriteBorderIcon className={styles.statesIcons}/>
                    
                        <p className="mb-1">+ 9700</p>
                        <p className={styles.contentStates}>Yêu Thích</p>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    )
}
export default StatesHome
