const detailStyles = theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  title: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '8px 0',
  },
  tab: {
    backgroundColor: theme.palette.secondary[500],
    textAlign: 'center',
    padding: '2px 4px',
    color: '#fff',
    borderRadius: 3,
    fontSize: '12px',
    minWidth: '40px',
  },
  changes: {
    fontSize: '14px',
    color: '#838383',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    fontSize: '14px',
    padding: '10px',
  },
  paper: {
    margin: '24px',
  },
  reply_header: {
    fontSize: '14px',
    color: '#444',
    padding: '10px',
    backgroundColor: '#f6f6f6',
    borderRadius: '3px 3px 0 0',
  },
})

export default detailStyles
