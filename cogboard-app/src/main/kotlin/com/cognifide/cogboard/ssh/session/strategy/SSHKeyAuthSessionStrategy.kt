package com.cognifide.cogboard.ssh.session.strategy

import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session
import io.netty.util.internal.StringUtil.EMPTY_STRING

class SSHKeyAuthSessionStrategy(jSch: JSch, authData: SSHAuthData) : SessionStrategy(jSch, authData) {
    override fun initSession(): Session {
        if (authData.password == EMPTY_STRING) {
            jsch.addIdentity(securityString)
        } else {
            jsch.addIdentity(securityString, authData.password)
        }
        val session = jsch.getSession(authData.user, authData.host, authData.port)
        session.setConfig("PreferredAuthentications", "publickey")

        return session
    }
}
