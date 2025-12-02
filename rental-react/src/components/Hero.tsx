import House from '../assets/images/house.jpg'

function Hero() {
    return (
        <>
        <main className='hero'>
            <section className="container">
            <section className="hero_con">
                <div className="hero_text">
                    <h1 className="hero_logo">Помогаем людям продать жильё и арендовать дом по хорошей цене</h1>
                    <p>Мы помогаем людям быстро и выгодно продать жильё
    или арендовать дом по доступной цене. Благодаря нашим экспертам и
    современным инструментам, каждый клиент получает поддержку на всех
    этапах сделки - от оценки недвижимости до заключения договора. Мы
    делаем процесс продажи и аренды простым, прозрачным и выгодным для
    всех сторон</p>
                </div>
                <div className="hero_image">
                    <img src={House} alt="ы" className="hero_img"/>
                </div>
            </section>
        </section>
        </main>
        </>
    )
}
export default Hero