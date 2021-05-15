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

function createData(id: number, totalQuestions: number, totalCorrect: number, link: string) {
  return { id, totalQuestions, totalCorrect, link }
}

const rows = [
  createData(1, 15, 14, '/'),
  createData(2, 15, 9, '/'),
  createData(3, 10, 8, '/'),
  createData(4, 10, 4, '/')
]

const ResultTable: React.FC = () => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell>Correct</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.totalQuestions}</TableCell>
              <TableCell>{row.totalCorrect}</TableCell>
              <TableCell>
                <Link component={RouterLink} to={row.link}>See details</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ResultTable;