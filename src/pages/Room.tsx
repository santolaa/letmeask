import { FormEvent, useEffect, useState } from 'react'
import logoImage from '../assets/images/logo.svg'
import { RoomCode } from '../components/RoomCode'
import { database } from '../services/firebase'
import { Button } from '../components/Button'
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/room.scss'

type FirebaseQuestions = Record<string, {
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  author: {
    name: string
    avatar: string
  }
}>

type Question = {
  id: string
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  author: {
    name: string
    avatar: string
  }
}

type RoomParams = {
  id: string
}

export function Room() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [title, setTitle] = useState('')
  const params = useParams<RoomParams>()
  const roomId = params.id || ''
  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions || {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in.')
    }

    const question = {
      content: newQuestion,
      isHighlited: false,
      isAnswered: false,
      author: {
        name: user.name,
        avatar: user.avatar
      }
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImage} alt='Letmeask' />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
          />
          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button></span>
            )}
            <Button type='submit' disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
