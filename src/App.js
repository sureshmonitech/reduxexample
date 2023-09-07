import { useEffect,Fragment} from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector,useDispatch} from'react-redux';
import { uiActions } from './components/store/ui-slice';

import Notification from './components/UI/Notification';

let isInitial=true;

function App() {
  const dispatch=useDispatch();
  const showCart=useSelector(state=>state.ui.cartIsVisible);
  const cart=useSelector((state)=>state.cart);
  const notification=useSelector(state=>state.ui.notification)
useEffect(()=>{
 const sendCartData=async ()=>{
  dispatch(uiActions.showNotification({
    status:'PENDING',
    title:'SENDING....',
    message:'sending cart data',
  }));
  const response = await fetch('https://cart-7339d-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
  {
    method:'PUT',
    body:JSON.stringify(cart),
  });
  
  if(!response.ok){
    throw new Error('Sending cart data failed.');
 
   };
  }
  //const responseData = await response.json();
  dispatch(uiActions.showNotification({
    status:'Success',
    title:'success....',
    message:'sending cart data success',
  }));
 if(isInitial){
  isInitial=false;
  return;

 }

sendCartData().catch(error=>{
  dispatch(uiActions.showNotification({
    status:'error',
    title:'error!....',
    message:'sending cart data failure',
  }));

});
},[cart,dispatch])

  return (
    <Fragment>
      { notification && (
      <Notification 
      status={notification.status}
      title={notification.title}
      message={notification.message}
      />)
}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
