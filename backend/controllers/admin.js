export const landing = (req, res) => {
    res.send({
        success: true,
        message:"app started!"
    })
}

export const loginFunc = (req, res) => {
    
}

export const signinFunc = (req, res) => {
    
}


export const logout = (req, res) => { 
    res.cookie("token", null, {
        httpOnly: true, 
        maxAge: new Date(Date.now()),

    }).json({
        success: true,
        message:'signed out successfully!'
    })
}

