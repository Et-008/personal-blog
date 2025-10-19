import React from 'react'
import './style.scss'
import ReactIcon from '../../../static/icons/react-dark.svg'
import Supabase from '../../../static/icons/supabase.svg'
import Tailwind from '../../../static/icons/tailwind.svg'
import Html from '../../../static/icons/html.svg'
import Css from '../../../static/icons/css.svg'
import Express from '../../../static/icons/express.svg'
import Websocket from '../../../static/icons/websocket.svg'
import NodeJs from '../../../static/icons/nodejs.svg'
import MongoDB from '../../../static/icons/mongodb.svg'
import Firebase from '../../../static/icons/firebase.svg'
import Javascript from '../../../static/icons/javascript.svg'
import Git from '../../../static/icons/git.svg'
import Typescript from '../../../static/icons/typescript.svg'
import NextJs from '../../../static/icons/nextjs.svg'
import Gatsby from '../../../static/icons/gatsby.svg'
import Redux from '../../../static/icons/redux.svg'
import Webpack from '../../../static/icons/webpack.svg'
import Babel from '../../../static/icons/babel.svg'
// import Jest from '../../../static/icons/jest.svg'
// import Enzyme from '../../../static/icons/enzyme.svg'
// import ReactTestingLibrary from '../../../static/icons/react-testing-library.svg'
// import Cypress from '../../../static/icons/cypress.svg'
// import Storybook from '../../../static/icons/storybook.svg'

const techStack = [
  { name: 'React', icon: ReactIcon },
  { name: 'JS', icon: Javascript },
  { name: 'TS', icon: Typescript },
  { name: 'Redux', icon: Redux },
  { name: 'Next.js', icon: NextJs },
  { name: 'Webpack', icon: Webpack },
  { name: 'Babel', icon: Babel },
  { name: 'Node.js', icon: NodeJs },
  { name: 'MongoDB', icon: MongoDB, accronym: 'Mongo' },
  { name: 'Express', icon: Express },
  { name: 'Gatsby', icon: Gatsby },
  { name: 'Git', icon: Git },
  { name: 'Html', icon: Html },
  { name: 'Css', icon: Css },
  { name: 'Websocket', icon: Websocket, accronym: 'WS' },
  { name: 'Firebase', icon: Firebase },
  { name: 'Supabase', icon: Supabase },
  { name: 'Tailwind', icon: Tailwind },
]

class TechStack extends React.Component {
  render() {
    return (
      <div className="tech-stack">
        {techStack.map(item => (
          <span className="tech-stack-icon-container" title={item.name}>
            <img src={item.icon} alt={item.name} className="tech-stack-icon" />
            {item.accronym || item.name}
          </span>
        ))}
      </div>
    )
  }
}

export default TechStack
