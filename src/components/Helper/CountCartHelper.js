import { getCart } from "@api/cart"
import { setCountCart } from "@redux/slice/app/appSlice"
import { useAppDispatch, useAppSelector } from "@redux/store"
import { useEffect } from "react"

export const CountCartHelper = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const fetchCartData = async () => {
    const cartData = await getCart();
    dispatch(setCountCart(cartData.cart_products.length));
  };
  useEffect(() => {
    if (isAuthenticated) {
      fetchCartData()
    }
  }, [isAuthenticated])

  return null
}