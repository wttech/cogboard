package com.cognifide.cogboard.http.auth

import com.cognifide.cogboard.widget.type.JenkinsJobWidget
import com.cognifide.cogboard.widget.type.ServiceCheckWidget
import com.cognifide.cogboard.widget.type.sonarqube.SonarQubeWidget

enum class AuthenticationType {

    BASIC,
    TOKEN,
    TOKEN_AS_USERNAME;

    companion object {
        fun authType(widgetType: String): AuthenticationType {
            return when (widgetType) {
                matchType(widgetType, AUTH_TOKEN_WIDGETS) -> TOKEN
                matchType(widgetType, TOKEN_AS_USERNAME_WIDGETS) -> TOKEN_AS_USERNAME
                matchType(widgetType, BASIC_AUTH_WIDGETS) -> BASIC
                else -> throw Exception("Unsupported widget type")
            }
        }

        private val AUTH_TOKEN_WIDGETS = setOf(
                JenkinsJobWidget::class.java.simpleName
        )

        private val TOKEN_AS_USERNAME_WIDGETS = setOf(
                SonarQubeWidget::class.java.simpleName
        )

        private val BASIC_AUTH_WIDGETS = setOf(
                SonarQubeWidget::class.java.simpleName,
                JenkinsJobWidget::class.java.simpleName,
                ServiceCheckWidget::class.java.simpleName
        )

        private fun matchType(widgetType: String, widgetTypes: Set<String>): String? {
            return widgetTypes.firstOrNull { it == widgetType }
        }

        fun AuthenticationType.compareType(widgetType: AuthenticationType): Boolean {
            return this == widgetType
        }
    }
}
