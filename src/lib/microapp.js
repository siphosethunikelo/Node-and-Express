var Ayoba = getAyoba()

/**
 * Determine the mobile operating system and returns the 
 * proper javascript interface
 */
export function getAyoba() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;


    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return null;
    }

    if (/android/i.test(userAgent)) {
        return window['Android'];
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return null; // todo 
    }

    return 'unknown';
}

//let ayoba = getAyoba();
//var userJID = getAyoba.jid 
// var jid = "62c3bdfffc5c7c3bb30bc7beda52531d2d2df@dev.ayoba.me";
//function startConversation() {
//   ayoba.startConversation(userJID);
 //  console.log("this is the user's jid" +userJID)
 // }