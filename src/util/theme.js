export default {
    palette: {
      primary: {
        light: '#cfd8dc',
        main: '#607d8b',
        dark: '#37474f',
        contrastText: '#eceff1',
      },
      secondary: {
        light: '#b2ebf2',
        main: '#00acc1',
        dark: '#006064',
        contrastText: '#e0f7fa',
      }
    },
    typography: {
      useNextVariants: true,
    },
    forms: {
      form: {
        textAlign: 'center',
      },
      icon: {
          width: 60,
          margin: '20px auto 20px auto'
      },
      button: {
          marginTop: 20,
          position: 'relative',
      },
      textField: {
          margin: '5px auto 5px auto'
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem'
      },
      small: {
          fontSize: '1rem'
      },
      link: {
          color: '#00bfa5',
          fontSize: '1rem'
      }, 
      progress: {
          position: 'absolute',
      }
    },
    comments: {
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      ProfileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
      },
      dialogContent: {
        padding: 20
      },
      closeButton: {
        position: 'absolute',
        left: '90%',
      },
      expandButton: {
        position: 'absolute',
        bottom: '15%',
        left: '80%',
      },
      spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50,
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20,
      }
    }
  }