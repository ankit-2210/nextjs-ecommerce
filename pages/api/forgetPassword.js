import Forgot from "../../models/Forgot";
// import User from "../../models/User";

export default function handler(req, res) {

    if (req.body.sendMail) {
        console.log(req.body.sendMail);
        let token = `1234444444444444mjnjnn4kj3ok3k2`;
        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })

        // let email = `We have sent you this email in response to your request to reset your password on ${site - name}. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
        //                         <br/><br/>
        //                         To reset your password for <a href=""></a>, please follow the link below:
        //                         <a href="https://codeswear.com/forget?token=${token}">Click here to reset the password</a>
        //                         <br/><br/>
        //                         We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your ${site - name} My Account Page and clicking on the "Change Email Address or Password" link.
        //                         <br/><br/>`

    }
    else {

    }

    res.status(200).json({ success: true })
}
