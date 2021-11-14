package com.cognifide.cogboard.logStorage

import com.mongodb.client.MongoClient
import com.mongodb.MongoException
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import org.bson.Document

class MongoLogStorage {

    private fun getClient(): MongoClient? {
        if (client != null) {
            return client
        }
        try {
            client = MongoClients.create("mongodb://root:root@mongo:27017/")
        } catch (exception: MongoException) {
            println("EXCEPTION: $exception")
        }
        return null
    }

    private fun getCollection(name: String): MongoCollection<Document>? {
        val client = getClient() ?: return null
        val database = client.getDatabase(DATABASE_NAME)
        return database.getCollection(name)
    }

    companion object {
        private var client: MongoClient? = null
        private const val DATABASE_NAME: String = "logs"
    }
}