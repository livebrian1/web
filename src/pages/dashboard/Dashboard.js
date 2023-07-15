import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../features/auth/authSlice'
import { getProducts } from '../../features/product/productSlice'
import ProductList from '../../components/product/productList/ProductList'
import ProductSummary from '../../components/product/productSummary/ProductSummary'


const Dashboard = () => {
  useRedirectLoggedOutUser('/login') //This is the Session Expired

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const {products, isLoading, isError, message} = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts())
    }
    
    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div>
        <ProductSummary products={products} isLoading={isLoading}/>
        <ProductList products={products} isLoading={isLoading}/>
    </div>
  )
}

export default Dashboard