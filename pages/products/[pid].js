const Product = (props) => {

  return <h1>{props.product}</h1>
}

export const getServerSideProps = async (context) => {
  const id = params.pid

  return {
    props: {
      product: `image ${id}`
    }
  }
}

export default Product