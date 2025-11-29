import dom from '../assets/icons/Дом.png'

function Header(){
  return (
    <>
      <header>
        <div className="header_home">
            <img src={dom} alt="" className="home_img"/>
        </div>
        <div className="header-menu-list">
            <a href="" className="header-menu-link">Продать</a>
            <a href="" className="header-menu-link">Арендовать</a>
            <a href="" className="header-menu-link">Онлайн консультация</a>
        </div>
        <div className="button-login">
            Войти
        </div>
      </header>
    </>
  )
}

export default Header