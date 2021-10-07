package com.cognifide.cogboard.ssh.session

import com.cognifide.cogboard.ssh.auth.AuthenticationType
import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.cognifide.cogboard.ssh.session.strategy.BasicAuthSessionStrategy
import com.cognifide.cogboard.ssh.session.strategy.SSHKeyAuthSessionStrategy
import com.cognifide.cogboard.ssh.session.strategy.SessionStrategy
import com.jcraft.jsch.JSch

class SessionStrategyFactory(private val jsch: JSch) {
    fun create(authData: SSHAuthData): SessionStrategy =
            when (authData.authenticationType) {
                AuthenticationType.BASIC, AuthenticationType.TOKEN -> {
                    BasicAuthSessionStrategy(jsch, authData)
                }
                AuthenticationType.SSH_KEY -> {
                    SSHKeyAuthSessionStrategy(jsch, authData)
                }
            }
}
