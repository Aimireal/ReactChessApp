import React from 'react';
import { forEachLeadingCommentRange } from 'typescript';
import Tile from '../tile/Tile';
import "./Chessboard.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece{
    image: string;
    x: number;
    y: number;
}

const pieces: Piece[] = [];

for(let p = 0; p<2; p++){
    const type = (p === 0 ? "black" : "white");
    const y = (p === 0) ? 7 : 0;

    pieces.push({image: `assets/images/${type}/rook.png`, x:0, y});
    pieces.push({image: `assets/images/${type}/rook.png`, x:7, y});
    pieces.push({image: `assets/images/${type}/horse.png`, x:1, y});
    pieces.push({image: `assets/images/${type}/horse.png`, x:6, y});
    pieces.push({image: `assets/images/${type}/bishop.png`, x:2, y});
    pieces.push({image: `assets/images/${type}/bishop.png`, x:5, y});
    pieces.push({image: `assets/images/${type}/king.png`, x:4, y});
    pieces.push({image: `assets/images/${type}/queen.png`, x:3, y});
}

for(let i = 0; i<8; i++){
    pieces.push({image: "assets/images/black/pawn.png", x:i, y:6})
    pieces.push({image: "assets/images/white/pawn.png", x:i, y:1})
}

let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent){
    const element = e.target as HTMLElement;
    if(element.classList.contains("chess-piece")){
        console.log(e);

        const x = e.clientX - 50;
        const y = e.clientY - 50;

        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        activePiece = element;
    }
}

function movePiece(e: React.MouseEvent){
    if(activePiece && activePiece.classList.contains("chess-piece")){
        console.log(e);

        const x = e.clientX - 50;
        const y = e.clientY - 50;

        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`;
        activePiece.style.top = `${y}px`;
    }
}

function dropPiece(e: React.MouseEvent){
    if(activePiece){
        activePiece = null;
    }
}

export default function Chessboard(){
    let board = [];

    for(let j = verticalAxis.length - 1; j >= 0; j--){
        for(let i = 0; i < horizontalAxis.length; i++){
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach(p =>{
                if(p.x === i && p.y ===j){
                    image = p.image
                }
            });

            board.push(<Tile key={`${j}${i}`} image={image} number={number}/>)
        }
    }

    return <div 
    onMouseDown={e=>grabPiece(e)} 
    onMouseMove={e=>movePiece(e)} 
    onMouseUp={e=>dropPiece(e)} 
    id="chessboard"
    >
        {board}
    </div>
}