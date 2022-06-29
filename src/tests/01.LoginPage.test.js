import React from 'react';
import { screen } from '@testing-library/react';
import {renderWithRouterAndRedux} from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';

const initialState = {
    name: 'bruno',
    email: 'email',
}

describe('Testes na pagina de Login',() => {

    test('Testa se renderiza inputs',() => {
        renderWithRouterAndRedux(<App/>)
        const nameInput = screen.getByText(/nome:/i)
        const emailInput = screen.getByText(/email:/i)
        const playButton = screen.getByRole('button', {  name: /play/i})
        const configButton = screen.getByRole('button', {
            name: /configurações/i
          })
        expect(playButton).toBeInTheDocument()
        expect(configButton).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(nameInput).toBeInTheDocument()
    })
    test('Testa inputs de texto',() => {
        renderWithRouterAndRedux(<App/>)
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputNome = screen.getByTestId('input-player-name')
        userEvent.type(inputNome,'nomeDeExemplo')
        userEvent.type(inputEmail,'email@email.com.br')
        expect(inputEmail).toHaveValue('email@email.com.br')
        expect(inputNome).toHaveValue('nomeDeExemplo')
    })
    test('Testa se redirecionamento',() => {
        const {history}=renderWithRouterAndRedux(<App/>, initialState)
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputNome = screen.getByTestId('input-player-name')
        userEvent.type(inputNome,'nomeDeExemplo')
        userEvent.type(inputEmail,'email@email.com.br')
        const playButton = screen.getByRole('button', {  name: /play/i})
        userEvent.click(playButton)

    //   fetchMock.getOnce('https://opentdb.com/api_token.php?command=request', 
    //   {responde_message: "Token Generated Successfully!"})

        const {pathname} = history.location
        expect(pathname).toBe('/game')
    })


})