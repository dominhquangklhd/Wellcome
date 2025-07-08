import { useState } from 'react';
import ProductService from '../../services/ProductService';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await ProductService.signup(email, password);

            setSuccess('Đăng ký thành công! Hãy đăng nhập.');
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Đăng ký</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

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

            <button type="submit">Đăng ký</button>
        </form>
    );
}

export default SignupForm;
