import React, {useContext, useState, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const message = useMessage()
	const { loading, request, error, clearError } = useHttp()
	const [form, setForm] = useState({
		email: '', password: ''
	})

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const registerHandler = async () => {
		try{
			const data = await request('/api/auth/register', 'POST', { ...form })
			message(data.message)
			console.log('data', data)
		}catch(e){}
	}

	const loginHandler = async () => {
		try{
			const data = await request('/api/auth/login', 'POST', { ...form })
			auth.login(data.token, data.userId)
			console.log('data', data)
		}catch(e){}
	}

    return (
        <div className="row">
			<div className="col s6 offset-s3">
				<h2>Форма авторизации</h2>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
								placeholder="Введите email"
								id="email"
								name="email"
								type="text"
								className="yellow-input"
								value={form.email}
								onChange={changeHandler}
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field">
								<input
								placeholder="Введите пароль"
								id="password"
								name="password"
								type="password"
								className="yellow-input"
								value={form.password}
								onChange={changeHandler}
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button className="btn yellow darken-4" style={{marginRight: 10}} onClick={loginHandler} disabled={loading}>Войти</button>
						<button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Зарегистрироваться</button>
					</div>
				</div>
			</div>
		</div>
    )
}