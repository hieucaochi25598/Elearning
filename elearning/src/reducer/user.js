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
  ADD_MONEY
} from "../contants/userConstants";

//Luu thong tin user khi dang nhap
const initialState = {
  userInfo: {},
  accountInfo: {},
  isOpen: false,
  myCoursesList: [],
  myCousesListWaiting: [],
  cartArray: [],
  isSuccessAdd: false,
  totalPrice: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
      const chiTietKhoaHocGhiDanh = [
        ...state.accountInfo.chiTietKhoaHocGhiDanh
      ];
      const indexChiTiet = chiTietKhoaHocGhiDanh.findIndex(
        item => item.maKhoaHoc === action.data.maKhoaHoc
      );
      const index = cartArray.findIndex(
        item => item.maKhoaHoc === action.data.maKhoaHoc
      );
      if (index === -1 && indexChiTiet === -1) {
        cartArray.push(action.data);
        state.isSuccessAdd = true;
      } else {
        state.isSuccessAdd = false;
      }
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
      return { ...state, cartArray };
    }
    case DELETE_CART: {
      const cartArray = [...state.cartArray];
      const index = cartArray.findIndex(item => item.maKhoaHoc === action.data);
      if (index !== -1) {
        cartArray.splice(index, 1);
      }
      localStorage.setItem("cartArray", JSON.stringify(cartArray));
      return { ...state, cartArray };
    }
    case CLEAR_CART: {
      localStorage.removeItem("cartArray");
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
    default:
      return state;
  }
};
export default userReducer;
