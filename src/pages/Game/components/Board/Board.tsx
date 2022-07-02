import React, { ReactNode } from "react";
import { BoardFormState, BoardNameProps } from "../../../../interfaces/board.interfaces";
import { io, Socket } from "socket.io-client"
import './Board.css'
import Square from "../Square/Square";
import ReactLoading from "react-loading";

enum GameStatusEnum {
    OPEN = 'OPEN',
    FULL = 'FULL'
}


class Board extends React.Component<BoardNameProps, BoardFormState> {

    
    lastPlay: string
    socket: Socket
    clientId: string
    gameId: string

    constructor(props: BoardFormState) {
        super(props);
        this.state = {
            squares: Array(9).fill(''),
            gameStatus: GameStatusEnum.OPEN
        }
        this.gameId = ''
        this.socket = io('localhost:8080')
        this.clientId = ''

        

        this.socket.on('changeState', (value) => {
            if (value) {
                if (typeof value === 'string') {
                    console.log(value)
                } else {
                    this.setState({ squares: value.squares }, () => {
                        console.log(JSON.stringify(value.squares))
                    });
                }
            }
            
        })

        this.socket.on('startGame', (value) => {
            this.clientId = this.socket.id
            console.log('=> Value is coming', value)      
            if (value?.players.map((data: { id: any; }) => data.id).includes(this.clientId) ) {
                this.setState({ gameStatus: value.status })
                this.gameId = value.id
            }
        })
        

        this.lastPlay = 'X'
    }

    handleClick(square: number) {
        console.log('=> HandleClick Square', {
            gameId: this.gameId,
            playerId: this.clientId,
            square,
        })
        this.socket.emit('play', 
            {
                gameId: this.gameId,
                playerId: this.clientId,
                square,
            }
        )
    }

    renderSquare(index: number): ReactNode {
        return <Square value={this.state.squares.at(index) || ''} onClick={() => this.handleClick(index)} />
    }

    render(): ReactNode {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export default Board;