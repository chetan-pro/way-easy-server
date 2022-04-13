const path = require('path')
const fs = require('fs-extra')


module.exports = {
    // generatePassword: (password) => {
    //     return new Promise((resolve, reject) => {
    //         return bcrypt.hash(password, 10, async(err, hash) => {
    //             if (err) reject()
    //             resolve(hash)
    //         })
    //     })
    // },
    // toUpperCase: (str) => {
    //     if (str.length > 0) {
    //         const newStr = str
    //             .toLowerCase()
    //             .replace(/_([a-z])/, (m) => m.toUpperCase())
    //             .replace(/_/, '')
    //         return str.charAt(0).toUpperCase() + newStr.slice(1)
    //     }
    //     return ''
    // },

    // generateReferrerCode: function(mobile) {
    //     let text = ''
    //     const possible = '0123456789'
    //     for (let i = 0; i < 3; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length))
    //     }
    //     const last5DigitFromMobile = mobile.substr(mobile.length - 5)
    //     return 'HINDU' + last5DigitFromMobile + text
    // },

    // /**
    //  * @description This function use for create validation unique key
    //  * @param apiTag
    //  * @param error
    //  * @returns {*}
    //  */
    // validationMessageKey: (apiTag, error) => {
    //     let key = module.exports.toUpperCase(error.details[0].context.key)
    //     let type = error.details[0].type.split('.')
    //     type = module.exports.toUpperCase(type[1])
    //     key = apiTag + key + type
    //     return key
    // },
    // /**

    makeRandomNumber: (length) => {
        let result = ''
        const characters =
            '0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
        if (result > 100000) {
            return result
        } else {
            this.makeRandomNumber(length);
        }
    },
    // generateMobileOtp: async function(len, mobile) {
    //     if (process.env.GENERATE_AND_SEND_OTP === 'true') {
    //         let text = ''
    //         const possible = '0123456789'
    //         for (let i = 0; i < len; i++) {
    //             text += possible.charAt(Math.floor(Math.random() * possible.length))
    //         }

    //         const mobileOtpExist = await User.findOne({
    //             where: {
    //                 mobile: mobile,
    //                 status: {
    //                     [Op.not]: Constants.DELETE,
    //                 },
    //                 otp: text,
    //             },
    //         }).then((mobileOtpExistData) => mobileOtpExistData)

    //         if (mobileOtpExist) {
    //             await this.generateMobileOtp(len, mobile)
    //         }
    //         return text
    //     } else {
    //         return 1234
    //     }
    // },

    // generateReferrerCode: function(mobile) {
    //     let text = ''
    //     const possible = '0123456789'
    //     for (let i = 0; i < 3; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length))
    //     }
    //     const last5DigitFromMobile = mobile.substr(mobile.length - 5)
    //     return 'HINDU' + last5DigitFromMobile + text
    // },

    // generateReferrerCodeSocialLogin: function() {
    //     let text = ''
    //     const possible = '0123456789'
    //     for (let i = 0; i < 5; i++) {
    //         text += possible.charAt(Math.floor(Math.random() * possible.length))
    //     }
    //     return 'HINDU' + text
    // },
    generateResetToken: async function(len, mobile) {
        if (['pre-production', 'production'].indexOf(process.env.NODE_ENV) > -1) {
            let text = ''
            const possible = '0123456789'
            for (let i = 0; i < len; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            }

            const mobileResetTokenExist = await User.findOne({
                where: {
                    mobile: mobile,
                    status: {
                        [Op.not]: Constants.DELETE,
                    },
                    reset_token: text,
                },
            }).then((mobileResetTokenExistData) => mobileResetTokenExistData)

            if (mobileResetTokenExist) {
                await this.generateResetToken(len, mobile)
            }
            return text
        } else {
            return 1234
        }
    },

    // sendOtp: async function(mobile, otp) {
    //     if (process.env.GENERATE_AND_SEND_OTP === 'true') {
    //         return new Promise((resolve) => {
    //             fetch(
    //                     `${process.env.MSG91_SEND_OTP_URL}&mobile=91${mobile}&message=Your otp is ${otp}&otp=${otp}`
    //                 )
    //                 .then((res) => res.json())
    //                 .then(() => {
    //                     resolve(true)
    //                 })
    //                 .catch(() => {
    //                     resolve(false)
    //                 })
    //         })
    //     } else {
    //         return true
    //     }
    // },


    ImageUpload: (image, imageName) => {
        console.log(imageName);
        console.log(image.path);
        const oldPath = image.path;
        const newPath = `${path.join(__dirname, '../public/assets/images/user')
    }/${imageName}`;
        const rawData = fs.readFileSync(oldPath);
        console.log(newPath);
        // eslint-disable-next-line consistent-return
        fs.writeFile(newPath, rawData, (err) => {
            if (err) {
                console.log(err)
                return;
            }
        });
    },

    CalculateDistance: (lat1, lat2, lon1, lon2) => {
        console.log(lat1);
        console.log(lat2);
        console.log(lon1);
        console.log(lon2);

        //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)

        var R = 6371; // km
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var lat1 = (lat1) * Math.PI / 180;
        var lat2 = (lat2) * Math.PI / 180;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    },
    // Converts numeric degrees to radians

}