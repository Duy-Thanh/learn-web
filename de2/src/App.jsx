/* eslint-disable react/prop-types */

import './App.css';
import ManageShop from './ManageShop';

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black', width: '100vw', height: '10%' }}>
        <div className='container-fluid'>
          <a className="navbar-brand me-4 d-flex" style={{ marginLeft: '2%'}}>
              <strong style={{ color: 'white' }}>Trường Đại học Thủy Lợi</strong>
            </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ marginRight: '2%'}}>
              <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
              <form className="d-flex">
                <ul id="account_management" className="navbar-nav">
                    <li className="nav-item">
                        <a id="login" className="nav-link" style={{ color: 'white'}}><b>Trang chủ</b></a>
                    </li>
                    <li className="nav-item">
                        <span id="register" className="nav-link" style={{ color: 'white'}}>Quản lý cửa hàng</span>
                    </li>
                </ul>
                <input id="searchInput" className="form-control-sm me-2 handleFormControl" type="search" placeholder="Tìm kiếm"
                    aria-label="Tìm kiếm" style={{ marginLeft: '20px', backgroundColor: 'white', color: 'black', width: '255px'}}></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm kiếm</button>
              </form>
          </div>
        </div>
      </nav>

      <ManageShop />

      <footer className="footer py-2" style={{ backgroundColor: 'black', color: 'white', position: 'absolute', left: 0, bottom: 0, right: 0 }}>
            <div className="container-fluid">
                <div className="row col-sm-12">
                    <div className="d-flex justify-content-around">
                        <div style={{flexGrow: 1, marginLeft: '2%'}}>
                            <p><strong>Trường Đại học Thủy Lợi</strong></p>
                            <p>Địa chỉ: 175 Tây Sơn, Trung Liệt, Đống Đa, Hà Nội</p>
                            <p>Liên hệ: 0987654321</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}