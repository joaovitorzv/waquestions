import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import { useQuestions } from '../../hooks/questions'

type Row = {
  id: string,
  totalQuestions: number,
  totalCorrect: number,
  link: string
}

function createData({ id, totalQuestions, totalCorrect, link }: Row) {
  return { id, totalQuestions, totalCorrect, link }
}

const ResultTable: React.FC = () => {
  const { attempts } = useQuestions()

  const rows: Row[] = attempts.map(attempt => {
    return createData({
      id: attempt.id,
      totalQuestions: attempt.questionary.quantity!,
      totalCorrect: attempt.questions_correct,
      link: attempt.id
    })
  })

  return (
    <TableContainer component={Paper} elevation={0} variant='outlined'>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell>Correct</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.reverse().map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.totalQuestions}</TableCell>
              <TableCell>{row.totalCorrect}</TableCell>
              <TableCell>
                <Link href={`/attempts#${row.link}`}>See details</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultTable;