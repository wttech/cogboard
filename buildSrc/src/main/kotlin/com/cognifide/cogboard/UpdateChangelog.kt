package com.cognifide.cogboard

import com.google.gson.Gson
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.options.Option
import java.io.File
import java.net.URL
import java.time.LocalDate

open class UpdateChangelog : DefaultTask() {

    private lateinit var branch: String

    @Option(option="branch", description = "Defines which branch was used")
    fun setBranch(branch: String) {
        this.branch = branch
    }

    private val gson: Gson = Gson()
    private val array = gson.fromJson(URL("https://api.github.com/repos/cognifide/cogboard/issues").readText(), Array<Issue>::class.java).toList()
    private val changeLog = File("changelog.md")

    lateinit var version: String

    @TaskAction
    fun updateChangelog() {
        changeLog.appendText(branch)
        changeLog.appendText(
                "\n\n## [$version] - ${LocalDate.now()}\n" +
                        "### What's new\n")
        for (issue in array) {
            changeLog.appendText("\n**${issue.title}**\n${issue.body}\n\n${issue.html_url}\n\n")
        }
    }
}