import React from 'react'

import * as Yup from 'yup'
import { withFormik } from 'formik'

import { makeStyles, TextField, Checkbox, Select, MenuItem, InputLabel, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const App = ({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={(errors.email && touched.email) && errors.email}
          error={errors.email && touched.email}
          margin="normal"
        />
      </div>
      <div>
        <div>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={(errors.password && touched.password) && errors.password}
            error={errors.password && touched.password}
            margin="normal"
          />
        </div>
      </div>
      <div>
        <InputLabel htmlFor="news">Join our newsletter</InputLabel>
        <Checkbox
          name="newsletter"
          id="news"
          checked={values.newsletter}
          onChange={handleChange}
        />
      </div>
      <div>
        <InputLabel htmlFor="level">Choose a plan</InputLabel>
        <Select
          value={values.level}
          onChange={handleChange}
          inputProps={{
            name: 'level',
            id: 'level',
          }}
        >
          <MenuItem value="junior">Junior</MenuItem>
          <MenuItem value="middle">Middle</MenuItem>
          <MenuItem value="senior">Senior</MenuItem>
        </Select>
      </div>
      <div>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, level }) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || false,
      level: level || 'middle',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(7, 'Password must be 7 characters or longer').required('Password is required'),
  }),
  handleSubmit(values, { resetForm, setErrors }) {
    setTimeout(() => {
      if (values.email === 'rind@test.io') {
        setErrors({ email: 'That email is already taken' })
      } else {
        console.log(values)
        resetForm()
      }
    }, 2000)
  },
})(App)

export default FormikApp
