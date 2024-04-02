import Header from './header'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
	return (

			<main className='bg-background'>
				<Header />
				{children}
			</main>

	)
}

export default MarketingLayout
