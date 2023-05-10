import { React, useState, useEffect } from 'react';
import './App.css';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';

import {GetNews} from './Api'



function BookM({name,description,index}){
  
  const[coloractive,setColorActive] = useState(false)
  const [markData ,setMarkData] = useState([])
  const Mark = (name,description,index)=>{
  let  markList = markData
    if(localStorage.getItem("mark") !==null && localStorage.getItem("mark") !==[]){
      JSON.parse(localStorage.getItem("mark")).map((elem)=>{
        markList.push(elem)
      })
     
    }
    markList.push({markName:name,markDescription:description,MarkId:index})
    setMarkData(markList)
    localStorage.setItem("mark", JSON.stringify(markData))
    setColorActive(true)
  }
 
  return (
    <>

        <BsFillBookmarkHeartFill onClick={()=>{Mark(name,description,index)}}  className={ coloractive && 'activemark' }/>
    </>
  )
}

function App() {
  
   useEffect(()=>{
      fetchData()
   },[])

   const[news,setNews] = useState()
   const[newsdescription,setNewsDescription] = useState()
   const[showmark,setShowMark] = useState(false)

  


  async function fetchData() {
    let data =  await GetNews();
    setNews(data)
  }
   return(
      <>
     <section className='news'> 
             <div className='container'>
              {  
                showmark ===false ? 
                <div className='gotomark'>
                  <BsFillBookmarkHeartFill onClick={()=>{setShowMark(true)}}/>
                </div>:
                <div className='gotomark'>
                  <MdOutlineArrowBackIosNew onClick={()=>{setShowMark(false)}}/>
                 </div>
              }
                
                 <h1 className='title'>Breacking News station</h1>
                  <div className='wrap'>
                   
                   {
                    news && news.length !== 0 ? news.sources.map((elem,index)=>{
                     
                       return(
                          <div className='wraping' key={index}>
                            <h4 onClick={()=>{ setNewsDescription(elem.description)}}>{elem.name}</h4>
                               <BookM key={index} name = {elem.name}  description = {elem.description} index = {index}/>
                              
                          </div>         
                       )
                      
                    }) : null
                  
                   }
                    
  

    
                  </div>
             </div>
     </section>

      {  
         showmark && 
         <section className='bookmark'> 
         <div className='container'>
                     <h1 className='title'>Book Marks</h1>
                       <div className='wrap'>
                       
                       {
                          
                        
                          JSON.parse(localStorage.getItem("mark")) && JSON.parse(localStorage.getItem("mark")).length !== 0 ? JSON.parse(localStorage.getItem("mark")).map((elem,index)=>{
                         
                           return(
                            
                               <div className='wraping'>
                                 <h4 onClick={()=>{ setNewsDescription(elem.markDescription)}}>{elem.markName}</h4>
                               </div>
 
                               
                               
                           )
                           
                         }) : <h5>Zero Book Mark</h5>
                       
                       }
                       </div>
           </div>
      </section>
      }
    
   
    { newsdescription && 
       <div className='modal'>

             <h5>{newsdescription && newsdescription}  <MdOutlineCancel onClick={()=>{setNewsDescription(null)}}/></h5>
             
        </div>
    }
    
     </>
     
     
   )
 
}

export default App;






