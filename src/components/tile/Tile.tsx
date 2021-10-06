import './Tile.css';

interface Props{
    image?: string;
    number: number;
}

export default function Tile({number, image}: Props){
//Adding the chequerboard to the board and the pieces (If image is not null)
    if(number % 2 === 0){
        return<div className="tile black-tile">
            {image && <div style={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
        </div>
    }else{
        return<div className="tile white-tile">
            {image && <div style={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
        </div>
    }
}