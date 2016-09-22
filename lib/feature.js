const prefSvc = require('sdk/preferences/service')

const prefs = [
  'device.sensors.enabled',
  'dom.battery.enabled'
]

exports.sensors = function (val) {
  console.log('Setting device.sensors.enabled: ', val)
  prefSvc.set('device.sensors.enabled', val)
}

exports.battery = function (val) {
  console.log('Setting dom.battery.enabled: ', val)
  prefSvc.set('dom.battery.enabled', val)
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

exports.cleanup = function () {
  // Reset all study prefs back to their default values
  for (let pref of prefs) {
    prefSvc.reset(pref)
  }
}
