import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import {renderWithRouterAndRedux} from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';

describe('Testes na pagina de Feedback',()=>{
    test('testa se a foto está na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')
        const avatarImg = screen.getByRole('img', {
            name: /avatar/i
          })
        expect(avatarImg).toBeInTheDocument()
    })
    test('testa se o nome do usuario está na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')
        const userName = screen.getByTestId('header-player-name')
        expect(userName).toBeInTheDocument()
    })
    test('testa se o score do usuario está na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')
        const userScore = screen.getByTestId('header-score')
        expect(userScore).toBeInTheDocument()
    })
    test('testa se o botão de Play Again está na tela', ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')
        const btnPlayAgain = screen.getByTestId('btn-play-again')
        expect(btnPlayAgain).toBeInTheDocument()
        userEvent.click(btnPlayAgain)
        expect(history.location.pathname).toBe('/')
    })
    test('testa se o botão de Ranking está na tela', async ()=>{
        const {history}=renderWithRouterAndRedux(<App/>)
        history.push('/feedback')
        const btnRanking = screen.getByTestId('btn-ranking')
        expect(btnRanking).toBeInTheDocument()
        userEvent.click(btnRanking)
        await expect(history.location.pathname).toBe('/ranking')
    })

})