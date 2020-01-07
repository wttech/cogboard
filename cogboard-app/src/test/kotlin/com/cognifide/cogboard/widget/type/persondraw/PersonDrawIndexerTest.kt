package com.cognifide.cogboard.widget.type.persondraw

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class PersonDrawIndexerTest {

    companion object {
        val SAMPLE_LIST = listOf("1", "2", "3")
    }

    @Test
    fun `Expect nextListIndex to cycle through each index of list`() {
        Assertions.assertEquals(1, PersonDrawIndexer.getNextListIndex(0, SAMPLE_LIST))
        Assertions.assertEquals(2, PersonDrawIndexer.getNextListIndex(1, SAMPLE_LIST))
        Assertions.assertEquals(0, PersonDrawIndexer.getNextListIndex(2, SAMPLE_LIST))
    }

    @Test
    fun `Expect nextListIndex to handle empty list`() {
        Assertions.assertEquals(-1, PersonDrawIndexer.getNextListIndex(5, emptyList()))
        Assertions.assertEquals(-1, PersonDrawIndexer.getNextListIndex(0, emptyList()))
        Assertions.assertEquals(-1, PersonDrawIndexer.getNextListIndex(-1, emptyList()))
    }

    @Test
    fun `Expect nextListIndex to handle invalid current index param`() {
        Assertions.assertEquals(0, PersonDrawIndexer.getNextListIndex(SAMPLE_LIST.size, SAMPLE_LIST))
        Assertions.assertEquals(0, PersonDrawIndexer.getNextListIndex(-1, SAMPLE_LIST))
    }

    @Test
    fun `Expect getRandomListIndex to randomly select all indexes`(){
        var usedIndexes = listOf<Int>()

        usedIndexes = usedIndexes.plus(PersonDrawIndexer.getRandomListIndex(SAMPLE_LIST, usedIndexes))
        usedIndexes = usedIndexes.plus(PersonDrawIndexer.getRandomListIndex(SAMPLE_LIST, usedIndexes))
        usedIndexes = usedIndexes.plus(PersonDrawIndexer.getRandomListIndex(SAMPLE_LIST, usedIndexes))

        Assertions.assertTrue(usedIndexes.containsAll(listOf(0,1,2)))
        Assertions.assertTrue(usedIndexes.size == 3)
    }

    @Test
    fun `Expect getRandomListIndex to handle empty list`(){
        Assertions.assertEquals(-1, PersonDrawIndexer.getRandomListIndex(listOf(), listOf()))
    }

    @Test
    fun `Expect getRandomListIndex to get last missing index`(){
        Assertions.assertEquals(0, PersonDrawIndexer.getRandomListIndex(SAMPLE_LIST, listOf(2,1)))
    }
}
