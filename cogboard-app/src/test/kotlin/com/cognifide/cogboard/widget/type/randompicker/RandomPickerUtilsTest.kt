package com.cognifide.cogboard.widget.type.randompicker

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class RandomPickerUtilsTest {

    companion object {
        val SAMPLE_LIST = listOf("1", "2", "3")
    }

    @Test
    fun `Expect nextListIndex to cycle through each index of list`() {
        Assertions.assertEquals(1, SAMPLE_LIST.getNextListIndex(0))
        Assertions.assertEquals(2, SAMPLE_LIST.getNextListIndex(1))
        Assertions.assertEquals(0, SAMPLE_LIST.getNextListIndex(2))
        Assertions.assertEquals(1, SAMPLE_LIST.getNextListIndex(0))
    }

    @Test
    fun `Expect nextListIndex to handle empty list`() {
        Assertions.assertEquals(-1, listOf<String>().getNextListIndex(5))
        Assertions.assertEquals(-1, listOf<String>().getNextListIndex(0))
        Assertions.assertEquals(-1, listOf<String>().getNextListIndex(-1))
    }

    @Test
    fun `Expect nextListIndex to handle invalid current index param`() {
        Assertions.assertEquals(0, SAMPLE_LIST.getNextListIndex(SAMPLE_LIST.size))
        Assertions.assertEquals(0, SAMPLE_LIST.getNextListIndex(-1))
    }

    @Test
    fun `Expect getRandomListIndex to randomly select all indexes`(){
        var usedIndexes = listOf<Int>()

        usedIndexes = usedIndexes.plus(SAMPLE_LIST.getRandomListIndex(usedIndexes))
        usedIndexes = usedIndexes.plus(SAMPLE_LIST.getRandomListIndex(usedIndexes))
        usedIndexes = usedIndexes.plus(SAMPLE_LIST.getRandomListIndex(usedIndexes))

        Assertions.assertTrue(usedIndexes.containsAll(listOf(0,1,2)))
        Assertions.assertTrue(usedIndexes.size == 3)
    }

    @Test
    fun `Expect getRandomListIndex to handle empty list`(){
        Assertions.assertEquals(-1, listOf<String>().getRandomListIndex(listOf()))
    }

    @Test
    fun `Expect getRandomListIndex to get last missing index`(){
        Assertions.assertEquals(0, SAMPLE_LIST.getRandomListIndex(listOf(2,1)))
        Assertions.assertEquals(2, SAMPLE_LIST.getRandomListIndex(listOf(0,1)))
    }
}
