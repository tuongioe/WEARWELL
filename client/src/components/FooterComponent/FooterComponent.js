import React from 'react';
import './FooterComponent.css'
import { SiFacebook, SiTwitter } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

function FooterComponent () {
    return (
        <div className="Footer__Element--Block">
            <div className="Footer__Element--AboutUs">
                <p className='Footer__Caption'>Về chúng tôi</p>
                <p className="Footer__AboutUs--Item">Giới thiệu</p>
                <p className="Footer__AboutUs--Item">Liên hệ</p>
            </div>
            <div className="Footer__Element--Subscribe">
                <p className="Footer__Caption">Đăng ký nhận tin</p>
                <input placeholder="Nhập E-mail"></input>
                <button>Đăng ký</button>
            </div>
            <div className="Footer__Element--Link">
                <p className='Footer__Caption'>Liên kết khác</p>
                <p className="Footer__Link--Item"><SiFacebook size={24}/>Facebook</p>
                <p className="Footer__Link--Item"><RiInstagramFill size={24}/>Instagram</p>
                <p className="Footer__Link--Item"><SiTwitter size={24}/>Twitter</p>
            </div>
        </div>
    );
};

export default FooterComponent;