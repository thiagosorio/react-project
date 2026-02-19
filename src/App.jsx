import styles from './App.module.css'
import ImcForm from './components/ImcForm'

export default function App() {
  return (
    <div className={styles.pageBg}>
      <div className={styles.pageShell}>
        <header className={styles.header}>
          <h1 className={styles.title}>Calculadora de IMC</h1>
          <p className={styles.subtitle}>
            Informe sua altura e seu peso para calcular o IMC e ver a classificação de acordo com a tabela.
          </p>
        </header>

        <main className={styles.content}>
          <div className={styles.contentInner}>
            <ImcForm />
          </div>
        </main>
      </div>
    </div>
  )
}
