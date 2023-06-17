import './index.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCall } from './features/api/apiSlice';

function App() {
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);

  useEffect(()=>{
    dispatch(
      getCall({
        path: '/posts',
        body: { /* request body */ },
        headers: { /* headers */ },
        showLoader: true,
        fallback: null,
      })
    );  
  },[])
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">daslkd</h1>
    </div>
  );
}

export default App;
