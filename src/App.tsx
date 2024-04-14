import './App.css'
import TestImage from './features/test-image'
import { TestPrompt } from './features/test-prompt'

import Nav from './features/nav'
import Content from './features/content'

function App() {

	return (
		<main className="main">
			<div className="container">
				<div className="main-background"></div>
				<div className='nav-wrapper'>
					<Nav />
				</div>

				<Content />
			</div>

		</main>
	)
}

export default App
