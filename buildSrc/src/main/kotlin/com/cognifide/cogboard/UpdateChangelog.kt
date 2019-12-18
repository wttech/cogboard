package com.cognifide.cogboard

import com.google.gson.Gson
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.options.Option
import java.io.File
import java.net.URL
import java.time.LocalDate

open class UpdateChangelog : DefaultTask() {

    @Option(option="branch", description="branch name")
    private lateinit var branch: String

    lateinit var version: String

    private val gson: Gson = Gson()
    private val changeLog = File("changelog.md")

    @TaskAction
    fun updateChangelog() {
        val issue = gson.fromJson(URL("https://api.github.com/repos/cognifide/cogboard/issues/$branch").readText(), Issue::class.java)
        changeLog.appendText(
                "\n\n## [$version] - ${LocalDate.now()}\n" +
                        "### What's new\n")
        changeLog.appendText("\n**${issue.title}**\n${issue.body}\n\n${issue.html_url}\n\n")
    }
}