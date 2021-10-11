package com.cognifide.cogboard.ssh.session

import com.cognifide.cogboard.ssh.auth.AuthenticationType.BASIC
import com.cognifide.cogboard.ssh.auth.AuthenticationType.TOKEN
import com.cognifide.cogboard.ssh.auth.AuthenticationType.SSH_KEY
import com.cognifide.cogboard.ssh.auth.SSHAuthData
import com.cognifide.cogboard.ssh.session.strategy.BasicAuthSessionStrategy
import com.cognifide.cogboard.ssh.session.strategy.SSHKeyAuthSessionStrategy
import com.cognifide.cogboard.ssh.session.strategy.SessionStrategy
import com.jcraft.jsch.JSch

class SessionStrategyFactory(private val jsch: JSch) {
    fun create(authData: SSHAuthData): SessionStrategy =
            when (authData.authenticationType) {
                BASIC, TOKEN -> {
                    BasicAuthSessionStrategy(jsch, authData)
                }
                SSH_KEY -> {
                    SSHKeyAuthSessionStrategy(jsch, authData)
                }
            }
}
