import styled from 'styled-components'

const Board = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

`;

const DaysOfWeek = styled.div`

`;




function CalendarDay(){

}

let daysOfWeekArray = ['domingo','segunda','terça', 'quarta', 'quinta', 'sexta', 'sabado']

function CalendarBoard() {
    return (
        <Board>
<DaysOfWeek></DaysOfWeek>

        </Board>
    );
}

export default CalendarBoard;
