export const template = {
    title: 'RocketSale',
    description: 'Быстро купи - быстро продай, ну или как-то так',
    components: {
        form: {
            items: [
                {
                    title: 'Логин или почта',
                    type: 'text',
                    name: 'usernameOrEmail',
                    placeholder: 'Введите Ваш логин или почту'
                },
                {
                    title: 'Пароль',
                    type: 'password',
                    name: 'password',
                    placeholder: 'Введите пароль'
                }
            ]
        },
        button: {
            title: 'Войти'
        }
    }
};
