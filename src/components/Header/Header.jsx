
import './Header.scss'
import { ReactComponent as Logo } from '../../img/logo-1366.svg';

import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
    return (
        <div className={'wrap'}>
            <div className='menu-and-logo'>
                <div className='menu'>
                    <AiOutlineMenu color={'#3971c1'} size={24} width='100%' height='100%' />
                </div>
                <div className={'logo-wrap'}>
                    <Logo width={'100%'} height={'100%'} />
                </div>
            </div>
            <div className={'icon'} />
        </div>
    );
  }
  
  export default Header;