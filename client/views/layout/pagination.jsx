import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import PageAction from './pageAction'

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      rowsPerPage: 20,
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page }, this.changePage);
  }

  handleChangeRowsPerPage = (e) => {
    this.setState({
      rowsPerPage: Number(e.target.value),
    }, this.changePage)
  }


  changePage() {
    const { changePage } = this.props
    const { page, rowsPerPage } = this.state
    changePage(page, rowsPerPage)
  }

  render() {
    const { page, rowsPerPage } = this.state
    const { rows } = this.props
    return (
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[20, 40, 60, 80, 100]} // 每页多少条数组
              rowsPerPage={rowsPerPage}// 当前每页条数
              count={rows} // 共有多少条
              page={page} // 当前页
              SelectProps={{ // 下拉框使用原生样式
                native: true,
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}// 修改每页条数
              ActionsComponent={PageAction}// 分页触发器
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}
Pagination.propTypes = {
  rows: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
}
export default Pagination
