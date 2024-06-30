import '../components/left.css'
export default function Left(){
    return (
        <div className='left'>
            <h2>Khu vực quản trị</h2>
            <div>
                <ul className='ull'> 
                    <li>Trang chủ</li>
                    <li>Quản lý phạm nhân</li>
                    <li>Quản lý phòng giam</li>
                    <li id="active">Quản lý người thăm</li>
                    <li>Quản lý nhân viên</li>
                    
                </ul>
            </div>
            <h5>Người dùng: admin</h5>
        </div>
    )
}