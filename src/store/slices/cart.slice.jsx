import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
           
        setCart: (state, action)=>{

            const fillCart= action.payload
            return fillCart
        }

    }
})
export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
      const cart = JSON.parse(localStorage.getItem('cart'))
        dispatch(setCart(cart))
        dispatch(setIsLoading(false))
}

export const addCartThunk = (bodyCart) => (dispatch) => {
    dispatch(setIsLoading(true));
    const cart = JSON.parse(localStorage.getItem('cart'))
    const coincidenceCart = cart.find(libro=> libro.id==bodyCart.id)
    if(coincidenceCart){ 

        coincidenceCart.quantity = bodyCart.quantity
    }else{

        cart.push(bodyCart)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
         dispatch(getCartThunk())
         dispatch(setIsLoading(false))
}


export const updateThunk = (body) => (dispatch) => {
    dispatch(setIsLoading(true));
    const cart = JSON.parse(localStorage.getItem('cart'))
    const bookFinded = cart.find(libro=> libro.id == body.id)
    if(bookFinded){
     bookFinded.quantity = body.quantity
     localStorage.setItem('cart', JSON.stringify(cart))
     dispatch(getCartThunk())
   dispatch(setIsLoading(false))}
   else{dispatch(addCartThunk(body))}
}

export const deleteThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    const cart = JSON.parse(localStorage.getItem('cart'))
    const newCart = cart.filter(book=> book.id !== id)
    if(newCart){ 
        localStorage.setItem('cart',JSON.stringify(newCart))
      dispatch(getCartThunk())
        dispatch(setIsLoading(false));}
        else{
            console.log('no existe nuevo carro')
        }
}


export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;
