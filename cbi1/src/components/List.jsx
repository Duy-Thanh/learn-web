/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import '../components/list.css'
export default function List({ems,onDelete}){
    const [isDelete,setIsdelete] = useState()
    const handleDelete =(id) =>{
        const check = window.confirm("Bạn có chắc chắn muốn xóa thư mục này không?")
        if(check){
            onDelete(id);
            setIsdelete(true);
        }
    }
    return (
        <div className="list">
            <div>
             <h1>DANH SÁCH PHÒNG GIAM</h1>
             <button id='addbtn'> Thêm phòng giam</button>
             <br />
             {
                isDelete && <div style={{padding:'5px', background :'gray'}}> <strong>Xóa thành công!</strong> Dữ liệu phòng đã được xóa khỏi hệ thống </div>
             }
             {/* {!isDelete && <div> <strong>Xóa thành công!</strong> Dữ liệu phòng đã được xóa khỏi hệ thống </div>} */}
            </div>
            <div >
            <table border={1} className="maintable">
                <thead>
                    <tr>
                        <th>Mã phòng</th>
                        
                        <th>Tên phòng</th>
                        <th>Số lượng phạm nhân</th>
                        <th>Thao tác</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        ems.map((em , index)=>(
                            <tr key={em.id}>
                                
                                <td>{index+1}</td>
                                <td>{em.name}</td>
                                
                                <td>{em.amount}</td>
                               
                                <td className='UDbtn'>
                                    <button style={{border:'none'}} >Sửa</button>
                                    <button style={{border:'none' , background :'red' , color:'white'}} onClick={()=> handleDelete(em.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
        </div>
        </div>
        
    )
}