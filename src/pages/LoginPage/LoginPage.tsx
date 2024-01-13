import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {authAPI} from "../../api/auth-api.ts";
import {setAuth} from "../../state/reducers/auth-reducer.ts";
import {useEffect} from "react";
import {FormValues, LoginPageProps, PageType} from "../../models/login-page.ts";

const validate = ({telegram_id, login, password, second_password}: FormValues) => {
    const errors: Partial<FormValues> = {}
    if (!telegram_id) {
        errors.telegram_id = "Required"
    }
    if (!login) {
        errors.login = "Required"
    }
    if (!password) {
        errors.password = "Required"
    }
    if (!second_password) {
        errors.second_password = "Required"
    }
    if (password != second_password) {
        errors.second_password = "Password should be equal"
    }
    return errors
}
export const LoginPage: React.FC<LoginPageProps> = ({type}) => {
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            telegram_id: '100505',
            login: 'shoqqan',
            password: '777',
            second_password: '777'
        },
        validate,
        onSubmit: async ({telegram_id, login, password}) => {
            if (type === PageType.LOGIN) {
                const token = await authAPI.login(telegram_id, login, password)
                localStorage.setItem('token', token)
                dispatch(setAuth(true))
                navigate('/home')

            } else {
                const token = await authAPI.registration(telegram_id, login, password)
                localStorage.setItem('token', token)
                dispatch(setAuth(true))
                navigate('/home')
            }
        }
    })
    const redirectTo = (page: PageType) => {
        navigate(page === PageType.LOGIN ? '/sign-up' : '/sign-in')
    };
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [])
    return (
        <article className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center">
            <h1 className="text-2xl font-bold">{type === PageType.LOGIN ? "Sign-in :3" : "Sign-up <3"}</h1>
            <form className="w-80 flex flex-col gap-y-5 border p-4 rounded-2xl" onSubmit={formik.handleSubmit}>
                <label htmlFor="telegram_id">Telegram ID</label>
                <input
                    className={`px-2 py-2 border rounded-lg transition-all ${formik.touched && formik.errors.telegram_id && 'border-red-500'}`}
                    name="telegram_id"
                    onChange={formik.handleChange}
                    id="telegram_id"
                    placeholder="1777223"
                    type="text"
                />
                <label htmlFor="login">Login</label>
                <input
                    className={`px-2 py-2 border rounded-lg transition-all ${formik.touched && formik.errors.login && 'border-red-500'}`}
                    name="login"
                    onChange={formik.handleChange}
                    id="login"
                    placeholder="John Doe"
                    type="text"
                />
                <label htmlFor="password">Password</label>
                <input
                    className={`px-2 py-2 border rounded-lg transition-all ${formik.touched && formik.errors.password && 'border-red-500'}`}
                    name="password"
                    onChange={formik.handleChange}
                    id="password"
                    placeholder="*********"
                    type="password"
                />
                {type === PageType.REGISTRATION &&
                    <>
                        <label htmlFor="second_password">Confirm Password</label>
                        <input
                            className={`px-2 py-2 border rounded-lg transition-all ${formik.touched && formik.errors.password && 'border-red-500'}`}
                            name="second_password"
                            onChange={formik.handleChange}
                            id="second_password"
                            placeholder="*********"
                            type="password"
                        />
                    </>
                }
                <button
                    disabled={formik.touched && !formik.isValid}
                    className="px-4 py-2 text-amber-50 bg-[#2383e2] shadow-lg rounded-xl transition-all hover:bg-[#0077d4]"
                    type="submit"
                >
                    Login
                </button>
                <div className="w-full flex justify-between text-sm underline hover:text-[#2383e2]">
                    <button
                        onClick={() => redirectTo(type)}>{type === PageType.LOGIN ? "Don't have an account?" : "Already have an account?"}</button>
                </div>
            </form>
        </article>
    );
};
