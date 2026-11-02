import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchProducts, type Product } from '../api/products.ts'
import ProductForm from '../components/ProductForm.tsx'

// 상품 목록·등록 (사장님) 화면 (PRD 5절, DESIGN.md 화면 목록 / US-08 / F-01)

type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; products: Product[] }

function showText(value: string | null) {
  return value ?? '—'
}

function showNumber(value: number | null, suffix = '') {
  return value === null ? '—' : `${value.toLocaleString('ko-KR')}${suffix}`
}

function ProductList() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })
  const [notice, setNotice] = useState<string | null>(null)
  const formRef = useRef<HTMLElement>(null)

  const load = useCallback(async () => {
    setState({ status: 'loading' })
    try {
      const products = await fetchProducts()
      setState({ status: 'ready', products })
    } catch (error) {
      setState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : '상품 목록을 불러오지 못했어요',
      })
    }
  }, [])

  useEffect(() => {
    // 화면을 열 때 서버에서 목록을 한 번 불러온다
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  function handleCreated(product: Product) {
    setNotice(`${product.product_code} 상품을 등록했어요`)
    load()
  }

  function goToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
    formRef.current?.querySelector('input')?.focus()
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>상품 목록</h1>
        <p className="page-description">
          명세서 품목을 맞추고 단위를 환산하는 기준이 돼요
        </p>
      </header>

      <section className="card" aria-labelledby="list-title">
        <h2 id="list-title">등록된 상품</h2>

        {notice && (
          <p className="banner banner-success" role="status">
            {notice}
          </p>
        )}

        {state.status === 'loading' && (
          <p className="state-message" role="status">
            상품 목록을 불러오는 중이에요…
          </p>
        )}

        {state.status === 'error' && (
          <div className="banner banner-danger" role="alert">
            <p>{state.message}</p>
            <button type="button" className="button-secondary" onClick={load}>
              다시 불러오기
            </button>
          </div>
        )}

        {state.status === 'ready' && state.products.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              📦
            </span>
            <p>아직 등록한 상품이 없어요</p>
            <button
              type="button"
              className="button-secondary"
              onClick={goToForm}
            >
              상품 등록
            </button>
          </div>
        )}

        {state.status === 'ready' && state.products.length > 0 && (
          <div className="table-scroll">
            <table className="product-table">
              <thead>
                <tr>
                  <th scope="col">상품 코드</th>
                  <th scope="col">상품명</th>
                  <th scope="col">규격</th>
                  <th scope="col">기준 단위</th>
                  <th scope="col">포장 단위</th>
                  <th scope="col" className="numeric">
                    환산값
                  </th>
                  <th scope="col" className="numeric">
                    기준 단가
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.product_code}</td>
                    <td>{showText(product.name)}</td>
                    <td>{showText(product.spec)}</td>
                    <td>{showText(product.base_unit)}</td>
                    <td>{showText(product.pack_unit)}</td>
                    <td className="numeric">
                      {showNumber(product.conversion_qty)}
                    </td>
                    <td className="numeric">
                      {showNumber(product.base_unit_price, '원')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card" aria-labelledby="form-title" ref={formRef}>
        <h2 id="form-title">상품 등록</h2>
        <ProductForm
          onSubmitStart={() => setNotice(null)}
          onCreated={handleCreated}
        />
      </section>
    </main>
  )
}

export default ProductList
