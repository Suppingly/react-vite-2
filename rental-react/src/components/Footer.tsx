function Footer(){
    return (
        <>
        <section className="contacts">
            <div className="contacts_menu">
                <h3>Хотите улучшить свои условия?</h3>
                Оставьте заявку, указав свою почту, и мы свяжемся с вами!
                <div className="contacts_form">
                    <input type="text" value="" pattern="email" placeholder="Введите вашу почту" className="contacts_input"/>
                    <input type="button" value="Отправить" className="contacts_button"/>
                </div>
            </div>
        </section>
        </>
    )
}
export default Footer