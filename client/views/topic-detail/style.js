const detailStyles = theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 0',
    // marginTop: '40px',
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
    '& span': {
      margin: '0 20px',
    },
  },
  collectBtn: {
    color: '#fff',
    fontSize: '14px',
  },
  content: {
    fontSize: '14px',
    padding: '10px',
    '& img': {
      maxWidth: '100%',
      display: 'block',
    },
    '& ul, & ol': {
      paddingLeft: 30,
      '& li': {
        marginBottom: 7,
      },
    },
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
  reply_item: {
    padding: '10px 0 10px 10px',
    fontSize: '14px',
  },
  reply_author_content: {
    display: 'flex',
  },
  user_info: {
    marginLeft: '10px',
  },
  reply_author: {
    color: '#666',
    textDecoration: 'none',
  },
  reply_time: {
    color: '#08c',
    fontSize: '11px',
    textDecoration: 'none',
    marginLeft: '10px',
  },
  replyEditor: {
    position: 'relative',
    padding: 24,
    borderBottom: '1px solid #dfdfdf',
    '& .CodeMirror': {
      height: 150,
      minHeight: 'auto',
      '& .CodeMirror-scroll': {
        minHeight: 'auto',
      },
    },
  },
  notLoginButton: {
    textAlign: 'center',
    padding: '20px 0',
  },
  replyButton: {
    position: 'absolute',
    fontSize: '14px',
    right: 40,
    bottom: 65,
    zIndex: 101,
    opacity: 0.1,
    transition: 'opacity .3s',
    '&:hover': {
      opacity: 1,
    },
  },
  replyIcon: {
    position: 'absolute',
    right: '10px',
    opacity: 0.1,
    transition: 'opacity .3s',
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },
  },
})

export default detailStyles
