const { validateResult } = require('../utils/validateHelper')
const {
    baseStringChain,
    baseDateChain,
    baseIntChain,
    baseBooleanChain
} = require('./fields.validator')

exports.clinicHistoryValidatorRoules = [
    baseStringChain('name'), 
    baseDateChain('dateOfBirth'),
    baseStringChain('gender'), 
    baseStringChain('maritalStatus'), 
    baseIntChain('weight'),
    baseIntChain('height'),
    baseStringChain('bloodType'),
    baseBooleanChain('hypertension'),
    baseBooleanChain('diabetes'),
    baseBooleanChain('asthma'),
    baseBooleanChain('allergies'),
    baseBooleanChain('heartFailure'),
    baseBooleanChain('tobacco'),
    baseBooleanChain('alcohol'),
    baseBooleanChain('dope'),
    baseBooleanChain('cocaine'),
    baseBooleanChain('otherDrugs'),

    validateResult
]