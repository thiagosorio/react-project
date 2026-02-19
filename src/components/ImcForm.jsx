import styles from './ImcForm.module.css'
import { useState } from 'react'

// Subcomponente para o resultado
function ImcResult({ value, classification }) {
  return (
    <div className={styles.result}>
      <div className={styles.resultBox}>
        <p className={styles.resultLabel}>Seu IMC</p>
        <p className={styles.resultValue}>{value ?? '—'}</p>
      </div>
      <div className={styles.resultBox}>
        <p className={styles.resultLabel}>Classificação</p>
        <p className={styles.resultValue}>{classification ?? '—'}</p>
      </div>
    </div>
  )
}

// Subcomponente para a tabela
function ImcTable({ imcRanges, classification }) {
  return (
    <section className={styles.tableSection}>
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>Tabela de IMC (OMS)</h2>
        <p className={styles.tableSubtitle}>
          Compare o resultado com as faixas abaixo para entender a classificação.
        </p>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">IMC</th>
              <th scope="col">Classificação</th>
            </tr>
          </thead>
          <tbody>
            {imcRanges.map((item) => (
              <tr
                key={item.label}
                className={classification === item.label ? styles.activeRow : ''}
              >
                <td>{item.range}</td>
                <td>{item.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// Componente principal
export default function ImcForm() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [imc, setImc] = useState(null)

  // Array de dados para a tabela
  const imcRanges = [
    { range: '< 18,5', label: 'Abaixo do peso' },
    { range: '18,5 – 24,9', label: 'Peso normal' },
    { range: '25 – 29,9', label: 'Sobrepeso' },
    { range: '30 – 34,9', label: 'Obesidade grau I' },
    { range: '35 – 39,9', label: 'Obesidade grau II' },
    { range: '≥ 40', label: 'Obesidade grau III' },
  ]

  // Função para calcular classificação
  function getImcClassification(imc) {
    if (imc < 18.5) return 'Abaixo do peso'
    if (imc < 25) return 'Peso normal'
    if (imc < 30) return 'Sobrepeso'
    if (imc < 35) return 'Obesidade grau I'
    if (imc < 40) return 'Obesidade grau II'
    return 'Obesidade grau III'
  }

  // Classificação derivada do IMC
  const classification = imc === null ? null : getImcClassification(imc)

  // Função de cálculo do IMC
  const handleCalculate = () => {
    const h = parseFloat(height)
    const w = parseFloat(weight)

    if (h <= 0 || w <= 0) return

    const calculatedImc = Number((w / (h * h)).toFixed(1))
    setImc(calculatedImc)
  }

  return (
    <section className={styles.card} aria-label="Calculadora de IMC">
      <div className={styles.cardBody}>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="height" className={styles.label}>
                Altura (m)
              </label>
              <input
                id="height"
                className={styles.input}
                type="number"
                step="0.01"
                min="0"
                placeholder="Ex.: 1.75"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="weight" className={styles.label}>
                Peso (kg)
              </label>
              <input
                id="weight"
                className={styles.input}
                type="number"
                step="0.1"
                min="0"
                placeholder="Ex.: 70.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <button type="button" className={styles.button} onClick={handleCalculate}>
              Calcular IMC
            </button>
          </div>

          {/* Resultado */}
          {imc !== null && <ImcResult value={imc} classification={classification} />}
        </form>

        {/* Tabela */}
        <ImcTable imcRanges={imcRanges} classification={classification} />
      </div>
    </section>
  )
}
