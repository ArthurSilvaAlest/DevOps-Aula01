import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    area: '',
    comentario: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          area: formData.area,
          comentario: formData.comentario,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Falha ao enviar. Tente novamente.')
      }
      setSubmitted(true)
    } catch (err) {
      setErrorMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <header className="hero">
        <h1>DevOps: Integração de Desenvolvimento e Operações</h1>
        <p>
          Entenda o que é DevOps, as principais ferramentas e como
          se relaciona com o trabalho de desenvolvedores.
        </p>
      </header>

      <section className="section" id="o-que-e">
        <h2>O que é DevOps?</h2>
        <p>
          DevOps é uma cultura e conjunto de práticas que aproximam equipes de
          desenvolvimento (Dev) e operações (Ops) para acelerar a entrega de valor,
          melhorar a qualidade e aumentar a confiabilidade dos sistemas.
        </p>
        <p>
          Isso inclui automação de build, testes, deploy e infraestrutura, além de
          monitoramento contínuo e feedback rápido para evoluir o produto com
          segurança e eficiência.
        </p>
      </section>

      <section className="section" id="ferramentas">
        <h2>Ferramentas comuns em DevOps</h2>
        <ul className="tools">
          <li><strong>CI/CD:</strong> GitHub Actions, GitLab CI, Jenkins</li>
          <li><strong>Containers:</strong> Docker, Podman</li>
          <li><strong>Orquestração:</strong> Kubernetes</li>
          <li><strong>Infra como código:</strong> Terraform, Ansible</li>
          <li><strong>Observabilidade:</strong> Prometheus, Grafana, ELK/EFK</li>
          <li><strong>Nuvem:</strong> AWS, Azure, GCP</li>
        </ul>
      </section>

      <section className="section" id="comparacao">
        <h2>DevOps x Desenvolvedores</h2>
        <p>
          Enquanto desenvolvedores focam em criar funcionalidades e escrever código,
          profissionais de DevOps garantem que esse código seja integrado, testado,
          versionado, empacotado e implantado de forma confiável, escalável e segura.
        </p>
        <p>
          Em um time moderno, as áreas se complementam: Dev escreve o produto,
          DevOps desenha e automatiza o caminho até produção e mantém a
          observabilidade para evolução contínua.
        </p>
      </section>

      <section className="section" id="saiba-mais">
        <h2>Saiba mais</h2>
        <p>Preencha o formulário para receber materiais e links úteis.</p>
        {submitted ? (
          <div className="success" role="status">
            Obrigado! Em breve entraremos em contato.
          </div>
        ) : (
          <form className="form" onSubmit={handleSubmit} noValidate>
            {errorMsg && (
              <div className="success" style={{ borderColor: '#ef4444', color: '#fecaca', background: '#300' }}>
                {errorMsg}
              </div>
            )}
            <div className="field">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="area">Área de atuação</label>
              <select
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="desenvolvimento">Desenvolvimento</option>
                <option value="devops">DevOps/Plataforma</option>
                <option value="qa">QA/Testes</option>
                <option value="infra">Infraestrutura / Cloud</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="comentario">Comentário</label>
              <textarea
                id="comentario"
                name="comentario"
                placeholder="Conte um pouco do que você busca"
                rows={4}
                value={formData.comentario}
                onChange={handleChange}
              />
            </div>

            <button className="submit" type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        )}
      </section>

      <footer className="footer">
        <small>© {new Date().getFullYear()} DevOps Guia Rápido</small>
      </footer>
    </div>
  )
}

export default App
