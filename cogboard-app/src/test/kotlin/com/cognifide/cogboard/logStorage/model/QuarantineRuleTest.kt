package com.cognifide.cogboard.logStorage.model

import io.vertx.core.json.JsonArray
import io.vertx.core.json.JsonObject
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull

class QuarantineRuleTest {
    @Test
    fun `Properly parses correct rule`() {
        val rule = QuarantineRule.from(JsonObject("{\"label\": \"Example label\", \"reasonField\": \"Reason\", \"regExp\": \"^a\", \"checked\": true}"))
        assertEquals("Example label", rule?.label)
        assertEquals("Reason", rule?.reasonField)
        assertEquals("^a", rule?.regex?.pattern)
        assertEquals(true, rule?.enabled)
    }

    @Test
    fun `Ignores different fields`() {
        val rule = QuarantineRule.from(JsonObject("{\"Field1\": \"Example field\", \"SecondField\": 2, \"Another field\": \"Lorem ipsum\", \"Last field\": []}"))
        assertNull(rule?.label)
        assertNull(rule?.reasonField)
        assertNull(rule?.regex)
        assertNull(rule?.enabled)
    }

    @Test
    fun `Empty JSON array creates empty rules array`() {
        val rules = QuarantineRule.from(JsonArray("[]"))
        assertEquals(rules.size, 0)
    }

    @Test
    fun `Correctly parser rules in array`() {
        val rules = QuarantineRule.from(JsonArray("[{\"label\": \"Example label\", \"reasonField\": \"Reason\", \"regExp\": \"^a\", \"checked\": true}]"))
        assertEquals("Example label", rules[0].label)
        assertEquals("Reason", rules[0].reasonField)
        assertEquals("^a", rules[0].regex.pattern)
        assertEquals(true, rules[0].enabled)
    }
}