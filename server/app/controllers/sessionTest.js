let num = 1 ;

const testSession = (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    // res.send(req.session);
}

module.exports = {
    testSession
}