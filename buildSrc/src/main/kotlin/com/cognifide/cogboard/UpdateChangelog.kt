package com.cognifide.cogboard

import com.google.gson.Gson
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.TaskAction
import org.gradle.api.tasks.options.Option
import java.io.File
import java.net.URL
import java.time.LocalDate

open class UpdateChangelog : DefaultTask() {

    private lateinit var branch: String

    @Option(option = "branch", description="Current branch name")
    public fun setBranch(branch: String) {
        this.branch = branch
    }

    @Input
    public fun getBranch(): String {
        return branch
    }

    private val gson: Gson = Gson()
    private val issue = gson.fromJson(URL("https://api.github.com/repos/cognifide/cogboard/issues/$branch").readText(), Issue::class.java)
    private val changeLog = File("changelog.md")

    lateinit var version: String

    @TaskAction
    fun updateChangelog() {
        changeLog.appendText(
                "\n\n## [$version] - ${LocalDate.now()}\n" +
                        "### What's new\n")
            changeLog.appendText("\n**${issue.title}**\n${issue.body}\n\n${issue.html_url}\n\n")
    }
}