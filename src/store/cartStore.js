import { create } from "zustand";


const cartstore = create((set)=>(
  {
    cartData:[
      {id: 0, name: "White and Black", count:2},
      {id: 1, name: "Gray Nike",  count:1 },
    ]
  }
))
export default cartstore;