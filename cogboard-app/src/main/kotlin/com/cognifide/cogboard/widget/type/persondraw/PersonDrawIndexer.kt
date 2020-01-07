package com.cognifide.cogboard.widget.type.persondraw

import kotlin.random.Random

class PersonDrawIndexer {
    companion object {
        fun getNextListIndex(currentIndex: Int, values: List<String>): Int {

            if (values.isEmpty()) {
                return -1
            }

            val nextIndex = if (currentIndex >= 0) currentIndex + 1 else 0
            return if (values.isNotEmpty() && nextIndex < values.size) nextIndex else 0
        }

        fun getRandomListIndex(values: List<String>, usedIndexes: List<Int>): Int {

            if (values.isEmpty()) {
                return -1
            }

            val indexes = values.mapIndexed { index, _ -> index }
                    .filter { i -> !usedIndexes.contains(i) }

            // If there is one index, there is no need to randomize
            if (indexes.size == 1) {
                return indexes[0]
            }

            return if (indexes.isNotEmpty()) indexes[(getRandomNumber(indexes.size))] else getRandomNumber(values.size)
        }

        private fun getRandomNumber(size: Int): Int = Random.nextInt(0, size)
    }
}
