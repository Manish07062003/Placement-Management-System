function replaceAndCapitalize(sentence) {
    sentence = sentence.replaceAll(',', ' ');
    sentence = sentence.replaceAll('_', ' ');
    str = sentence.split(" ")
    for (let i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substring(1);
    }
    return str.join(' ')
}
function giveCurrentDateTime() {
    const today = new Date()
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + " " + time;
}
module.exports = {
    replaceAndCapitalize: replaceAndCapitalize,
    giveCurrentDateTime: giveCurrentDateTime
}