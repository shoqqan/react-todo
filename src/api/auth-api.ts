import axios, {AxiosInstance} from "axios";

const instance = (): AxiosInstance => {
    return axios.create(
        {
            baseURL: 'https://todo-back-production.up.railway.app/auth',
        }
    )
}

export const authAPI = {
    login(telegram_id: string, login: string, password: string): Promise<string> {
        return instance().post('login', {telegram_id, login, password}).then(res => res.data.token)
    },
    registration(telegram_id: string, login: string, password: string): Promise<string> {
        return instance().post('registration', {telegram_id, login, password}).then(res => res.data.token)
    }
}
