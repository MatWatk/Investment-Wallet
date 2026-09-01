import { Provider } from "react-redux"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import DepositPage from '../DepositPage'
import { store } from "../../../store"
import RouterError from "../../../router/RouteError"
import { render, screen } from "@testing-library/react";
import { action } from "../action"
import { loader } from "../loader"
import { auth } from "../../../services/firebase/config";
import type { DepositData } from "../../../types/DepositTypes"

vi.mock('../action', () => ({
    action: vi.fn(),
}))

vi.mock('../loader', () => ({
    loader: vi.fn(),
}))

const mockedPlatforms = [
    {
        id: '1',
        platformName: 'Platform A',
        loggedUser: 'user@example.com',
    },
    {
        id: '2',
        platformName: 'Platform B',
        loggedUser: 'user@example.com',
    },
    {
        id: '3',
        platformName: 'Platform C',
        loggedUser: 'anotherUser@example.com',
    },

]

const mockedData: DepositData[] = [
    {
        amount: 1000,
        currency: "USD",
        date: "2023-01-01",
        id: "1",
        loggedUser: "user@example.com",
        platform: "Platform A",
    },
    {
        amount: 2000,
        currency: "PLN",
        date: "2023-02-01",
        id: "2",
        loggedUser: "user@example.com",
        platform: "Platform B",
    },
    {
        amount: 1500,
        currency: "USD",
        date: "2023-03-01",
        id: "3",
        loggedUser: "anotherUser@example.com",
        platform: "Platform A",
    }
]

describe('Deposit Page tests', () => {
    afterEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(auth, 'currentUser', {
            value: null,
            configurable: true,
        });
    });

    const renderDepositPage = () => {
        const router = createMemoryRouter([
            {
                path: '/deposit-page',
                element: (
                    <Provider store={store}>
                        <DepositPage />
                    </Provider>),
                action,
                loader,
                errorElement: (
                    <Provider store={store}>
                        <RouterError type='depositPage' />
                    </Provider>),
            }
        ],
            {
                initialEntries: ["/deposit-page"],
            }
        )
        render(<RouterProvider router={router} />)
    }
    it('should render DepositPage correctly', async () => {
        Object.defineProperty(auth, 'currentUser', {
            value: { email: 'user@example.com' },
            configurable: true,
        })

        vi.mocked(loader).mockResolvedValue({
            depositData: mockedData,
            platforms: mockedPlatforms,
        })

        renderDepositPage()
        const title = await screen.findByText('Deposit Page')
        const addDepositButton = await screen.findByRole('button', { name: 'Add Deposit' })
        const userDeposits = mockedData.filter(deposit => deposit.loggedUser === 'user@example.com')

        userDeposits.forEach(deposit => async () => {
            const platform = await screen.findByText(deposit.platform)
            const amount = await screen.findByText(deposit.amount.toString())

            expect(platform).toBeInTheDocument()
            expect(amount).toBeInTheDocument()

        })

        const depositPlatformForAnotherUser = screen.queryByText('Platform C')
        const depositAmountForAnotherUser = screen.queryByText('1500')

        const editButton = screen.getAllByRole('button', { name: 'Edit Deposit' })
        const deleteButton = screen.getAllByRole('img', { name: 'Rubbish Bin' })


        expect(title).toBeInTheDocument()
        expect(addDepositButton).toBeInTheDocument()
        expect(depositPlatformForAnotherUser).not.toBeInTheDocument()
        expect(depositAmountForAnotherUser).not.toBeInTheDocument()
        expect(editButton).toHaveLength(userDeposits.length)
        expect(deleteButton).toHaveLength(userDeposits.length)

    })
})