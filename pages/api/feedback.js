import fs from 'fs'
import path from 'path'
import process from 'process'

const getPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json')
}

const getData = (path) => {
  const fileData = fs.readFileSync(path)
  const data = JSON.parse(fileData)

  return data
}

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email
    const feedbackText = req.body.feedbackText

    const newFeedback = {
      id: new Date().toString(),
      email: email,
      feedbackText: feedbackText
    }

    const pathFile = getPath()
    const data = getData(pathFile)
    data.push(newFeedback)
    fs.writeFileSync(pathFile, JSON.stringify(data))
    res.status(201).json({message: 'success', feedback: newFeedback})
  } else {
    const pathFile = getPath()
    const data = getData(pathFile)
    res.status(200).json({feedback: data})
  }
}

export default handler