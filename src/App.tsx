import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { Footer, Header } from './components/Layout'
import Home from './pages/Home'
import RoomDetails from './pages/RoomDetails'
import './App.css'

function App() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    const section = (state as { section?: string } | null)?.section
    const frame = requestAnimationFrame(() => {
      if (section) {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, state])

  return (
    <>
      <button className="skip-link" onClick={() => document.getElementById('conteudo')?.focus()}>
        Pular para o conteúdo
      </button>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quartos/:slug" element={<RoomDetails />} />
        <Route
          path="*"
          element={
            <main id="conteudo" tabIndex={-1} className="container not-found">
              <p className="eyebrow">FLIP PALACE HOTEL</p>
              <h1>Página não encontrada</h1>
              <p>Vamos encontrar um lugar mais aconchegante para você.</p>
              <Link className="button button-gold" to="/">
                Voltar ao início
              </Link>
            </main>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
