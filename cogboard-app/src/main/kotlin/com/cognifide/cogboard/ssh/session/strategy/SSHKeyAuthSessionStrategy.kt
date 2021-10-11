package com.cognifide.cogboard.ssh.session.strategy

import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session

class SSHKeyAuthSessionStrategy(jSch: JSch, authData: SSHAuthData) : SessionStrategy(jSch, authData) {
    override fun initSession(): Session {
        if (authData.password == "") {
            jsch.addIdentity(securityString)
        } else {
            jsch.addIdentity(securityString, authData.password)
        }
        val session = jsch.getSession(authData.user, authData.host)
        session.setConfig("PreferredAuthentications", "publickey")

        return session
    }
}