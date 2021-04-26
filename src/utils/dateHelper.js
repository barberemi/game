import moment from 'moment'

export const getDaysDateDiffBetweenNowAnd = (date) => {
  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  const firstDate = moment(new Date())
  const secondDate = moment(new Date(date))

  return Math.round(Math.abs((firstDate - secondDate) / oneDay))
}
