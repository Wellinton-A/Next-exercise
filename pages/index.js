import path from 'path'
import fs from 'fs/promises'
import process from 'process'
import Link from 'next/link'


const  Home = (props) => {
  const { products } = props

  return (
    <>
      <div>
        <ul style={{display: 'flex', flexDirection: 'column'}}>
          {products?.map(product => <Link href={`/${product.id}`} key={product.id}>{product.name}</Link>)}
        </ul>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  console.log('Re-validating...')
  const pathFile = path.join(process.cwd(), 'data', 'data-products.json')
  const dataJson = await fs.readFile(pathFile)
  const { products } = JSON.parse(dataJson)

  if (products.length === 0) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products : products
    },
    revalidate: 60
  }
}

export default Home