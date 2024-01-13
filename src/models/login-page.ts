export interface FormValues {
    telegram_id: string,
    login: string,
    password: string,
    second_password: string
}

export enum PageType {
    LOGIN = 'login',
    REGISTRATION = 'registration'
}

export interface LoginPageProps {
    type: PageType
}