import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    padding: '1.2rem 0',
    borderBottom: 'solid 1px var(--input-border-color)',
  },

  mean: {
    fontSize: '1.8rem',
    marginBottom: '0.8rem',
    color: 'var(--text-color)',
    maxWidth: '80%',
    textAlign: 'justify',
  },

  phrase: {
    fontSize: '1.6rem',
    color: 'var(--primary-color)',
    maxWidth: '80%',
    textAlign: 'justify',
  },
}));
