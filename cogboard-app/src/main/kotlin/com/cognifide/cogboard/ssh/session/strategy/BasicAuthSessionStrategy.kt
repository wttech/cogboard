package com.cognifide.cogboard.ssh.session.strategy

import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session

class BasicAuthSessionStrategy(jsch: JSch, authData: SSHAuthData) : SessionStrategy(jsch, authData) {

    override fun initSession(): Session {
        val session = jsch.getSession(authData.user, authData.host)
        session.setPassword(securityString)

        return session
    }
}
