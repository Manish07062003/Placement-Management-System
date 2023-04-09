function replaceAndCapitalize(sentence) {
    sentence = sentence.replaceAll(',', ' ');
    sentence = sentence.replaceAll('_', ' ');
    str = sentence.split(" ")
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substring(1);
    }
    return str.join(' ')
}
module.exports = {
    replaceAndCapitalize: replaceAndCapitalize,
}