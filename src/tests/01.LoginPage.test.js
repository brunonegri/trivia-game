import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import {renderWithRouterAndRedux} from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';

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
    test('Testa se redireciona para tela de jogo',() => {
        const {history}=renderWithRouterAndRedux(<App/>)
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputNome = screen.getByTestId('input-player-name')
        const playButton = screen.getByRole('button', {  name: /play/i})
        userEvent.type(inputNome,'nomeDeExemplo')
        userEvent.type(inputEmail,'email@email.com.br')
        userEvent.click(playButton)

        const {pathname} = history.location
        expect(pathname).toBe('/game')
    })
    test('Testa se redireciona para tela de configurações',() => {
        const {history}=renderWithRouterAndRedux(<App/>)
        const configButton = screen.getByRole('button', {
            name: /configurações/i
          })
        userEvent.click(configButton)

        const {pathname} = history.location
        expect(pathname).toBe('/settings')
    })

})