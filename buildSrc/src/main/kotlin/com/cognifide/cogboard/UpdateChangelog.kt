package com.cognifide.cogboard

import com.google.gson.Gson
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.options.Option
import java.io.File
import java.net.URL
import java.time.LocalDate

open class UpdateChangelog : DefaultTask() {

    private lateinit var issueNumber: String

    lateinit var version: String

    private val gson: Gson = Gson()
    private val changeLog = File("changelog.md")

    @Option(option="branch", description="branch name")
    fun setBranch(branch: String) {
        this.issueNumber = branch.substring(1, 4) // Branch names should be prefixed with #NO, example: #160-issue-issue
    }

    @TaskAction
    fun updateChangelog() {
        println(issueNumber)
        val issue = gson.fromJson(URL("https://api.github.com/repos/cognifide/cogboard/issues/$issueNumber").readText(), Issue::class.java)
        changeLog.appendText(
                "\n\n## [$version] - ${LocalDate.now()}\n" +
                        "### What's new\n")
        changeLog.appendText("\n**${issue.title}**\n${issue.body}\n\n${issue.html_url}\n\n")
    }
}