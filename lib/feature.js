const prefSvc = require('sdk/preferences/service')

const prefs = ['beacon.enabled']

exports.beacon = function (val) {
  prefSvc.set('beacon.enabled', val)
}

exports.isEligible = function () {
  // If the user has set any of the study's prefs to a non-default value,
  // they are ineligible for the study
  for (let pref of prefs) {
    if (prefSvc.isSet(pref)) {
      return false
    }
  }
  return true
}

exports.reset = function () {
  // Reset all study prefs back to their default values
  for (let pref of prefs) {
    prefSvc.reset(pref)
  }
}
