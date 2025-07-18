import { useState } from 'react';
import ProductService from '../../services/ProductService';

function LoginForm({ setIsLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await ProductService.login(email, password);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('permissions', JSON.stringify(data.user.permissions));
            setIsLogin(true);
            window.location.href = '/';
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Đăng nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /><br />

            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            <button type="submit">Đăng nhập</button>
        </form>
    );
}

export default LoginForm;
