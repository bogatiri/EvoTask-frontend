import {GlobalLoader} from './GlobalLoader'
import DashboardProfile from './profile/DashboardProfile'

const DashboardHeader = () => {
	return <header>
		<GlobalLoader/>
		<DashboardProfile/>
	</header>
}

export default DashboardHeader
