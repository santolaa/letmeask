import classname from 'classnames'
import { ReactNode } from 'react'
import '../styles/question.scss'

type QuestionProps = {
  content: string
  isAnswered?: boolean
  isHighlighted?: boolean
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
}

export function Question({ content, isAnswered = false, isHighlighted = false, author, children }: QuestionProps) {
  return (
    <div
      className={classname(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}
