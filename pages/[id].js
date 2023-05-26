import path from 'path'
import fs from 'fs/promises'
import process from 'process'

const Details = (props) => {
  const { loadedProduct } = props

  return(
    <>
      <div>
        <h3>{loadedProduct.name}</h3>
        <p>{loadedProduct.description}</p>
      </div>
    </>
  )
}

const gettingData = async () => {
  const pathFile = path.join(process.cwd(), 'data', 'data-products.json')
  const dataJson = await fs.readFile(pathFile)

  const { products } = JSON.parse(dataJson)

  return products
}

export const getStaticProps = async (context) => {
  const { params } = context
  const productId = params.id

  const products = await gettingData()

  const product = products.find(prod => prod.id === productId)


  return {
    props: {
      loadedProduct: product
    }
  }
}

export const getStaticPaths = async () => {
  const products = await gettingData()

  const paths = products.reduce((acc, prod) => {
    if (prod.id === '1') {
      acc.push({ params: {id: prod.id} })
    }
    return acc
  }, [])

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export default Details