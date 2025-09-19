import { useEffect, useState } from "react";
import Shipping from "../TabInfo/Shipping";
import SizeGuide from "../TabInfo/SizeGuide";
import DetailInfo from "../TabInfo/detailInfo";
import ReviewList from "../ReviewList";


function TabContent({tabState,id, reviewList}) {
  //fade값으로 css를 지정하도록...
  let [fade, setFade] = useState('')
 

  //useEffect로 타이머를 실행
  //0.2초 후에 fade = ani_end로 바꿔줌
  useEffect(()=>{
    let timer = setTimeout(()=>{
      setFade('ani_end')
    },100)
    return(()=>{
      clearTimeout(timer);
      setFade('')
    })
  },[tabState]
)


  return (
    <div className={`ani_start ${fade}`}>
      {[
        <div><DetailInfo id={id}/></div>,
        <div><SizeGuide/></div>,
        <div><Shipping/></div>,
        <div><ReviewList reviewList={reviewList} productId={id} /></div>
      ][tabState]}
    </div>
  )
}
export default TabContent;