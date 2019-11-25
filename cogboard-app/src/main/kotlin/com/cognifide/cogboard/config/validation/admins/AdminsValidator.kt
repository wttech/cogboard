package com.cognifide.cogboard.config.validation.admins

import com.cognifide.cogboard.config.validation.Validator
import java.io.File

object AdminsValidator : Validator {
    override fun validate(config: String): Boolean {
        if (File("/data/admins.json").exists()) {
            return true
        }
        return false
    }
}
