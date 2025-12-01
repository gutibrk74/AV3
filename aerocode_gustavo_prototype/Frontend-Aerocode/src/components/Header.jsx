import { useNavigate } from 'react-router-dom'

export default function Header({ title }) {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="title">{title}</div>
      <div className="actions">
        <button className="btn" onClick={() => navigate('/login')}>Perfil</button>
      </div>
    </header>
  )
}
