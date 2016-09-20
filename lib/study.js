/** study.js **/
const self = require('sdk/self')
const shield = require('shield-studies-addon-utils')
const tabs = require('sdk/tabs')
const { when: unload } = require('sdk/system/unload')

const feature = require('./feature')

const studyConfig = {
  name: self.addonId,
  duration: 14,
  surveyUrls: {
    'end-of-study': 'some/url',
    'user-ended-study': 'some/url',
    'ineligible': null
  },
  variations: {
    'nochanges': () => {},
    'sensors-disabled': () => feature.sensors(false),
    'battery-disabled': () => feature.battery(false),
    'webrtc-default-only': () => feature.webrtc_address(true),
    'sensors-and-battery-disabled': () => {
      feature.sensors(false)
      feature.battery(false)
    },
    'sensors-disabled-and-webrtc-default-only': () => {
      feature.sensors(false)
      feature.webrtc_address(true)
    },
    'battery-disabled-and-webrtc-default-only': () => {
      feature.battery(false)
      feature.webrtc_address(true)
    },
    'sensors-disabled-battery-disabled-and-webrtc-default-only': () => {
      feature.sensors(false)
      feature.battery(false)
      feature.webrtc_address(true)
    }
  }
}

class OurStudy extends shield.Study {
  constructor (config) {
    super(config)
  }
  isEligible () {
    // bool Already Has the feature.  Stops install if true
    return super.isEligible() && feature.isEligible()
  }
  whenIneligible () {
    super.whenIneligible()
    // additional actions for 'user isn't eligible'
    tabs.open('data:text/html,Uninstalling, you are not eligible for this study')
  }
  whenInstalled () {
    super.whenInstalled()
    // orientation, unless our branch is 'notheme'
    if (this.variation === 'notheme') {}
    feature.orientation(this.variation)
  }
  cleanup (reason) {
    super.cleanup()  // cleanup simple-prefs, simple-storage
    feature.cleanup()
    // do things, maybe depending on reason, branch
  }
  whenComplete () {
    // when the study is naturally complete after this.days
    super.whenComplete()  // calls survey, uninstalls
  }
  whenUninstalled () {
    // user uninstall
    super.whenUninstalled()
  }
  decideVariation () {
    return super.decideVariation() // chooses at random
    // unequal or non random allocation for example
  }
}

const thisStudy = new OurStudy(studyConfig)

// for testing / linting
exports.OurStudy = OurStudy
exports.studyConfig = studyConfig

// for use by index.js
exports.study = thisStudy

unload((reason) => thisStudy.shutdown(reason))
