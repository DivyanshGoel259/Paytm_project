import { Appbar } from "../components/AppBarCompo"
import { Balance } from "../components/BalanceCompo"
import { Users } from "../components/UsersCompo"

export const DashboardPage = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}