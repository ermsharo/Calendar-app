import styled from 'styled-components'

const Board = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
width: 60vw;
padding: 32px;
margin: auto;
background-color: #F6F9FA;
margin-top: 32px;
`;



const DaysOfWeek = styled.div`
text-align: center; 
text-transform: capitalize;


`;


const MonthTitle = styled.div`

    background-color: #EF4136;
    grid-column: 1/8;
    text-align: center; 
    color: white;
    font-size: 32px;
    padding: 16px;
    margin-bottom: 16px;

`;




function CalendarDay() {

}

let daysOfWeekArray = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado']

let CalendarGenericArray = () =>{
    
}


function CalendarBoard() {
    return (
        <Board>
            <MonthTitle>
               Month
            </MonthTitle>

            {daysOfWeekArray.map((item, index) => (
                <DaysOfWeek>{item}</DaysOfWeek>
            ))}

        </Board>
    );
}

export default CalendarBoard;
