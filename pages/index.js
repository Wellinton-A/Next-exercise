import path from 'path'
import fs from 'fs/promises'
import process from 'process'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'


const  Home = () => {
  const [feedbackItems, setFeedback] = useState([])
  const [resp, setResp] = useState()

  const form = useFormik({
    initialValues: {
      email: '',
      feedbackText: ''
    },
    onSubmit: (values) => {
      fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          feedbackText: values.feedbackText
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json()).then(response => setResp(response))
    }
  })

  useEffect(() => {
    fetch('/api/feedback').then(feedback => feedback.json()).then(feedback => setFeedback(feedback.feedback))
  }, [resp])

  console.log(feedbackItems)


  return (
    <>
      <div>
        <h1>Assine a Newsletter</h1>
        <form onSubmit={form.handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' value={form.values.email} onChange={form.handleChange}/>
          <br/>
          <label htmlFor='feedbackText'>Feedback</label>
          <textarea id='feedbackText' value={form.values.feedbackText} onChange={form.handleChange}/>
          <button type='submit'>Enviar</button>
        </form>
        <ul>
          {feedbackItems.map((feed) => <li key={feed.id}>{feed.feedbackText}</li>)}
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