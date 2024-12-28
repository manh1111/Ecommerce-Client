import { getCart } from "@api/cart"
import { setCountCart } from "@redux/slice/app/appSlice"
import { useAppDispatch } from "@redux/store"
import { useEffect } from "react"

export const CountCartHelper = () => {
  const dispatch = useAppDispatch()
  const fetchCartData = async () => {
    const cartData = await getCart();
    dispatch(setCountCart(cartData.cart_products.length));
  };
  useEffect(() => {
    fetchCartData()
  }, [dispatch])

  return null
}