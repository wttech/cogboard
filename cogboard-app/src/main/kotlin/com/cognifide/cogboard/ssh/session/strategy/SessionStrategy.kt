package com.cognifide.cogboard.ssh.session.strategy

import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.jcraft.jsch.JSch
import com.jcraft.jsch.Session

abstract class SessionStrategy(protected val jsch: JSch, protected val authData: SSHAuthData) {
    protected val securityString: String
        get() = authData.getAuthenticationString()

    abstract fun initSession(): Session
}
