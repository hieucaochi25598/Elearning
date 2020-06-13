import {
  GET_USER_INFO,
  GET_ACCOUNT_INFO,
  TOGGLE_MODAL,
  EDIT_ACCOUNT_INFO,
  GET_MY_COURSES_LIST,
  GET_MY_COURSES_LIST_WAITING,
  ADD_TO_CART,
  CAL_TOTAL_PRICE,
  DELETE_CART,
  DELETE_SIGNUP_COURSE,
  CLEAR_CART,
  GET_CART_ARRAY,
  SIGNUP_COURSE,
  ADD_MONEY,
  GET_COMMENT_COURSE,
  COMMENT_COURSE,
  GET_WISHLIST_ARRAY,
  ADD_TO_WISHLIST,
  DELETE_WISHLIST,
  GET_FEEDBACK_ARRAY,
  GET_NEWS_ARRAY,
  SEND_FEEDBACK,
  LAY_DANH_SACH_KHOA_HOC_DA_XET_DUYET,
  LAY_LINK_TAI_LIEU,
  LAY_LINK_BAI_TAP
} from "../contants/userConstants";

//Luu thong tin user khi dang nhap
const initialState = {
  userInfo: {},
  accountInfo: {},
  isOpen: false,
  myCoursesList: [],
  myCousesListWaiting: [],
  cartArray: [],
  wishListArray: [],
  commentArray: [],
  feedBackArray: [],
  newsArray: [],
  danhSachKHDaXetDuyet: [],
  danhSachLinkTaiLieu: [],
  danhSachLinkBaiTap: [],
  totalPrice: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_LINK_BAI_TAP: {
      return {...state, danhSachLinkBaiTap: action.data}
    }
    case LAY_LINK_TAI_LIEU: {
      return {...state, danhSachLinkTaiLieu: action.data}
    }
    case LAY_DANH_SACH_KHOA_HOC_DA_XET_DUYET: {
      return {...state, danhSachKHDaXetDuyet: action.data}
    }
    case GET_USER_INFO: {
      return { ...state, userInfo: {...action.data, soDu: 0 }};
    }
    case GET_ACCOUNT_INFO: {
      return { ...state, accountInfo: action.data };
    }
    case TOGGLE_MODAL: {
      return { ...state, isOpen: action.data };
    }
    case EDIT_ACCOUNT_INFO: {
      const accountInfo = { ...state.accountInfo };
      accountInfo.matKhau = action.data.matKhau;
      accountInfo.hoTen = action.data.hoTen;
      accountInfo.soDT = action.data.soDT;
      return { ...state, accountInfo };
    }
    case SIGNUP_COURSE: {
      const chiTietKhoaHocGhiDanh = [
        ...state.accountInfo.chiTietKhoaHocGhiDanh
      ];
      chiTietKhoaHocGhiDanh.push({
        maKhoaHoc: action.data
      });
      state.accountInfo.chiTietKhoaHocGhiDanh = chiTietKhoaHocGhiDanh;
      return { ...state };
    }
    case DELETE_SIGNUP_COURSE: {
      const chiTietKhoaHocGhiDanh = [
        ...state.accountInfo.chiTietKhoaHocGhiDanh
      ];
      const index = chiTietKhoaHocGhiDanh.findIndex(
        item => item.maKhoaHoc === action.data
      );
      if (index !== -1) {
        chiTietKhoaHocGhiDanh.splice(index, 1);
      }
      state.accountInfo.chiTietKhoaHocGhiDanh = chiTietKhoaHocGhiDanh;
      return { ...state };
    }
    case GET_MY_COURSES_LIST: {
      return { ...state, myCoursesList: action.data };
    }
    case GET_MY_COURSES_LIST_WAITING: {
      return { ...state, myCousesListWaiting: action.data };
    }
    case ADD_TO_CART: {
      const cartArray = [...state.cartArray];
      const index = cartArray.findIndex(
        item => item.maKhoaHoc === action.data.maKhoaHoc
      );
      if (index === -1) {
        cartArray.push(action.data);
      } 
      return { ...state, cartArray };
    }
    case DELETE_CART: {
      const cartArray = [...state.cartArray];
      const index = cartArray.findIndex(item => item.maKhoaHoc === action.data);
      if (index !== -1) {
        cartArray.splice(index, 1);
      }
      
      return { ...state, cartArray };
    }
    case CLEAR_CART: {
     
      const userInfo = {...state.userInfo}
      if(userInfo.soDu > state.totalPrice){
        userInfo.soDu = userInfo.soDu - state.totalPrice
      }
      return { ...state, cartArray: [] , userInfo};
    }
    case GET_CART_ARRAY: {
      return { ...state, cartArray: action.data };
    }
    case CAL_TOTAL_PRICE: {
      const cartArray = [...state.cartArray];
      state.totalPrice = 0;
      for (let i = 0; i < cartArray.length; i++) {
        state.totalPrice += cartArray[i].luotXem;
      }
      return { ...state };
    }
    case ADD_MONEY: {
      const userInfo = {...state.userInfo}
      const confirmCode = "123456"
      if(confirmCode === action.data.codeConfirm){
        userInfo.soDu = userInfo.soDu + action.data.moneyMount;
      }
      
      return {...state, userInfo}
    }
    case COMMENT_COURSE: {
      const commentArray = [...state.commentArray]
      const userInfo = {...state.userInfo}
      commentArray.push({
        ...action.data,
        taiKhoan: userInfo.taiKhoan
      })
      return {...state, commentArray}
    }
    case GET_COMMENT_COURSE:
      {
        return {...state, commentArray:action.data}
      }
    case ADD_TO_WISHLIST:
      {
        const wishListArray = [...state.wishListArray]
        const index = wishListArray.findIndex(item => item.maKhoaHoc === action.data.maKhoaHoc)
        if(index === -1){
          wishListArray.push(action.data)
        }
        return {...state, wishListArray}
      }
    case GET_WISHLIST_ARRAY:
      {
      return {...state, wishListArray: action.data}
    }
    case DELETE_WISHLIST: 
    {
      const wishListArray = [...state.wishListArray]
      const index = wishListArray.findIndex(item => item.maKhoaHoc === action.data)
      if(index !== -1){
        wishListArray.splice(index , 1)
      }
      return {...state, wishListArray}
    }
    case GET_FEEDBACK_ARRAY:
      {
        return {...state, feedBackArray: action.data}
      }
      case GET_NEWS_ARRAY:
        {
          return {...state, newsArray: action.data}
        }
      case SEND_FEEDBACK:
        {
          const feedBackArray = [...state.feedBackArray]
          const userInfo = {...state.userInfo}
          let toDay = new Date()
          let ngayGui = `${toDay.getDate()}/${toDay.getMonth() + 1}/${toDay.getFullYear()}`
          feedBackArray.push({
            content: action.data.yourFeedBack,
            taiKhoan: userInfo.taiKhoan,
            ngayGui: ngayGui,
            hoTen: userInfo.hoTen
          }
            
          )
          return {...state, feedBackArray}
        }
    default:
      return state;
  }
};
export default userReducer;
