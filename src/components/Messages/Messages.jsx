import { useContext, useEffect } from 'react'
import './Messages.css'
import { userToken } from './../../Context/Token';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MagnifyingGlass } from 'react-loader-spinner';
import { Helmet } from 'react-helmet-async';
export default function Messages() {

  const {token} = useContext(userToken)

  

   function getMessages() {
    return  axios.get('https://sarahaapp-bhyh.onrender.com/api/v1/user/messages/',{
        headers:{
          token
        }
      }).then((res)=> res )
      .catch((err)=> err)
    }
    
    const {data,isLoading,refetch} = useQuery('messageData',getMessages,{
      cacheTime:500000
    })
    function deleteMsg(msgId){
      axios.delete(`https://sarahaapp-bhyh.onrender.com/api/v1/message/${msgId}`,{headers:{token}})
       .then((res)=> {if(res.data.success){
         refetch()
       }
     }
     
       )
       .catch((err)=> console.log(err))
       }
     
    useEffect(()=>{
      window.scrollTo({
        top:0
      })
      },[])
    
      {data?.data?.data == undefined ? refetch() : ''}
  return (<>
    <Helmet>
        <title>الرسائل</title>
      </Helmet>
  <section>
      <div className="container">
      
        <button className='btn btn-primary my-5 mx-auto d-block' onClick={()=> refetch()}>فحص الرسائل الجديده</button>
{isLoading ? <>
            <section className='bg-dark d-flex justify-content-center align-items-center '>
      <MagnifyingGlass
  visible={true}
  height="100"
  width="100"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
  </section>
    </>  : <table className="table text-center py-5 my-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">الرسائل</th>
      <th scope="col">التاريخ</th>
      <th scope="col">حذف رسالة</th>
    </tr>
  </thead>
  <tbody>
    {data?.data.data?.map((msg,index)=>{
        return   <tr key={index}>
        <th scope="row">{index+1}</th>
        <td>{msg.content}</td>
        <td>{msg.createdAt.split('T')[0]}</td>
        <td>  <button className='btn btn-danger' onClick={()=> {deleteMsg(msg._id)
      
        }}>Delete</button>  </td>
        </tr>
    
      })}

</tbody>
</table>
    
  }


  



      </div>

  </section>
  </>
  )
}
