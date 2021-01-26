import _ from 'lodash'

export const selectTabFromUrl = (tabs) => {
  let tabToReturn = tabs[0]

  _.forEach(tabs, (tab) => {
    if (_.includes(window.location.href, tab)) {
      tabToReturn = tab
    }
  })

  return tabToReturn
}
