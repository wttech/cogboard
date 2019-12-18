package com.cognifide.cogboard

import com.google.gson.Gson
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction
import java.io.File
import java.net.URL
import java.time.LocalDate

open class UpdateChangelog : DefaultTask() {

    private val issueNumberRegex = "[^#][0-9]+".toRegex()
    private val gson: Gson = Gson()
    private val changeLog = File("changelog.md")

    private lateinit var issueNumber: String
    lateinit var version: String
    lateinit var branchName: String

//    @Option(option="branch", description="branch name")
//    fun setBranch(branch: String) { // TODO REGEX startuje od hash i zgarnia 1-4 cyfry
//        this.issueNumber = issueNumberRegex.find(branch)?.value ?: "1" // Branch names should be prefixed with #NO, example: #160-issue-issue
//    }

    @TaskAction
    fun updateChangelog() {
        issueNumber = issueNumberRegex.find(branchName)?.value ?: "1"
        val issue = gson.fromJson(URL("https://api.github.com/repos/cognifide/cogboard/issues/$issueNumber").readText(), Issue::class.java)
        changeLog.appendText(
                "\n\n## [$version] - ${LocalDate.now()}\n" +
                        "### What's new\n")
        changeLog.appendText("\n**${issue.title}**\n${issue.body}\n\n${issue.html_url}\n\n") // TODO Samo short description do #
    }
}

// TODO Dokumentacja (short desc obowiazkowy)