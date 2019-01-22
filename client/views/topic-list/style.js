const primaryStyles = theme => ({
  root1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  root2: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#555',
    fontSize: '16px',
  },
  topTab: {
    backgroundColor: theme.palette.secondary[500],
    textAlign: 'center',
    padding: '2px 4px',
    color: '#fff',
    borderRadius: 3,
    fontSize: '12px',
    minWidth: '40px',
    margin: '0 10px 0 10px',
  },
  normalTab: {
    backgroundColor: theme.palette.primary[500],
    textAlign: 'center',
    padding: '2px 4px',
    color: '#fff',
    borderRadius: 3,
    fontSize: '12px',
    minWidth: '40px',
    margin: '0 10px 0 10px',
  },
  root3: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 10px 0 10px',
    fontSize: '10px',
    minWidth: '70px',
  },
  reply: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
  },
  read: {
    color: '#b4b4b4',
    fontSize: '10px',
  },
  create: {
    fontSize: '11px',
    color: '#778087',
  },
})


export default primaryStyles
