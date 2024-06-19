import Header from './header'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
	return (

			<main className='bg-background custom-scrollbar'>
				<Header />
				{children}
			</main>

	)
}

export default MarketingLayout
